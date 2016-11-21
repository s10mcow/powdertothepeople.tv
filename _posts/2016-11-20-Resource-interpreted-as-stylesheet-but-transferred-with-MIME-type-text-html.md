---
layout: post
title: Base Tag in Angular Apps - Resource interpreted as stylesheet but transferred with MIME type text/html
---


This will be a short and sweet post. I have noticed as its one of my highest rated answers in Stack Overflow I thought I would drop the knowledge into my blog as well.

If you have clean happy URLs in you angular app - and really who wouldn't want that - you are using the $locationProvider. Then yuo have this code snipped in the config section somewhere.


```javascript
	$locationProvider.html5Mode({
    	enabled:true
	});
```

But if you are missing the base tag you will get this error.

```
Error: [$location:nobase] $location in HTML5 mode requires a <base> tag to be present!
```

Ok no problem so lets drop in the base tag.

```html
	<head>
		<base href="">
	</head>
```

Or we can solve the problem like this as well.

```javascript
	$locationProvider.html5Mode({
    	enabled:true,
    	requireBase: false
	});
```

However this solution can cause some problems in IE9. So based on your needs you need to chose one of the above solutions. 

Now comes the caveat with the first solution.

The base tag needs to not only be in the `<head>` but also in the right location.

If not you will get this error - `Resource interpreted as stylesheet but transferred with MIME type text/html.`

The base tag should come before any tags with url requests, basically if you place it as the second tag under `<title>` will solve any issues.

Easy but wow its frustrating if you get the `Resource interpreted as stylesheet but transferred with MIME type text/html` error. 


Some more useful links:

* [My original SO answer](http://stackoverflow.com/questions/22631158/resource-interpreted-as-stylesheet-but-transferred-with-mime-type-text-html-see)
* [Hashtag removal](http://stackoverflow.com/questions/28629774/how-to-remove-the-hash-from-the-angularjs-ng-route)