---
layout: post
title: Spread Operator
---

```javascript
...
```

There is it, the three dots known as the spread operator.

`Object.assign` just got thrown to the side of the road like a verbose hitchhiker taking up way too many keystrokes.

Whats it good for you ask!? What isn't it good for!?

Spread introduction to JS is the knife thats spreading butter on our functional fun toast.

OK, OK... enough with the analogies.

When first coming across spread in code it can be quite tricky to understand without having used it before, however after some simple use you wonder how you dealt with functional JS before.

```javascript
const x = [1, 2, 3, 4, 5];

const y = [4, 5, 6, 7, 8, 9, 10];

const z = [...x, ...y];

const zCat = x.concat(y);

// z => [1,2,3,4,5,4,5,6,7,8,9,10];
```

Two simple ways to moosh a couple arrays together.

What about getting rid of duplicate items?

Handy spread and and the new `Set` data object in tandom.

```
The Set object lets you store unique values of any type...

```

```javascript
const x = [1, 2, 3, 4, 5];

const y = [4, 5, 6, 7, 8, 9, 10];

const z = [...new Set([...x, ...y])];

// z => [1,2,3,4,5,6,7,8,9,10];
```

No more duplicate values, Set removes them for us, and in between creates a new data structure which we coerise back into an Array using the spread operator.
Keep this pattern in mind when dealing with array like structures you wish to make into arrays for iterability - for example list of dom nodes from querySelectorAll.

```javascript
[...document.querySelectorAll('someSelector')].map(node => {
    const parentWidth = node.parentNode.offsetWidth;
    const offsetLeft = node.offsetLeft;
    if (parentWidth - offsetLeft < 100) {
        return node.classList.add('align-right');
    }
    if (parentWidth - offsetLeft > 200) {
        return node.classList.add('align-left');
    }
});
```

What about Objects you ask, well spreads not done just yet!

```javascript
const a = { name: 'steve' };

const b = { lastName: 'McSteve' };

const c = { ...a, ...b };

// c => {name: "steve", lastName: "McSteve"}
```

Using it like \_.extend to update an array with new values that might come from the server.

```javascript
const a = { updated: '1 min ago' };

const b = { updated: 'Just now' };

const c = { ...a, ...b };

// c => {updated: "Just now"}
```

Shallow object copy as well...

```javascript
const a = { name: 'steve' };

const b = { ...a };

// a !== b
```

This just scratches the surface of spreads awesomeness, but inorder to start getting into it, one must see its potential.

Good times!
