---
layout: post
title: Cool CSS stuff - Part 1 - Checkmarks
---

This will be more or less an on going sequence of posts based on cool CSS stuff that I want to share. Also it helps me to remember how this cool stuff was done.

I have been working with a CSS magician the last couple weeks, a humble one at that, and I have learned a lot of cool tricks. I want to talk about the way he made checkmarks, which blew me away. First off how you get in the mind set of thinking css can do such a thing, but I guess as with all skills it comes with time.

So onto the goods.

As with a lot of new cool ways to do things we are gonna use pseudo elements. [CSS tricks - pseudo elements](https://css-tricks.com/pseudo-element-roundup/) is a great post to get going on what they are and what they can do. In short think of ::after and ::before as two free elements that come with all elements that can do just about anything a regular non-pseduo element can do.

So what are we gonna build, well like the title says a checkmark. Simple, no? Using good old ASCII character codes we can do this.

```css

  span::after {
    content: '\2713';
  }

```

Which will make an element like [so](https://en.wikipedia.org/wiki/Check_mark).

Thats all fine and dandy, but lets go for css wizardry.

Lets build a checkmark using the border of the pseudo-element.

```css

  span::after{
    content: ' ';
    position: absolute;
    height: 10px;
    width: 20px;
    border-left: 5px solid black;
    border-bottom: 5px solid black;
  }

```

Now we have a L shape, bam, most of the work done. All there is left to do is to rotate the shape to make it look like a check mark.

But first whats going on here.

As with pseudo elements we need the content, we add a space to avoid an [Opera bug](http://nicolasgallagher.com/micro-clearfix-hack/).

Next we create the 'L' shape. Now since its a 'L' on it's back or the bottom of the shape we make the width 20 pixels wide and then the portion that sticks up the height we need it smaller than the width or we have a weird looking checkmark so it receives a height of 10 pixels.

However you will notice our 'L' shape has no fill, this is where our border-left and border-bottom come into play. It provides the color and the width of the shape.

Now that we have our 'L' shape lets turn it into a checkmark.

```css

  span::after{
    content: ' ';
    position: absolute;
    height: 10px;
    width: 20px;
    border-left: 5px solid black;
    border-bottom: 5px solid black;
    transform: rotateZ(-45deg);
  }

```

Finally we rotate the shape -45 degrees to twist it into its checkmark shape and then we can also translate the shape a bit to make it it inline with it's parent element if that element has any content.

Check out the [demo](http://codepen.io/stenmuchow/pen/BNJpZR)
