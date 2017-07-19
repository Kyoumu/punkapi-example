import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import rootReducer from './../reducers';
import HomeContainer from './../containers/screens/HomeContainer';
import BeerContainer from './../containers/screens/BeerContainer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <BrowserRouter>
                <div className="routers-wrapper">
                    <Route exact path="/" render={() => <Redirect to="/beer"/>}/>

                    <Switch>
                        <Route exact path="/beer" component={HomeContainer}/>
                        <Route path="/beer/:id" component={BeerContainer}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>;
    }
}