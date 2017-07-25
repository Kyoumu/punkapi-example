import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import { PROD_BASE_PATH, DEV_BASE_PATH } from './constants';
import rootSaga from './sagas';
import rootReducer from './reducers';
import { stateSaver, getSavedState } from './services/state-saver';
import HomeContainer from './containers/screens/HomeContainer';
import BeerContainer from './containers/screens/BeerContainer';
import NotFound from './components/screens/NotFound';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, getSavedState(), applyMiddleware(sagaMiddleware, stateSaver));
sagaMiddleware.run(rootSaga);

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