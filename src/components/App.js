import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './../reducers';
import BeerListContainer from './../containers/BeerListContainer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <BeerListContainer/>
        </Provider>;
    }
}