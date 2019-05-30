---
layout: post
title: Prettier and the Dog 
---

Working on a team of developers is always interesting. I'll leave it at that. Developers always seem to have the most interesting of personalities, and of course opinions.

* Spaces vs Tabs.
* 2 vs 4.
* Patch vs Put.
* etc...

We can probably compile a much larger list, but point made. The first two in the list is where we will focus - patch vs put can be a subject of another post.

The first two items are simply put - styling of the code. I prefer to look at 4 spaces or tabs. I never really bit into any importance of the tabs vs spaces thing... However my buddy whom I work with is in love with cramming as much shit as possible into as small a space as possible otherwise known as 2 spaces, but no real opinion either way.

So at the start of a project or maybe in the middle of a project some anal dev comes along and says we should standardizd the code base so it all looks like one person wrote it. Ive been said developer before, and appreciate some kind of uniform looking development environment and YOU should too!

So we can try and enforce through pull requests and documentation - you must follow this style or else you will be made to fix it and sit alone for lunch! I actually happy sometimes to sit alone for lunch, but thats not the point. Point is do this or else you will be made to go back and fix your shit and use time you could have been chanting your mantra - filter, map, reduce.

Woof! Woof!

What?

Woof!

Oh its our favorite friendly git hooks husky dog! Who i might add is extremely well groomed, what a shiney coat! No its just he's rocking Prettier!

Husky is a simple tool that allows us to integrate git hooks that will be performed on a commit. Some use it to run unit tests, but we use it to format our code that we will be commiting! No more third reich of coding - we can write any damn way we please and out beutiful dog will take care of it all for us.

Super simple set up here folks.

[Prettier](https://prettier.io/docs/en/index.html)

[Husky](https://github.com/typicode/husky)

We're gonna use [Pretty-Quick](https://github.com/azz/pretty-quick) but same deal just less verbose.

Npm install all the things, and then in your package.json's script section...

```javascript
"scripts": {
     "precommit": "pretty-quick --staged"
}
```

This will at least get you off and running check config docs for further goodies and for the brave integrate your eslint into your prettier config.

By the way the [docs](https://prettier.io/docs/en/why-prettier.html#clean-up-an-existing-codebase) also talk about runnning your entire flipping repo thru Prettier and doing a kitchen sink commit to get 'er all done, and up to speed.

No more wasted PR time, more time for your mantra - filter, map, reduce.
