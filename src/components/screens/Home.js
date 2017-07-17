import React, { Component } from 'react';
import BeerFilterContainer from './../../containers/BeerFilterContainer';
import BeerListContainer from './../../containers/BeerListContainer';
import BeerPaginatorContainer from './../../containers/BeerPaginatorContainer';

export default class Home extends Component {
    render() {
        return <div>
            <BeerFilterContainer/>
            <BeerListContainer/>
            <BeerPaginatorContainer/>
        </div>
    }
}