import React, { Component } from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import { MIN_ABV, MAX_ABV } from './../constants';

export default class BeerFilter extends Component {
    itemsPerPageOptions = [
        {value: 12, label: 12},
        {value: 24, label: 24},
        {value: 48, label: 48}
    ];

    render() {
        return <div className="beer-filter">
            <div className="beer-filter__abv">
                <input type="number" className="beer-filter__abv-input" placeholder={MIN_ABV} value={this.props.minABV} onChange={this.props.changeMinABV}/>

                <Slider.Range
                    className="beer-filter__abv-range"
                    min={MIN_ABV}
                    max={MAX_ABV}
                    step={1}
                    allowCross={false}
                    value={[this.props.minABV, this.props.maxABV]}
                    onChange={this.props.changeABV}
                />

                <input type="number" className="beer-filter__abv-input" placeholder={MAX_ABV} value={this.props.maxABV} onChange={this.props.changeMaxABV}/>
            </div>

            <Select
                className="beer-filter__items-per-page"
                value={this.props.itemsPerPage}
                onChange={this.props.setItemPerPage}
                options={this.itemsPerPageOptions}
                clearable={false}
                backspaceRemoves={false}
                searchable={false}
            />
        </div>;
    }
}