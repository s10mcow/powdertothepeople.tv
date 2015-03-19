---
layout: post
title: Angular Routing - the file from hell and how to fix it
---

Has your routing file become out of hand? Is your app.js file hundreds of lines long? Is it virtually impossible to get a overall look at your App's routing structure?
You too might be suffering from a routing file gone awry.

The problem here is that this happens so very gradually you don't notice it. It's like watching the grass grow, or collecting used cars - all of the sudden you have a lawn out of
and a bunch of cars sitting on concrete blocks. Well the grass part is probably true anyways.

I guess the first step is to address our routing problem, then I will show how I managed to get it under control using angular's provider. I am addressing this problem using ui-router,
if you arent using ui-router for your routing then you might have other problems as well, but that's not what I am talking about.

## The Problem

```javascript

	.config(function($stateProvider) {
		$stateProvider

			.state('home', {
				url: '/',
				views: {
					//...
				}
			})

			.state('home.products', {
				views: {
					url: '',
					'content@home' : {
						templateUrl: PATH.partials + 'products-view-root.ptt.html'
					}

				}
			})

			.state('home.products.index', {
				url: '',
				views: {
					'products@home.products': {
						templateUrl: PATH.partials + 'product-index.ptt.html',
						controller: 'ProductsIndexController',
						resolve: {
							productList: function(products) {
								return products.getProducts();
							}
						}
					}
				}

			})

			.state('home.products.category', {
				url: 'category/:category',
				views: {
					'products@home.products': {
						templateUrl: PATH.partials + 'product-index.ptt.html',
						controller: 'ProductCategoryController',
						resolve: {
							productList: function(products, $stateParams) {
								return products.getProducts($stateParams.category);
							},
							categoryList: function(categories) {
								return categories.getCategories();
							}
						}

					}
				}
			})

			.state('home.products.search', {
				url: 'search/:category/:search',
				views: {
					'products@home.products': {
						templateUrl: PATH.partials + 'product-index.ptt.html',
						controller: 'SearchResultsController',
						resolve: {
							productList: function(products, $stateParams) {
								return products.getSearchResults($stateParams.category, $stateParams.search);
							},
							categoryList: function(categories) {
								return categories.getCategories();
							}
						}
					}
				}
			})

			.state('home.products.show', {
				url: 'product/:id',
				views: {
					'products@home.products': {
						templateUrl: PATH.partials + 'product-show.ptt.html',
						controller: 'SingleProductController',
						resolve: {
							loadedProduct: function($stateParams, Products) {
								return Products.single($stateParams.id);
							}
						}
					}
				}
			})

			//... continues for a potential very long time

```

This can quickly spiral out of control as you add routes and sub-routes and sub-sub-routes. This happened to the app I was working on and it needed to be fixed as the routing no longer gave
us a 30,000 foot view of the application's structure. It was simply a mess.

So wht not just make a service and inject the route as an object from a service you might ask, well we can't use services at this state - the config stage - of our app. We are left to providers
and thus the solution.


## The Solution

We will abstract our info into a few different provider files and then inject them into the config function, and create our own object structure so when we see our app we can clearly see
all of the routes that our app has.

**Step 1**






