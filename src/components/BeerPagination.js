import React, { Component } from 'react';

export default class BeerPagination extends Component {
    goToNextPage = () => {
        this.props.goToNextPage(this.props.location.search);
    };

    render() {
        if (this.props.isEnabled && this.props.isListInitialized) {
            return <div className="beer-pagination">
                <div className="button button_info" onClick={this.goToNextPage}>Загрузить ещё</div>
            </div>;
        } else if (this.props.isNoMoreResults) {
            return <div className="beer-pagination__no-more-results">Были загружены все результаты</div>;
        } else {
            return null;
        }
    }
}