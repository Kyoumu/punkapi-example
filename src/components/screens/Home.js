import React, { Component } from 'react';
import BeerFilterContainer from './../../containers/BeerFilterContainer';
import BeerListContainer from './../../containers/BeerListContainer';
import BeerPaginationContainer from './../../containers/BeerPaginationContainer';
import Footer from './../Footer';

export default class Home extends Component {
    componentWillMount() {
        this.props.initializeBeerList(this.props.history.location.search);

        if (this.props.isInfiniteScroll) {
            this.infiniteScrollEvent = this.props.enableInfiniteScroll(this.props.history.location.search);
        }
    }

    componentWillUpdate(props) {
        if (props.isInfiniteScroll !== this.props.isInfiniteScroll) {
            this.props.disableInfiniteScroll(this.infiniteScrollEvent);

            if (props.isInfiniteScroll) {
                this.infiniteScrollEvent = this.props.enableInfiniteScroll(props.history.location.search);
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
                <BeerFilterContainer history={this.props.history}/>
                <BeerListContainer history={this.props.history}/>
                <BeerPaginationContainer history={this.props.history}/>
            </div>
            <Footer/>
        </div>;
    }
}