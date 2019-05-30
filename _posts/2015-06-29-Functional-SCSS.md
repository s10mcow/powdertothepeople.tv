---
layout: post
title: Cool CSS stuff - Part 2 - SCSS as JS
---

For me CSS or SCSS is a ways to a means - we need to style elements. However my pleasure on the front end come mainly from JS and the puzzles we get to solve creatively. So when I started playing around with loops and conditional statements in SCSS, I was super excited to see that SCSS can also be a fun way to solve styling issues with more traditional programming techniques.

My problem to start with was creating a carrot/triangle pointing to the right. So I started to search the net and came across [this](https://css-tricks.com/snippets/css/css-triangle/) cool post about using some css trickery to create a css only arrow.

```css
.arrow-right {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;

    border-left: 20px solid green;
}
```

OK, great! So now maybe I want to have another arrow pointing down as well. So then we do this.

```css
.arrow-down {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;

    border-top: 20px solid green;
}
```

Also maybe an arrow left and up just to complete the picture.

```css
.arrow-left {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;

    border-right: 20px solid green;
}

.arrow-up {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;

    border-bottom: 20px solid green;
}
```

It's easy to see the pattern here repeating itself. So what if I wanted a smaller arrow or say 10px, that would mean creating all of this code over again and just replaceing the 20px with a 10px. Moreover it would be violating the [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) principle.

SCSS functions to the rescue!

This would be the final code that would be able to generate arrows in all directions and whatever sizes we choose. In this example 5, 10 and 20px.

```scss
$sizes: small 5px, medium 10px, large 20px;
$directions: up right down left;

@mixin carrot($size, $color, $direction) {
    width: 0;
    height: 0;
    border: $size solid transparent;
    @if $direction == 'down' {
        border-top: $size solid $color;
    }
    @if $direction == 'up' {
        border-bottom: $size solid $color;
    }
    @if $direction == 'left' {
        border-right: $size solid $color;
    }
    @if $direction == 'right' {
        border-left: $size solid $color;
    }
}

@each $size in $sizes {
    @each $direction in $directions {
        .carrot-#{$direction}-#{nth($size, 1)} {
            @include carrot(nth($size, 2), #fff, $direction);
        }
    }
}
```

First off we set up our two variables $sizes and $directions. Since SCSS doesn't have the direct concept of arrays we use what is called a [list](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#lists). The values are comma separated, you can think of what is between the commas as the array portion. So if we look over \$sizes we get the first value as [small, 5px] and can access each piece using the [nth function](http://sass-lang.com/documentation/Sass/Script/Functions.html#nth-instance_method).

```scss

$sizes: small 5px, medium 10px, large 20px;

@each $size in $sizes {
  nth(($size, 1));
}

```

This would such loop the \$sizes list and grab the first term the small, medium and large. Lists start with 1 as opposed to 0 with arrays.

The next piece is a [@mixin](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) which is what we use to create a SCSS function. Inside the @mixin we have 4 conditionals which is the only part of the border that changes for each triangle direction. Thats pretty much it for the @mixin.

Next it's use.

Like we showed above we will use loops to generate the classes that will define the arrows. But more specifically we will use two loops to create the classes. First looping over the sizes and then from each size and name we specify we create the 4 directional arrows.

That's it!

Super simple SCSS functions, to abstract repetition. [Here](http://codepen.io/stenmuchow/pen/EjoLjx?editors=010) is a working example of it. If you click 'View Compiled' you can see the css that is generated from the code.
