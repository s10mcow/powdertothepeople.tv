---
layout: post
title: Mocking Controller Instantiation In AngularJS Unit Test
---

Being able to mock is what unit testing is all about this paradigm plays an especially important role in AngularJS unit testing.
We mock our application's environment. We mock data using constants. We mock services using functions. All in order to test 
how a certain portion of an application should preform in production.

As AngularJS is built upon modularity of code, our unit tests should be no different. 

>How then do we then mock controllers?

First off I think it's important to note why I am asking this question in the first place. You might be thinking to yourself
well just include the module and you're good.
 
{% highlight javascript %}
    
    module('PTTP.Controllers.PowWow');
    
{% endhighlight %}

If you think this, then yes you are completely correct there is no need to mock a controller we can just include, but what if 
that controller has other dependencies? Do we want to include all of those as well so we end up with this dependency tree of 
modules just to set up a unit test for our *PowWow* directive? 

{% highlight javascript %}

    module('PTTP.Directives.PowWow');
    module('PTTP.Controllers.PowWow');
    module('PTTP.Constants'); // <--- Comes from the PowWow controller dependency
    module('PTTP.Service.SomeService'); // <--- Comes from the PowWow controller dependency
    module('PTTP.Service.SomeOtherService'); // <--- Comes from the SomeService dependency
  
{% endhighlight %}

This is *not* the way I want my unit test to be set up. I want it as transparent as possible. I want to look at my module includes
and know exactly what I am testing. 

>I want freedom from the dependency tree!

This is that freedom you are looking for and it's so much easier than you might have thought.

{% highlight javascript %}

    module('PTTP.Directives.PowWow', function($provide, $controllerProvider) {
            $controllerProvider.register('PowWowController', function($scope) {
                // Controller Mock                
            });
            $provide.factory('someService', function() {
                // Service/Factory Mock
                return {
                    doSomething: function() {}
                }
            });
        });
    
{% endhighlight %}

It's as simple as that. However it doesn't stop with controllers. We can mock providers, factories, services, values - we can mock anything
we need to with that simple pattern.
 
{% highlight javascript %}

    $controllerProvider.register();
    $provide.provider();
    $provide.service();
    $provide.value();
    $provide.factory();
    
{% endhighlight %}

The great thing about this is we now have total control of our mocks, and an added bonus what our mocks are mocking in the way of data and methods.

{% highlight javascript %}

    'use strict';
    
    describe('Directives: PowWow', function () {
    
        var//iable declarations
            elm,
            scope,
            $rootScope,
            SOME_VARIABLE = {foo: 'bar'}
        ;
    
        beforeEach(function () {
            module('PTTP.Directives.PowWow', function($controllerProvider) {
                    $controllerProvider.register('PowWowController', function($scope) {
                        // Controller Mock
                        $scope.someVariable = SOME_VARIABLE;
                        $scope.someFunction = function () { //do stuff };
                    });
                });
        });
    
    
        beforeEach(inject(function (_$rootScope_, $compile) {
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            elm = angular.element('<kx-pow-wow></kx-pow-wow>');
            $compile(elm)(scope);
            scope.$apply();
        }));
    
        it('Should create the pow-wow template', function () {
            //Juicy unit tests here    
        });
    });
    
{% endhighlight %}

Long live mocks!

