import React, { Component } from 'react';

export default class BeerItem extends Component {
    render() {
        const beer = this.props.beer;
        const info = [beer.getFormatedVolume(), beer.getFormattedABV()].join(', ');

        return <div className="beer__item-wrapper">
            <div className="beer__item">
                <div className="beer__image-wrapper">
                    <img src={beer.image_url} alt={beer.name} className="beer__image"/>
                </div>

                <div className="beer__title-wrapper">
                    <div className="beer__title">{beer.name}</div>
                    {info && <div className="beer__info">({info})</div>}
                </div>

                <div className="beer__tagline">{beer.tagline}</div>
            </div>
        </div>;
    }
}