---
layout: post
title: Styled Components
---

Using React?

Using [Styled Components](https://www.styled-components.com/)?

"Yes" - ok you can skip this article.

Im gonna assume you already know what styled components are if you have gotten this far. Maybe you're on the fence of whether to use or just use CSS, PostCSS, SCSS or whatever else makes sense for you.

Having used all the above, I can say that using the styled component paradigm in building react web apps is the best approach.

## Ease in including

Wanna start to use styled components, easy jump right in! yarn or npm install them and away you go. No need to hook up post processor, or other complicated parts to the build pipe, less config === more fun. If you wanna start using themes aka a colors JS file
just wrap your base App.js component in a handy `ThemeProvider` tag.

## Single Source of Truth

Having your CSS in your JS file will help us to locate almost all styling directly related to the components UI. There can be other places, but this is assuming some sort of CSS architectural pattern was followed.

## Style Encapsulation

Worried that your CSS adjustments will break the app? Not to worry if you change a file thats part of a component, it will sandbox all that CSS so there is no worries your stlyed will leak out and ruin your friday afternoon.

## Logical

If you are coming from a SCSS background as many of us are - since it's one of the most popular post processors for CSS out there. No worries use the same patterns and ideas that you used in SCSS - nesting, &, etc.

## Direct access to JS

This is where we start to get turbo charged. React is all about passing props around, so taking advantage of this is key. No longer do we need to add and remove classes (although you still can), to alter styling. We can
directly pass JS props to our styled components and also have JS to work on those props if we want. This massively cleans up our html structure which leads the readability, and off loads complexity to where it makes the most
sense - determining how the UI component should look like. Since the component has access similatiously to all props passed into it we can get into much more complex styling and debugging rather than just a slew of appended classnames.

### Summary

If you haven't tried styled components you really should give them a try, it will be a different approach to thinking and working with CSS. However in the long run I am very confident you will come to see the massive advantages that they
will bring to your styling table - especially having direct access to JS props! Be sure to check out the [ecosystem](https://www.styled-components.com/ecosystem) for styled components, its growing almost daily!
