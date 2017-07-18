import React, { Component } from 'react';
import BeerFilterContainer from './../../containers/BeerFilterContainer';
import BeerListContainer from './../../containers/BeerListContainer';
import BeerPaginationContainer from './../../containers/BeerPaginationContainer';

export default class Home extends Component {
    render() {
        return <div>
            <BeerFilterContainer history={this.props.history}/>
            <BeerListContainer history={this.props.history}/>
            <BeerPaginationContainer history={this.props.history}/>
        </div>
    }
}