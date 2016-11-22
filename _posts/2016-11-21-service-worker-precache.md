---
layout: post
title: Service Worker Precache
---

Service worker is probably one of the coolest new additions in the sea of cool new additions to the world of Front-End Development.

It is however a pretty daunting API to get a hold of when you are starting out with it - fetch, cache, oh boy.

The simplest way to get started with integrating service worker is to precache all your static files - aka the JS, CSS and and assets you might have. 

Now this presents a problem. What about when the assets change does that mean we need to manually maintain this file? That seems like a job for some kind of automation task. 

	Even better shove it into the build pipeline!
	
I am using gulp to create my build at the moment so I will focus on using that, but in theory you can use anything. 

So actually to make your life easier and excuses for not doing it simply go away - google has provided us a sweet tool for getting the job done.

Namely - [Service Worker Precache](https://github.com/GoogleChrome/sw-precache) - you integrate this little beauty into your build pipeline and then you can go back to drinking more beer.

Check out the docs for more in depth info, but this is bascially all we have in our build pipe which gives us SW goodness. 

```javascript
	'use strict';

	var gulp = require('gulp');
	var path = require('path');
	var swPrecache = require('sw-precache');
	var conf = require('./conf');
	var rootDir = conf.paths.tmp;

	gulp.task('make-sw', function (callback) {

		swPrecache.write(path.join(rootDir, 'service-worker.js'), {
			staticFileGlobs: [
				rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}',
				rootDir + '/**/*.json',
				rootDir + '/*.{js,html,css}',
			],
			stripPrefix: rootDir,
			maximumFileSizeToCacheInBytes: 15000000, //15MB file
			importScripts: ['./scope-service-worker.js']
		}, callback);

	});
```

So that's pretty much it. You got yourself a service worker! 

Some interesting things to take away from this. 

`staticFileGlobs`

The location of all your goodies you want the little guy to cache. 

`maximumFileSizeToCacheInBytes`

The size of the file the task will compile - you can configure this to be as big or small as you need it to be.

`importScripts: ['./scope-service-worker.js']`

This one is very important if you want to have even more bells and whistles in the future with service worker. This would be where you include your own service worker file, which will then
be rolled into one (well linked to anyways) when the build compiles everything. 

There ya be! Let the good server response times roll! Once you get this into your app all those pesky static files will now be cached and your app/site will be just that much faster! 

More fun SW links.

* [Jake Archibald](https://jakearchibald.com/2014/using-serviceworker-today/) - This is just one link, check the rest of his blog out for more awesomeness. 
* [Offline Cookbook](https://serviceworke.rs/)
* [Best Service Worker Link Ever](https://jakearchibald.com/2014/offline-cookbook/) - Also Jake, but worthy of it's own mention.
* [Trained to Thrill - SW App Demo](https://github.com/jakearchibald/trained-to-thrill)
