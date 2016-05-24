---
layout: post
title: Angular .component() Method
---

Welcome to the future - enter the component method.
 
Ok so I guess this will be logically broken up into a few sections - the component method, new life cycle event, the new component controller - the replacement for the linker function and now yes DOM 
manipulations in the controller. Oh boy the last one you might be thinking - but that is one of the fundamentals we learn - also a massive mistake people make either through ignorance, laziness or a combination 
of both. 

#Component Method

First up the [component method](https://docs.angularjs.org/guide/component). 

I was first introduced to it though [this](https://toddmotto.com/exploring-the-angular-1-5-component-method/) post. So if you want some examples comparing the component and the directive check it out.

In short as of Angular 1.5 we now have a way to create components, with much less boilerplate code than the .directive() method.

OK, fine. But what are the advantages of it other than a more semantic name? 

Well this was a question I asked myself when I was first introduced to the component. Looks neat, but actually if I want to do any DOM stuff I need to go back to the directive as that is the logical 
place for touching the DOM. Neat, semantic, less boilerplate - sure - but useful, well not so much. It essence it was very similar to React [functional stateless components](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d).

I even wrote in the style guide where I work:

> In the event the directive will not touch the DOM and it's a wrapper for html component - we will enforce the use of the new Angular 1.5 [component](https://docs.angularjs.org/guide/component) syntax.

Straight from Angular's docs.  

##Advantages of Components:
 
 * simpler configuration than plain directives
 * promote sane defaults and best practices
 * optimized for component-based architecture
 * writing component directives will make it easier to upgrade to Angular 2
 
##When not to use Components:
 
 * for directives that rely on DOM manipulation, adding event listeners etc, because the compile and link functions are unavailable
 * when you need advanced directive definition options like priority, terminal, multi-element
 * when you want a directive that is triggered by an attribute or CSS class, rather than an element
 
Well it turns out that's, not, completely, true...

#Life Cycle Events

Next lets check out the life cycle events. I read about them [here](http://blog.thoughtram.io/angularjs/2016/03/29/exploring-angular-1.5-lifecycle-hooks.html) first. So go check it out and then come back. 

Back? Ok. 

So as of Angular 1.5.3 - the .3 is very important - we have access to the life cycle events.
 
 * $onInit()
 * $onChanges()
 * $onDestroy()
 * $postLink()
 
They are all pretty self explanatory and the article above does a pretty good job, so I wont even bother, but $postLink() is the most interesting of them all. 

As controller are instantiated much faster than any DOM they might glue logic to, we never had a good way of knowing when the DOM was ready to go and thus the directives link function not only made sense
it was the way to go. 

Now we can use $element in conjunction with $postLink() and have a pretty sweet way to manage the DOM inside a...controller... 

Goes against a lot of conventions we have been learning from Angular 1.1 all the way up to Angular 1.5.2. But this is the future welcome to it. 

We can now create super neat and clean components.

This is an example side navigation compoment that brings into the mix the wonderful [Angular Material](https://material.angularjs.org/latest/) library using the 
[mdSideNav](https://material.angularjs.org/latest/api/directive/mdSidenav) directive and the [$mdSideNav](https://material.angularjs.org/latest/api/service/$mdSidenav) service. 

Since we want to have different behavior based on a logged in user and non-logged in user we will need to apply some juicy logic. 

Onto some code...

```javascript

	(function () {
		'use strict';
	
		angular.module('pttp.components')
			.component('sideNav', {
				templateUrl: 'app/components/sidenav/sidenav.html',
				controller: 'SideNavController'
			})
			.controller('SideNavController', SideNavController);
	
		SideNavController.$inject = ['$scope', '$rootScope', 'AuthService', '$timeout', '$auth', '$mdSidenav', '$mdMedia', '$state', 'EVENT', 'AUTH_EVENTS'];
	
		function SideNavController($scope, $rootScope, AuthService, $timeout, $auth, $mdSidenav, $mdMedia, $state, EVENT, AUTH_EVENTS) {
			var vm = this;
	
			//Event Listeners so we can unbind them on destroy
			var rsLoginSuccess,
				rsLogoutSuccess,
				rsStateChange,
				rsStateChangeStart;
	
			vm.logout = logout;
			vm.closeSideNav = closeSideNav;
	
			//Lifecycle Hooks
			vm.$onDestroy = destroy;
			vm.$onInit = init;
			vm.$postLink = postLink;
	
			/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			 Method Declarations
			 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
			function init() {
				vm.isDashboard = $state.includes('base.dashboard');
				vm.isAuthenticated = $auth.isAuthenticated();
				vm.isMobile = screenSizeMobile();
	
				$scope.$watch(screenSizeMobile, function(isMobile) {
					vm.isMobile = isMobile;
				});
			}
	
			function postLink() {
				if(vm.isDashboard) {
					$timeout(function() {
						$mdSidenav('side-nav').open();
					})
				}
			}
	
			function screenSizeMobile() {
				return $mdMedia('sm') || $mdMedia('xs');
			}
	
			function destroy() {
				 [rsLoginSuccess, rsLogoutSuccess, rsStateChange, rsStateChangeStart]
					 .forEach(function (unbind) {
						 unbind();
					});
			}
	
			function logout() {
				AuthService.logout();
			}
	
	
			function closeSideNav() {
				$mdSidenav('side-nav').close();
			}
	
			/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					Event Listeners
			 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	
			rsLoginSuccess = $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
				vm.isAuthenticated = $auth.isAuthenticated();
			});
	
			rsLogoutSuccess = $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
				vm.isAuthenticated = $auth.isAuthenticated();
				closeSideNav();
			});
	
			rsStateChangeStart = $rootScope.$on('$stateChangeStart', function () {
				//Do stuff here when start happens
			});
	
			rsStateChange = $rootScope.$on('$stateChangeSuccess', function () {
				//Do stuff here when change is successful
			});
	
		}
	
	})();
	
```

```html

	<!---------------------------------->
	<!-------- Mobile Side Nav --------->
	<!---------------------------------->
	
	<md-sidenav md-component-id="side-nav" ng-if="$ctrl.isMobile" class="md-sidenav-left c-side-nav">
	
		<!-------- Non Logged in State Mobile--------->
	
		<ul ng-if="!$ctrl.isAuthenticated" class="c-side-nav__container">
	
	
			<!--Sign Up-->
			<li class="c-side-nav__item">
				<a href="#signup-modal-body"
				   class="c-side-nav__item__header"
				   ng-click="$ctrl.closeSideNav()"
				   lean-modal>Sign Up</a>
			</li>
	
			<!--Login-->
			<li class="c-side-nav__item">
				<a href="#login-modal-body"
				   class="c-side-nav__item__header"
				   ng-click="$ctrl.closeSideNav()"
				   lean-modal>Login</a>
			</li>
	
		</ul>
	
	
		<!-------- Logged in State --------->
	
		<div ng-if="$ctrl.isAuthenticated">
	
			 <header class="c-side-nav__header">
	
				<nav-user-icon show-name="true" icon-size="large"></nav-user-icon>
	
				<div class="c-side-nav__header__icons">
					<nav-notification-icon color="dark"></nav-notification-icon>
					<message-notifications color="dark"></message-notifications>
				</div>
	
			</header>
	
			<dashboard-menu>
				<dashboard-menu-items>
					<!--Logout-->
					<li class="c-side-nav__item">
						<a class="c-side-nav__item__header collapsible-header" ng-click="$ctrl.logout()">Logout</a>
					</li>
				</dashboard-menu-items>
			</dashboard-menu>
	
		</div>
	
	</md-sidenav>


```

What I really start to love now having been working with components is the conciseness of their boilerplate. For one we no longer need to go and specify controllerAs name, we just get $ctrl out of the
box - which I find pretty sweet. For me the big advantage in the past of being able to specify a meaningful contollerAs name came from being able to find where the controller was coming from. Now though
we are just building small completely contained components so there is no need to guess who's in charge - there is only one controller to choose from. 