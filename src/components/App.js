import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import rootReducer from './../reducers';
import Home from './screens/Home';
import Beer from './screens/Beer';


const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route exact path="/" render={() => <Redirect to="/beer"/>}/>

                    <Switch>
                        <Route exact path="/beer" component={Home}/>
                        <Route path="/beer/:id" component={Beer}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>;
    }
}