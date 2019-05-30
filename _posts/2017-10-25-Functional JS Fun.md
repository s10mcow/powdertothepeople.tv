---
layout: post
title: F.U.nctional coding - filter, map, reduce. 
---

I recently answered a question on stackoverflow. It was a type of problem I always find so much fun to answer - decomposition of arrays into new data structures.

Gimme an array and tell me you need an object out of it, or gimme an object and tell me you need two array out of it. 

I find it such a fun problem to solve as elegantly as possible - using ONLY filter, map, and reduce. Ok the occasional Object.keys method as well, but thats just grease for the engine.

The thing that struck me first with the SO problem - was all the answers were using for loops. Not to sound smug, but fucking for loops. You were given 2 beautiful arrays
that need iteration and you use a fucking for loop... but... but... Calm down. You were there once as well, do be an asshole.

Anyways. We got two arrays of objects and we wanna turn it into a nice juicy object. 

The way I see it we got two choices - well more but we're using f.u.nctional coding. We can either reduce or we could make an object placeholder and then map, but first
these are the two arrays.

```javascript
const links = [
    {code: 'home'},
    {code: 'contact'}
];

const subLinks = [
    {code: 'abc', parent: {code: 'home'}},
    {code: 'def', parent: {code: 'home'}}
    {code: 'xzy', parent: {code: 'contact'}}
];
```

Desired result is this. 

```javascript
const menu = {
    home: ['abc', 'def'],
    contact: ['xyz'] 
};
```

So the first solution without reduce. 

```javascript
const menu = {};

links.map(link => menu[link.code] = subLinks
    .filter(sl => sl.parent.code === link.code)
    .map(sl => sl.code)
);
```

What bothers me here is the use of the map without utilizing its returned array. We could just use a forEach for this, but tom8to tomato.
Never the less it does what it should do, filter on the parent code returning a smaller array which from we are only interested in the code value.
Bam, simple... and somewhat elegant - three lines of logic. 

Now onto the reduce example. 

```javascript
const menu = links.reduce((memo, menu) => {
    memo[menu.code] = subLinks
        .filter(sl => sl.parent.code === menu.code)
        .map(sl => sl.code);
    return memo;
},{});
```

To me this feels more pure. We directly translate the array into a new data structure, not mutating the original. 

The code is readable, clear, and concise. It may be argued that its a bit loopy as in we do quite some loops through all the arrays giving us a O(n^2). But I'm OK 
with this - if the input arrays end up being huge then we can think about modifying for a better big O result. 

