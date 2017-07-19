import React, { Component } from 'react';
import Loader from './../common/Loader';
import Footer from './../Footer';

export default class Beer extends Component {
    componentWillMount() {
        if (!this.props.beer && !this.props.isLoading) {
            this.props.fetchBeer(this.props.match.params.id);
        }
    }

    goToList = () => {
        this.props.goToList(this.props.history);
    };

    render() {
        const beer = this.props.beer;

        return <div className="component-wrapper">
            <div className="page-wrapper">
                <div className="beer-item">
                    <div className="button button_info button_square beer-item__nav-button" onClick={this.goToList}>Back</div>
                    {this.props.isLoading && <Loader/>}

                    <div className="container">
                        {this.props.error && <div className="alert alert_danger alert_center">{this.props.error}</div>}

                        {beer && <div className="row">
                            <div className="col-sm-4 col-md-3">
                                <img src={beer.image_url} alt={beer.name} className="beer-item__image"/>
                            </div>

                            <div className="col-sm-8 col-md-9 beer-item__content-wrapper">
                                <div className="beer-item__content">
                                    <div className="beer-item__title">{beer.name}</div>
                                    <div className="beer-item__tagline">{beer.tagline}</div>
                                    <div className="beer-item__description">{beer.description}</div>

                                    <div className="list-kv beer-item__list">
                                        <div className="list-kv__items">
                                            <div className="list-kv__item">
                                                <div className="list-kv__key">ABV</div>
                                                <div className="list-kv__value">{beer.getFormattedABV()}</div>
                                            </div>
                                            <div className="list-kv__item">
                                                <div className="list-kv__key">EBC</div>
                                                <div className="list-kv__value">{beer.ebc}</div>
                                            </div>
                                            <div className="list-kv__item">
                                                <div className="list-kv__key">SRM</div>
                                                <div className="list-kv__value">{beer.srm}</div>
                                            </div>
                                            <div className="list-kv__item">
                                                <div className="list-kv__key">PH</div>
                                                <div className="list-kv__value">{beer.ph}</div>
                                            </div>
                                            <div className="list-kv__item">
                                                <div className="list-kv__key">Litters</div>
                                                <div className="list-kv__value">{beer.getFormatedVolume()}</div>
                                            </div>
                                            <div className="list-kv__item">
                                                <div className="list-kv__key">First brewed</div>
                                                <div className="list-kv__value">{beer.first_brewed}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list beer-item__list">
                                        <div className="list__title">Food pairing</div>

                                        <div className="list__items">
                                            {(beer.food_pairing || []).map(food => <div className="list__item" key={food}>{food}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>;
    }
}