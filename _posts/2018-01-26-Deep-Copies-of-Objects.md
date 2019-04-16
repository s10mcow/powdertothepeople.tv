---
layout: post
title: Deep Copies of Objects in JS
---

So you wanna copy objects in JS. Great me too. Want them to be not referenced to each other? Yep. Here too.

So go read [this](https://dassur.ma/things/deep-copy/).

Done? Sweet.

Well if you're like me, a little naive I suppose, but never the less I thought I knew.

`Object.assign({}, someOtherObject)`

Thats supposed to be a reliable method to clone objects...

Until I read that post and realized shit, have I fucked it up.

Well kinda yes maybe and kinda no maybe.

So if you check out what happens if you modify a nested array then yes, PBR - not the beer - but pass by reference holds true.

However...and this was a ok phew what I just wrote will actually be ok.

What happens if the `someOtherObject.someKey` is deleted? Well then we are still ok, that PBR jumps ship on the deleted one and hangs on for dear life in the newly cloned Object.

Simple, but I needed to see it for myself to be sure.

![cloned and deleted shallow](/public/img/delete-shallow.png)

However truth holds when you try and delete a nested object.

![cloned and deleted deep](/public/img/delete-deep.png)

Good to know.
