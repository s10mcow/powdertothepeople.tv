---
layout: post
title: Moving to React/Redux from AngularJS
---

So this post is hopefully a seriers of things I have learned since starting to work with React and it's
ecosystem the last 6 months, but most importantly coming from a background of working only with AngularJs since 2013.

I have been interested in React since it started gaining traction in the last 5 years, eventually to surpass AngularJS in
most metrics. Since then though finding time between work and home life to learn it as with everything has been a balance.

So when I decided to jump in and figure this React thing out I was as with any new shiny toy - excited. I had a problem that was
annoying me so this proved a chance to kill two birds with one stone.

The problem was surfing related, or more specific cameras that monitor beaches for surf related. The telecom provider here decided to
place camera on beaches but in their doing so we needed to watch 30 seconds of commercials before getting to the goods of the waves. Since
it was just a HLS link i was able to find it in the source code of the webpage and then easily able to embed the link in my page.

You can see the link below left - [Webcams Portugal](https://powdertothepeople.tv/cams/). Its a simple React Redux app that shows cameras.

But this all is just some background. Anyways...

So what is React? Well its pretty much only a component library - you can think of it as the .component method from AngularJS. Nothing more.
Angular wants to control everything where as React is happy to just be a component - so if you want routing, state control, etc - look elsewhere.

So after having made my little app using `this.setState()` I found the next natural progression was to checkout this Redux thing. This was where
things started to slow down and become complicated and frusterating well only kinda, until the eureka moment came. I wanna try and help anyone
out there learning the same to get to that eureka moment a little faster.

Redux is a super simple concept. I think this was my major frusteration it just seemed so easy, why couldn't I grok this shit?

I watched the series on Egghead - [*Getting Started with Redux.*](https://egghead.io/courses/getting-started-with-redux) But there was just so much info thrown
at you.

So in short Redux has two main parts - actions and reducers. No need to really worry about anything else.

You dispatch and action and the reducer consumes it, but when you see this one line action method how does this get to the reducer?

```javascript
    export const someAction = goodies => ({
        type: SOME_ACTION, goodies
    });
```

When you import this action you dispatch it. 


```javascript
    import someAction from './actions/someAction.js';

    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            onClick: () => dispatch(someAction(ownProps.goodies))
        }
    }

```


Well the glue is the dispatch method. This tells Redux something has happened so go see if you can find the action name in a reducer. Then the chain is updated and
a "digest" cycle occurs this updating the $scope aka the state.

Redux provides some glue for this through its use of a higher order component - or at least to say you could use this. There are enough code examples
out there so see how this all works. But for me the first eureka happened when i realized how the actions are dispatched using the dispatch method, and
then the reducers are checked for the action. Thats pretty much it. All the other fancy stuff with pure functions and all the other jargon seems to
just add to the layer of confusion.

So if you have been working mainly with Angular and wanna move to React/Redux keep these things in mind and it will make the transition all the more
easy! That is until someone mentions [Redux-Thunk](https://github.com/gaearon/redux-thunk) or [Redux-Saga](https://github.com/redux-saga/redux-saga),
 but those are for next time.
