import React, { Component } from 'react';

export default class BeerPagination extends Component {
    goToNextPage = () => {
        this.props.goToNextPage(this.props.history);
    };

    render() {
        if (this.props.isEnabled) {
            return <div className="beer-pagination">
                <div className="beer-pagination__button" onClick={this.goToNextPage}>На следующую страницу</div>
            </div>;
        }
        
        return null;
    }
}