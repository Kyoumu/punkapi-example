import React, { Component } from 'react';
import BeerListItem from './BeerListItem';
import Loader from './common/Loader';

export default class BeerList extends Component {
    onBeerClick = (beer) => {
        this.props.onBeerClick(beer, this.props.history);
    };

    render() {
        const beerList = Object.values(this.props.beerList);

        return <div className="beer">
            {this.props.isLoading && <Loader/>}
            {this.props.error && <div className="beer__error"><div className="alert alert_danger alert_center">{this.props.error}</div></div>}
            {(beerList.length === 0 && !this.props.error) && <div className="beer__empty">Результаты по данному запросу отсутствуют.</div>}

            <div className="beer__items">
                {beerList.map((beer) => {
                    return <BeerListItem key={beer.id} beer={beer} onClick={this.onBeerClick}/>
                })}
            </div>
        </div>;
    }
}