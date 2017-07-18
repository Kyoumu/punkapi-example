import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import rootReducer from './../reducers';
import Home from './screens/Home';
import Beer from './screens/Beer';


const history = createHistory();
const store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <Route exact path="/" render={() => <Redirect to="/beer"/>}/>

                    <Switch>
                        <Route exact path="/beer" component={Home}/>
                        <Route path="/beer/:id" component={Beer}/>
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>;
    }
}