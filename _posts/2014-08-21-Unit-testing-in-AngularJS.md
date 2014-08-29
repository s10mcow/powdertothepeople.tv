---
layout: post
title: Unit testing in AngularJS - Mocking Services and Promises
---

In Angular everything seems to have a steep learning curve and unit testing an Angular app definitely doesn't escape this paradigm.

When I started with TDD and Angular I felt that I was spending twice (maybe more) as much time figuring out just how to test and maybe even more 
just getting my tests set up correctly. But as [Ben Nadel](http://www.bennadel.com/) put it in his blog there are ups and downs in the angular learning process - 
his [graph](http://www.bennadel.com/blog/2439-my-experience-with-angularjs-the-super-heroic-javascript-mvw-framework.htm) is definitely my experience with Angular.

However as I have progressed in learning Angular and unit testing as well, now I feel that I am spending much less time setting up tests 
and much more time making tests go from red to green - which is a good feeling.

I have come across different methods of setting up my unit test to mock services and promises.

So onto the code I am sure you don't wanna listen to some guy blab about his love, err accomplishments learning a framework, especially when his blog is about JS and beer - how drunk could he be?

This is how I started out mocking my services and promises, I'll use a controller, but services and promises can be mocked in other places using the same technique.

{% highlight javascript %}
    
    describe('Controller: Products', function () {
        var//iable declarations
            $scope,
            $rootScope,
            ProductsMock = {
                getProducts: function () {
                } // There might be other methods as well but I'll stick to one for the sake of conciseness
            },
            PRODUCTS = [{},{},{}]
        ;
    
        beforeEach(function () {
            module('App.Controllers.Products');
        });
    
        beforeEach(inject(function ($controller, _$rootScope_) {
            //Set up our mocked promise
            var promise = { then: jasmine.createSpy() };
    
            //Set up our scope
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
    
            //Set up our spies
            spyOn(ProductsMock, 'getProducts').andReturn(promise);
    
            //Initialize the controller
            $controller('ProductsController', {
                $scope: $scope,
                Products: ProductsMock
            });
    
            //Resolve the promise
            promise.then.mostRecentCall.args[0](PRODUCTS);
    
        }));
    
        describe('Controller Initialization', function () {
            it('should have a populated array of products', function () {
                expect('ProductsMock.getProducts').toHaveBeenCalled();
            });
        });
    });
    
{% endhighlight %}

This worked, but as time went on I thought there *must* be a better way. For one, I hated the

{% highlight javascript %}

    promise.then.mostRecentCall

{% endhighlight %}

*thing*, and if I wanted to reinitialise the controller then I had to pull it out of the beforeEach block, and inject it individually into each test, making our tests definitely not DRY.

>There has to be a better way...
 
Then I came across another post, blog, stackoverflow example (you pick it I was probably there), and I saw the use of the $q library. 

D'oh! 

Why set up a whole mock promise when we can just use the tool that Angular gives us. Our code looks cleaner and it's much more intuitive
- no ugly *promise.then.mostRecent* thing. Then to DRY everything out, wrap the controller instantiation in a function so we can have more control over how the controller behaves 
for setting up our different test conditions through the use of parameters and CONSTANTS. Now we're getting sommewhere. 

Next in the iteration of unit testing was this.

{% highlight javascript %}

    describe('Controller: Products', function () {
        var//iable declarations
            $scope,
            $rootScope,
            $q,
            $controller,
            products,
            PROMISE = {
                resolve: true,
                reject: false
            },
            PRODUCTS = [{},{},{}] //constant for the products that are returned by the service
        ;
    
        beforeEach(function () {
            module('App.Controllers.Products');
            module('App.Services.Products');
        });
    
    
        beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _products_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            $controller = _$controller_;
            products = _products_;
            $scope = $rootScope.$new();
        }));
    
        function setupController(product, resolve) {
            //Need a function so we can setup different instances of the controller
            var getProductsPromise = $q.defer();
    
            //Set up our spies
            spyOn(products, 'getProducts').andReturn(getProductsPromise.promise);
    
            //Initialise the controller
            $controller('ProductsController', {
                $scope: $scope,
                products: products
            });
    
            // Use $scope.$apply() to get the promise to resolve on nextTick().
            // Angular only resolves promises following a digest cycle,
            // so we manually fire one off to get the promise to resolve, or in this
            // case we can choose through the parameters being passed in whether or
            // not to resolve the promise - thus covering our test cases. 
            if(resolve) {
                $scope.$apply(function() {
                    getProductsPromise.resolve(product);
                });
            } else {
                $scope.$apply(function() {
                    getProductsPromise.reject();
                });
            }
        }
    
        describe('Resolving and Rejecting the Promise', function () {
            it('should return the first PRODUCT when the promise is resolved', function () {
                setupController(PRODUCTS[0], PROMISE.resolve); // Set up our controller to return the first product and resolve the promise. 
                expect('to return the first PRODUCT when the promise is resolved');
            });
    
            it('should return nothing when the promise is rejected', function () {
                setupController(PRODUCTS[0], PROMISE.reject); // Set up our controller to return first product, but not to resolve the promise. 
                expect('to return nothing when the promise is rejected');
            });
        });
    });

{% endhighlight %}

This started to feel like the way it should be set up. We can mock what we need to mock, we can set our promise to resolve and reject. 
We can truly test the two possible outcomes. This feels good.