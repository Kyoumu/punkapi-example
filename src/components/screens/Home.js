import React, { Component } from 'react';
import BeerFilterContainer from './../../containers/BeerFilterContainer';
import BeerListContainer from './../../containers/BeerListContainer';
import BeerPaginationContainer from './../../containers/BeerPaginationContainer';
import Footer from './../Footer';

export default class Home extends Component {
    componentWillMount() {
        this.props.initializeBeerList(this.props.history.location.search);
    }

    render() {
        return <div className="component-wrapper">
            <div className="page-wrapper">
                <BeerFilterContainer history={this.props.history}/>
                <BeerListContainer history={this.props.history}/>
                <BeerPaginationContainer history={this.props.history}/>
            </div>
            <Footer/>
        </div>
    }
}