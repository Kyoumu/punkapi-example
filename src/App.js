import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { PROD_BASE_PATH, DEV_BASE_PATH } from './constants';
import rootReducer from './reducers';
import { stateSaver, getSavedState } from './services/state-saver';
import HomeContainer from './containers/screens/HomeContainer';
import BeerContainer from './containers/screens/BeerContainer';
import NotFound from './components/screens/NotFound';

const store = createStore(rootReducer, getSavedState(), applyMiddleware(thunk, stateSaver));

export default class App extends Component {
    render() {
        const basename = (process.env.NODE_ENV === 'production') ? PROD_BASE_PATH : DEV_BASE_PATH;

        return <Provider store={store}>
            <BrowserRouter basename={basename}>
                <div className="routers-wrapper">
                    <Switch>
                        <Redirect exact from="/" to="/beer"/>
                        <Route exact path="/beer" component={HomeContainer}/>
                        <Route path="/beer/:id" component={BeerContainer}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>;
    }
}