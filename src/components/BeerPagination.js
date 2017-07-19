import React, { Component } from 'react';

export default class BeerPagination extends Component {
    goToNextPage = () => {
        this.props.goToNextPage(this.props.history.location.search);
    };

    render() {
        if (this.props.isEnabled) {
            return <div className="beer-pagination">
                <div className="button button_info" onClick={this.goToNextPage}>Загрузить ещё</div>
            </div>;
        }
        
        return null;
    }
}