---
layout: post
title: Building Reusable Bower Components from Angular Modules
---

So you have built a generic module and now you wanna use it in another project, but like any good developer out there you hate the idea of 
copying the code and pasting it into your new project. 

**Welcome to the world of the bower component.**
 

For any developer out there who has been indoctrinated into the bower components knows their efficiency in making a working environment's dependencies easily shareable. 
But what if we wanna make our own component, well its actually super simple and through the use of [bower link](http://bower.io/docs/api/#link) we can even edit our component
in the project that we are using it in.

There is a great post on it [here](https://oncletom.io/2013/live-development-bower-component/). Expect this article to be a fork of that post.
 
####Benefits of Modular Components
* Codebase in much DRYer - *hopefully*
* Smaller pieces ===  More maintainable
* Reduced [coupling](http://pragmatictips.com/36) between modules

The most important benefit we gain from making these modules is **reduced coupling**. 

The second point directly relates to the reduction of coupling as well for as a project grows in size and complexity, functionality is added and coupling issues no doubt creep into the 
scope of things. On the other hand when we have a small module we are able to see what the module depends on so we can keep it's dependencies small and when things grow to be too large 
or the complexity is too great we can more easily refactor the code into smaller modules. 

>This allows us to build lego blocks of code that we can add and remove as needed without breaking a project. 

###Example Module

For this example we will be building a product module, but this is just a generic choice I made based on what I am currently building at work. 

In our product module we want to be able to fetch json, display the json to the user, plus maybe have some kind of interaction - the classic trifecta of angularJS' - service, controller, directive. 

**Project Layout**

* Service - *PTTP.Service.Product* - productService.js
* Controller - *PTTP.Controller.Product* - productController.js
* Directive - *PTTP.Directive.Product* - productDirective.js
* Widget - *PTTP.Widget.Product* - productWidget.js

I won't get into the actual building of these pieces, but we will keep them as separate files with separate module names, and of course unit tests.
The productWidget.js will be the concatenated version of the previous three files, plus the template which will be converted to JS - this will be the job of our old friend [grunt](http://gruntjs.com/). 

###Directory Structure
{% highlight bash %}

├── Gruntfile.js
├── README.md
├── bower.json
├── karma.conf.js
├── package.json
|
├── dist
│   └── productWidget.js
|
├── scripts
│   ├── productController.js
│   ├── productDirective.js
│   ├── productService.js
│   └── templates.js
|
├── test
│   ├── productCtrl.spec.js
│   ├── productDirective.spec.js
│   └── productService.spec.js
|
└── views
    └── templates
        └── product.tpl.html
        
{% endhighlight %}

>This is a directory tree without having run **bower install** and **npm install** for easy of viewing.
 
###bower.json

{% highlight javascript %}

{
  "name": "pttp-angular-product",
  "version": "0.0.1",  
  "main": "./dist/productWidget.js", //<------------ dont forget me!
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "angular": "~1.2.22",   
  },
  "devDependencies": {
    "angular-mocks": "~1.2.14",
    "angular-resource": "~1.2.22",
    "angular-cookies": "~1.2.22",
    "angular-sanitize": "~1.2.22",
  }
}

{% endhighlight %}

The *main* will tell bower that you need to use the widget as the file for any injection through [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep), which if you aren't using well you should take the
time and learn it. Also add any dependencies you might need here as well, this is where we have direct access to how coupled our module is to other bits and pieces. 

<hr>

Once you have your files written and are ready for making the productWidget.js - grunt time. We will be using [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) to concatenate our JS, and 
[grunt-html2js](https://github.com/karlgoldstein/grunt-html2js) to convert our HTML to JS and add it to the AngularJS template cache. I also use [karma](http://karma-runner.github.io/0.12/index.html) for running
unit tests, but that's out of scope of this article, so I wont mention it further and it wont be included in the GruntFile.js, but be aware that it's there and I have drunk the TDD kool-aid.

###GruntFile.js

{% highlight javascript %}

    'use strict';

    module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concat: {
            options: {
                banner:
                    'angular.module(\'PTTP.Widgets.Product\', [\'PTTP.Controllers.Product\',' +
                                                              '\'PTTP.Directives.Product\',' +
                                                              '\'PTTP.Services.Product\',' +
                                                              '\'PTTP.Templates.Product\']);\n'
            },
            dist: {
                src: ['./scripts/*.js'],
                dest: './dist/productWidget.js'
            }
        },
        html2js: {
            app: {
                options: {
                    base: './',
                    useStrict: true,
                    quoteChar: '\'',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: ['./views/{,*/}*.html'],
                dest: './scripts/templates.js',
                module: 'Kinetix.Templates.Product'
            }
        }
    });

    grunt.registerTask('default', [
        'html2js',
        'concat'
    ]);

};

{% endhighlight %}

What I would like to point out from this file, as simple as it may be, is that we utilize the banner option in the concat task so we don't have to manually build our widget every time - this be grunt work.
 
Also we use the grunt-html2js task to place our directive's html in the template cache under a unique name so we don't have naming collisions for future modules. 

Finally we register both of these tasks under the grunt default task so from the command line we can just type - **grunt** - and our tasks will be run.

This is the standard semi generic structure I use in order to churn out components with relative ease. 


###Bower Component In Use

Now that we have our module built and pushed to github or another repo storage site we can start to use it in our project as a bower component.

In your project's bower.json file simply add the git path with or without a branch name as by default bower will use the master branch.

**bower.json**

{% highlight javascript %}

{
    "name": "powder-to-the-people-project",
    "version": "0.0.1",
    "dependencies": {
        "angular": "~1.2.22",      
        "pttp-angular-product": "git@bitbucket.org:pttp/pttp-angular-product.git",       
    }
}

{% endhighlight %}

<i class="fa fa-beer-o"></i> Beer time...

