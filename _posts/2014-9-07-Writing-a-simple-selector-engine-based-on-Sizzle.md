---
layout: post
title: You too can write a selector engine - Part 1
---

Ok so the title is a bit misleading. Yes, it is possible to write selector engine, but when we talk about a selector engine as complex as [Sizzle](http://sizzlejs.com/)
then it's another story. Don't get me wrong I am not saying your JS skillz aren't up to the task, but it's a pretty heavy task considering the back browser compatibility and all 
the methods that come bundled along with the selector engine.
 
Recently my vanilla JS skills were tested and I realized - well - they could be better. We have had the crutch, if you wanna look at it that way, of jQuery helping us abstract the complexity 
of the DOM api so trivial tasks in jQuery become difficult in vanilla JS - not all - but some. Thus lots of front end developers lack true vanilla JS skills once the crutch of jQuery is removed
and we find ourselves struggling to stand on our own to JS legs. I say the time has never been better to learn how to walk on your own, and not just walk but run. 

One day, I hope in the not to distant future when old browsers and the people using them get their act together, we wont have to deal with supporting shitty old versions of browsers I won't name names - IE -
and the internet as whole can move forward. But this isn't supposed to be a rant about jQuery or IE, this is a rant, er, I mean an article about writing a simple selector engine.

I was first interested in writing an article about DOM manipulation using vanilla JS. However as I dove deeper - I saw the first step was to make my life a little easier and abstract the
lengthy document.querySelectorAll into a more simple to use function I based the syntax on our old friend the *$*.

```javascript

    var $ = document.querySelectorAll;
        
```

So ok we have a simple selector function, no more length document.querySelectorAll. What do we win with this other than a more simple looking function? Not too much. Well the next step is we could
change the returned value from a Node List type to an Array type, then we would get access to the goodies from the array prototype chain. Meaning we could use the nice Array.forEach method to loop over our
elements. You're not still writing for [loops](http://joelhooks.com/blog/2014/02/06/stop-writing-for-loops-start-using-underscorejs/) are you?

```javascript

    var $ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
        };
        
```

Now we can iterate over the collection of elements using the forEach method. But we could just have easily done this by invoking the *Array.prototype.slice.call* on the returned value and we would have the
same result. This made me curious as to how jQuery set up it's selector engine aka Sizzle. This is an extremely simplified version of [that](https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L184)
piece of code, but a good starting point to see what is happening under the hood.

```javascript

    var $ = function(selector) {            
        var 
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,  
            match = rquickExpr.exec(selector)
        ;
    
        if(match[1]) {
            return document.getElementById(match[1]);
        }
        else if (match[2] ) {
            return document.getElementsByTagName(match[2]);
        }
        else if (match[3]) {
            return document.getElementsByClassName(match[3]);
        }
    };

```

Well surprisingly enough Sizzle uses nothing fancy other than the methods already given to us through the document object - more or less what we were doing with our version using document.querySelectorAll. 
Its a bit interesting to note the regular expression and the exec method and take a closer look at what they are doing.

```javascript

    var 
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,  
        match = rquickExpr.exec(selector)
    ;

```

Regular expressions are one of those things that as developers we should really take the time to sit down for however long it takes and master these things - this is a very simple example of their power. 
I myself am guilty of a sufficiently advanced knowledge of these cryptic hieroglyphics. So if you already have sat down and know this then skip along to the next section, if not then lets pull this thing apart
and see what it's up to. 

 * /^ - starts off our regular expression and the start of a string
 * (?:#) - Matches the #, but does not remember the #
 * ([\w-]+) - () groups to match, \w matches any alphanumerical character, + one or more times
 * | - alternation, matches either;  for example x|y matches x or y
 * $/ - signifies the end of the regex
 
This is the basis of the regular expression, it's made up of three match areas - the first is for an id, the second an element, and the third a class. 

Then when we feed it through the [exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) method which searches for a match in a specified string and returns the
results array or null. You can see more of what the exec array is composed of through the link.

```javascript
    
    //Using our above function    
    $('#id'); //==>
    
    //Result of match array
    ["#id", "id", undefined, undefined, index: 0, input: "#id"] //id === match[1]
    
    
    $('element'); //==>
    
    //Result of the match array
    ["quantity", undefined, "quantity", undefined, index: 0, input: "quantity"] //element === match[2]


    $('.class'); //==>
    
    //Result of the match array
    [".class", undefined, undefined, "class", index: 0, input: ".class"] //class === match[3]
```

Now we have an easy way to tell what the passed in selector is and thus use the correct document.get* method. 

This is far from a finished 'selector engine,' but it gives us some abstraction from the DOM api to just a simple function call where we pass in a valid selector.

In the next section of this small series we will look deeper into the functionality of the different selector methods and also try and build upon our new selector engine.


