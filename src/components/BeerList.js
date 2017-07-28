import React, { Component } from 'react';
import BeerListItem from './BeerListItem';
import Loader from './common/Loader';
import { extractQueryParams } from './../services/query-params';
const chunk = require('lodash.chunk');

export default class BeerList extends Component {
    onBeerClick = (beer) => {
        this.props.onBeerClick(beer, this.props.history);
    };

    render() {
        const beerPerPage = extractQueryParams(this.props.location.search || '').per_page;
        const beerChunks = chunk(Object.values(this.props.beerList), beerPerPage);

        const beerList = [];
        for (let i = 0, length = beerChunks.length; i < length; i++) {
            beerChunks[i].forEach((beer) => beerList.push(<BeerListItem key={beer.id} beer={beer} onClick={this.onBeerClick}/>));

            if (i < length - 1) {
                beerList.push(<div key={'divider-' + i} className="beer__divider">Page {i + 2}</div>);
            }
        }

        return <div className="beer">
            {this.props.isLoading && <Loader/>}
            {this.props.error && <div className="beer__error"><div className="alert alert_danger alert_center">{this.props.error}</div></div>}
            {(beerList.length === 0 && !this.props.error && this.props.isListInitialized) && <div className="beer__empty">There are no results</div>}

            <div className="beer__items">{beerList}</div>
        </div>;
    }
}