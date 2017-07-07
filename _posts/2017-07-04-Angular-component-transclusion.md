---
layout: post
title: Angular .component() Transclusion - component inception.
---

2017 has been a trans-year if I have ever seen one - trans-gender, trans-age, so lets not forget then about transclusion!

If your not familiar with transclusion in angular then go and [read](https://docs.angularjs.org/api/ng/directive/ngTransclude) about it. I'll wait.

So you have mastered making reusable components, and now you want to transclude components but still be able to use the goodies (read functions) outside the transcluded component? Cause, you as well as I wanna make stateless stupid components.
 
Well you've come to the right place!

Examples you say!?

```html

	<search>
	
		<search-filters>
		
			<search-filter name="Filter">
				<filter></filter>
			</search-filter>
		
		</search-filters>
		
	</search>

```

Lets say our component is a sidebar with a search box, underneath the search box we can have filters to further refine our search. The search component being the parent component is the "keeper" of 
our logic. It holds onto the function that allows allows searching to take place.

Here is the logic for the `<search></search>` component

```javascript

	angular.component('search', {
	
		template: `
		<h1>Search</h1>
		
		<form ng-submit="$ctrl.doSearch()">
			<input type="text" ng-model="$ctrl.search">
		</form>
		
		<ng-transclude ng-transclude-slot="filters"></ng-transclude>
		`,
		transclude: {
			searchFilters: 'filters'
		},
		controller: function() {
			this.search = () => { //search logic };
		}
		
		
	});

```

Simple component, holds a little input for searching and also a transclusion slot with a nice little named transclusion slot for ease of semantics.
 
So now we can focus on the next component in line. It's a ridiculously simple one, but i figured with the reuse of code lets stick it in there as well. 

`<search-filter name="Some Filter"></search-filter>`

This components job is to wrap the filter in a collapsible toggle interface, and supply the title to the filter. We could have added this in each component individually but lets keep things DRY, 
and drop it into it's own component with - you guessed it - another transclusion slot. This slot however is an unnamed generic one. 

```javascript

	.component('searchFilter', {
		bindings: {
			name: '@',
		},
		transclude: true,
		controller: SearchWrapperController,
		templateUrl: 'components/search-filters/search-wrapper/search-wrapper.html'
	});

```

We're gonna ingore the implementation details as they are a little out of scope for this article, anyways there is a simple binding that takes in name and another transclusion slot.

```html

	<article>

		<header>
			<h2 ng-bind="$ctrl.name"></h2>
		</header>
	
		<main>
			<ng-transclude></ng-transclude>
		</main>
		
	</article>

```

Finally we get to the filter itself, this is expecting a search function it can consume and since the search function works the same no matter the component it lives in the root search component.
 
`<filter></filter>`

This little guy again has some implementation details we will ignore but the concise version of the component is as follows.

```javascript

        .component('filter', {
			require: '^search',
            templateUrl: 'components/filters/filter.component.html',
            controller: FilterController
        });

    function FilterController($rootScope, $element, $timeout, gettext, SEARCH_FILTERS) {

        var vm = this;

		vm.$onInit = () => {
		
			vm.searchFct = vm.search.search;
			
		};

    }


}());


```




