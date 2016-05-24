---
layout: post
title: Ui-Router State Transition Animations & Bootstrap
---

I was given what I thought was a nearly impossible task by my product owner - create an animation when changing states. I began using ngAnimate and came 
up with what I thought was a pretty cool solution to his problem - *wrong*.

>"This isn't what I had in mind he told me. As I change between panels of a collapse widget I want to change the state and update the URL as well."

>Me - "Oh boy..."

So how else can I animate state transitions using an accordion like approach or in bootstrap terminology - the collapse widget?

*Back to the drawing board...*

I came up with what I thought was a really cool way to animate transitions using ui-router and bootstrap.

First off lets set up the states that we need transitioning. I will only show this with two collapse panels, but in theory there can be as many as needed. 

###app.js

```javascript

    .state('home.checkout', {
            url: 'checkout',
            views: {
                '@home': {
                    templateUrl: 'views/partials/generic/checkout-process/order-checkout-root.html'
                }
            }
        })

        .state('home.checkout.shoppingcart', {
            url: '^/shoppingcart',
            views: {
                'shopping-cart@home.checkout': {
                    templateUrl: 'views/partials/generic/checkout-process/shoppingcart/shopping-cart-partial.html',
                    controller: 'ShoppingCartController'
                },
                'order-confirmation@home.checkout' : {
                    templateUrl: 'views/partials/generic/checkout-process/closed-state.html',
                    controller: function($scope) {
                        $scope.page = {name: 'Order Confirmation'};
                        $scope.state = {name: 'home.checkout.confirm'};
                    }
                }
            }
        })

        .state('home.checkout.confirm', {
            url: '/confirmation',
            views: {
                'shopping-cart@home.checkout': {
                    templateUrl: 'views/partials/generic/checkout-process/closed-state.html',
                    controller: function($scope) {
                        $scope.page = {name: 'Shopping Cart'};
                        $scope.state = {name: 'home.checkout.shoppingcart'};
                    }
                },
                'order-confirmation@home.checkout': {
                    templateUrl: 'views/partials/generic/checkout-process/confirmation/order-confirmation-partial.html',
                    controller: 'OrderConfirmationController'
                }
            }
        })
        
```

###HTML 

*order-checkout-root.html*

```html

    <div class="row checkout-process">
        <section class="col-sm-8 col-md-8 col-lg-8 panel-group" id="accordion">
            <div class="shopping-cart panel panel-default" ui-view="shopping-cart" autoscroll="false"></div>
            <div class="order-confirmation panel panel-default" ui-view="order-confirmation" autoscroll="false"></div>
        </section>
    </div>

```

*closed-state.html*

``` html

    <article class="col-sm-12 col-md-12 col-lg-12 panel-heading closed-state">
        <h4 class="panel-title">
            <a ui-sref="{{state.name}}">
                {{page.name}}
            </a>
        </h4>
    </article>
    
```

*order-confirmation-partial.html*

I will only include this one and not the other partial as its the same idea.


```html

    <div class="order-confirmation-page row">
        <div class="panel-heading">
            <h4 class="panel-title">Order Confirmation</h4>
        </div>
    
        <div class="panel-collapse collapse" pttp-collapse-toggler data-toggle="collapse">
            <div class="panel-body">
                <!--Code for the collapse body goes here-->
            </div>
        </div>
    </div>
    
```
   
Whats important from this last partial is to note the inclusion of the directive

>pttp-collapse-toggler   

This is where we do our work and the most interesting part of the code

###collapseTogglerDirective.js
   
```javascript
    
    'use strict';
    
    angular.module('PTTP.Directives.CollapseToggler', [])
    
        .directive('pttpCollapseToggler', function ($rootScope, $state, $q, $timeout) {
    
            var linker = function(scope, element) {
    
                var
                    collapse = $q.defer(),
                    changeEventStarted = false
                ;
    
                //Expand the panel on directive instantiation
                $timeout(function() {
                    $(element).collapse('show');
                }, 300);
    
    
                scope.$on('$stateChangeStart', function(event, toState) {
                    //Check to make sure we arent in the middle of a $stateChangeEvent
                    if(changeEventStarted) {
                        return;
                    }
                    //Stop the state transition
                    event.preventDefault();
    
                    //Collapse the panel
                    $(element).collapse('hide');
    
                    //Wait for the panel to collapse completely
                    collapse.promise.then(function() {
                        changeEventStarted = true;
                        //Then transiton the state
                        $state.transitionTo(toState);
                    });
                });
    
                //Event listener for the collapse completed
                $(element).on('hidden.bs.collapse', function() {
                    collapse.resolve();
                });
            };
    
            return {
                restrict: 'A',
                link: linker
            };
        });

    
```

###Summary

In short what we do here is:

1. Setup a promise to know when we can transition again.
2. Intercept the $stateChangeStart event and stop it from happening.
3. Then we collapse the panel we are interested in
4. When the collapse is finished bootstrap fires an event saying I am done collapsing which we listen for and in turn resolve the promise
5. When the promise is resolved we can safely transition to the next state

I hope that this isn't too much to follow, but if you do the potential it has for other kinds of animation is pretty sweet.