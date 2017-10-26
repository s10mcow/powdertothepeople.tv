import React, { Component } from 'react';
import Layout from './components/Layout';
import PlayersContainer from './containers/PlayersContainer'


// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class App extends Component {
    render() {
        return (
            <Layout>

                <header className="page__header">
                    <h1>Portugal Beach Cams</h1>
                </header>

                <PlayersContainer/>

            </Layout>
        );
    }
}
