---
layout: post
title: this.props.children for Loading
---

This is a pretty simple approach and a very common pattern in React, but when using it to halt the loading of an app it becomes a powerful tool.

Working with some pretty great devs in the last years has introduced me to some great React patterns, this has become a standard go to for all of my apps that require some
async activity before the app is loaded.

This pattern is made up of two components `<AppStartup/>` and `<AppReadyWaiter/>`.

## <AppStartup/>

```javascript
class AppStartup extends React.PureComponent {
    componentDidMount() {
        this.props.initApp();
    }
    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => ({
    initApp: () => dispatch(actions.appInit()),
});

export default connect(
    null,
    mapDispatchToProps
)(AppStartup);
```

This is a fairly simple straight forward component it basically just kicks off some app init activity. We can include it in the app like so.

```jsx
const render = Component => (
    <Provider>
        <AppStartup />
        <AppReadyWaiter>
            <Welcome>
                <Component />
            </Welcome>
        </AppReadyWaiter>
    </Provider>
);

render(App);
```

So when the app tree is kicked off in the index.js file `<AppStartup/>` does it thing and kicks off the initialization.

Next we can see the `<AppReadyWaiter/>` and as the name suggests it waits until the app is ready. Here is where we can use some of the `this.props.children` magic.

```jsx
class AppReadyWaiter extends React.PureComponent {
    render() {
        const { appUserInitialized, children } = this.props;
        return !appUserInitialized ? <Loader /> : <div>{children}</div>;
    }
}

const mapStateToProps = state => ({
    appUserInitialized: appUserInitialized(state),
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(AppReadyWaiter)
);
```

So here what we do is listen for the state prop `appUserInitialized` which in my instance comes from a Saga firing an action to set it to true. Its so simple but yet so powerful, we halt any further app rendering
as we depend on certain data being in the app, we can add a simple loader or splash type screen to give the user some confortable feedback that the app is doing something.

So in my saga file the app init looks something like this.

```javascript
function* appInit() {
    yield call(fetchUser);

    yield put(actions.setAppUserInitialized()); //<----- Kicks off the AppReadyWaiter

    yield all([call(fetchTranslations), call(fetchSearchableContent), call(modulesFetch), call(fetchContainersSaga)]);

    yield delay(3000);

    yield put(actions.setAppStatusInitialized()); // <------- Kicks off the Welcome
}
```

So here we can fetch two pieces of data that the app might need, first we need the user so we can determine who is using the app (maybe certain routes we wanan turn on or off), then we can fetch a whole bunch of
other data the app might need before its all ready to go. We have a slight delay here baked in as well just for a nice UI so the welcome screen isn't potentially just a flash.

Super powerful and super simple!

Good times!
