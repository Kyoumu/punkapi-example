import { connect } from 'react-redux';
import BeerPagination from './../components/BeerPagination';
import { goToNextPage } from './../actions/pagination';
import isContentFitInScreen from './../services/is-content-fit-in-screen';

//isContentFitInScreen нужен для того, что если infiniteScroll включен и контент помещается в экран, то нужно показывать пагинатор, так как скроллить не получится
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isEnabled: (state.pagination.isNextPageAvailable && !state.beer.listError && (!state.options.isInfiniteScroll || isContentFitInScreen())),
    isNoMoreResults: (!state.pagination.isNextPageAvailable && state.pagination.page > 1),
    isListInitialized: state.beer.isListInitialized
});

const mapDispatchToProps = (dispatch) => ({
    goToNextPage: (queryStr) => {
        dispatch(goToNextPage(queryStr));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerPagination);