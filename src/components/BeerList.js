import React, { Component } from 'react';
import BeerItem from './BeerItem';

export default class BeerList extends Component {
    componentDidMount() {
        this.props.fetchBeer();
    }

    render() {


        return <div className="beer">
            {this.props.error && <div className="beer__error">{this.props.error}</div>}

            <div className="beer__items">
                {Object.values(this.props.beerList).map((beer) => {
                    return <BeerItem key={beer.id} beer={beer}/>
                })}
            </div>
        </div>;
    }
}