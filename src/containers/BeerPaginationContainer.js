import { connect } from 'react-redux';
import BeerPagination from './../components/BeerPagination';
import { goToNextPage } from './../actions/pagination';
import isFullscreen from './../services/is-fullscreen';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isEnabled: (state.pagination.isNextPageAvailable && !state.beer.listError && (!state.options.isInfiniteScroll || isFullscreen())),
    isNoMoreResults: (!state.pagination.isNextPageAvailable && state.pagination.page > 1)
});

const mapDispatchToProps = (dispatch) => ({
    goToNextPage: (queryStr) => {
        dispatch(goToNextPage(queryStr));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerPagination);