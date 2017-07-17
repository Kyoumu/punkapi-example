import React, { Component } from 'react';
import Select from 'react-select';

export default class BeerPaginator extends Component {
    render() {
        if (this.props.isEnabled) {
            return <div className="beer-paginator">
                <div className="beer-paginator__button" onClick={this.props.goToNextPage}>На следующую страницу</div>
            </div>;
        }
        
        return null;
    }
}