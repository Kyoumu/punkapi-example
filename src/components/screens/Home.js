import React, { Component } from 'react';
import BeerFilterContainer from './../../containers/BeerFilterContainer';
import BeerListContainer from './../../containers/BeerListContainer';
import BeerPaginationContainer from './../../containers/BeerPaginationContainer';
import Footer from './../Footer';

export default class Home extends Component {
    componentWillMount() {
        this.props.requestInitializeBeerList(this.props.location.search);

        if (this.props.isInfiniteScroll) {
            this.infiniteScrollEvent = this.props.enableInfiniteScroll(this.props.location.search);
        }
    }

    componentWillUpdate(props) {
        if (props.isInfiniteScroll !== this.props.isInfiniteScroll || props.location.search !== this.props.location.search) {
            this.props.disableInfiniteScroll(this.infiniteScrollEvent);

            if (props.isInfiniteScroll) {
                this.infiniteScrollEvent = this.props.enableInfiniteScroll(props.location.search);
            }
        }
    }

    componentWillUnmount() {
        if (this.infiniteScrollEvent) {
            this.props.disableInfiniteScroll(this.infiniteScrollEvent);
        }
    }

    render() {
        return <div className="component-wrapper">
            <div className="page-wrapper">
                <BeerFilterContainer history={this.props.history} location={this.props.location}/>
                <BeerListContainer history={this.props.history} location={this.props.location}/>
                <BeerPaginationContainer history={this.props.history} location={this.props.location}/>
            </div>
            <Footer/>
        </div>;
    }
}