---
layout: post
title: Angular .component() $doCheck lifecycle event 
---

I will assume you are already aware of the awesomeness that is angular components. Even if it is just sugary coating around the directive, it's still sweet. 

So to wrap up the events we have had at our finger tips thus far.

* $postLink
* $onInit
* $onChanges
* $onDestroy

I dont know where I stumbled upon the latest one, but I did. Let this be your stumbling ground!

#$doCheck()

This is a nifty little event - introduced to us in Angular v1.5.8 - allows us to fire off a method on each turn of the digest cycle. As per the docs it provides us an "opportunity to detect and act on changes."

Basically this is a way we can replace the $scope.$watch method, which brings us one step closer to Angular v2's saga - The Death of $scope. Mentioning A2, this is actually also available there as [DoCheck Class](https://angular.io/docs/ts/latest/api/core/index/DoCheck-class.html).
Its pretty cool to have a real hook into this, as for me $scope.$watch always had a little tiny smell/hackish feeling to it. Whether or not this changes it or just dresses it in new clothes, it feels better. 

Long live components! 

Useful Links:

* [Angular Component Docs](https://docs.angularjs.org/guide/component)
* [Todd Motto's Article on the Hooks](https://toddmotto.com/angular-1-5-lifecycle-hooks)
* [Another neat $doCheck Article](http://www.kristofdegrave.be/2016/07/component-lifecycle-docheck-angular-15x_22.html)
