import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import rootReducer from './reducers';
import { stateSaver, getSavedState } from './services/state-saver';
import HomeContainer from './containers/screens/HomeContainer';
import BeerContainer from './containers/screens/BeerContainer';
import NotFound from './components/screens/NotFound';

const store = createStore(rootReducer, getSavedState(), applyMiddleware(thunk, stateSaver));

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <BrowserRouter>
                <div className="routers-wrapper">
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/beer"/>}/>
                        <Route exact path="/beer" component={HomeContainer}/>
                        <Route path="/beer/:id" component={BeerContainer}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>;
    }
}