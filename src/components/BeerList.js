import React, { Component } from 'react';
import BeerItem from './BeerItem';
import Loader from './common/Loader';

export default class BeerList extends Component {
    componentDidMount() {
        this.props.fetchBeer();
    }

    render() {
        const beerList = Object.values(this.props.beerList);

        return <div className="beer">
            {this.props.isLoading && <Loader className="beer__loader"/>}
            {this.props.error && <div className="beer__error">{this.props.error}</div>}
            {beerList.length === 0 && <div className="beer__empty">Результаты по данному запросу отсутствуют.</div>}

            <div className="beer__items">
                {beerList.map((beer) => {
                    return <BeerItem key={beer.id} beer={beer}/>
                })}
            </div>
        </div>;
    }
}