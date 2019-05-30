---
layout: post
title: Array.flat vs Array.reduce
---

Lets check out my new favorite method for flattening array in array strucutres we commonly run across in functional programming.

What method is that you ask!?

Well, `Array.flat()` I say!

Its the fastfood version of flattening arrays, vs the restaurant version of reduce, so lets examine.

```javascript
const nestedArray = [['someJuicyData'], ['anotherPieceofJuicyData']];

//Desired Outcome => ['someJuicyData', 'anotherPieceofJuicyData'];

const flattenedArrayWithReduce = nestedArray.reduce((memo, nest) => memo.concat(nest), []);

const flattenedArrayWithFlat = nestedArray.flat();
```

So as you can see in the code we handle the flattening with reduce by starting with an empty array and concating the inner array in the outter array we are working on.
Simple enough code, and not very complicated, but when one is doign this a few times or for the simple sake of readability, the `.flat()` method is just so much nicer.

Learning how to wield `.reduce` is one of the more tricky apects when starting out with `.filter, .map, .reduce` mantra, however learning it is well worth the effort.

FYI - `Array.flat` doesnt work in IE11, surprise, surprise... But if we are using babel it will be able to handle this for us without issue...

Good times!
