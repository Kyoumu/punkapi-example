import { connect } from 'react-redux';
import { setQueryParams, extractQueryParams } from './../services/query-params';
import { requestFetchBeer, requestFetchBeerWithDelay } from './../actions/beer';
import { setPage } from './../actions/pagination';
import { toggleInfiniteScroll } from './../actions/options';
import BeerFilter from './../components/BeerFilter';

const mapStateToProps = (state, ownProps) => {
    const queryParams = extractQueryParams(ownProps.history.location.search);

    return {
        ...ownProps,
        itemsPerPage: queryParams.per_page,
        gt: queryParams.abv_gt,
        lt: queryParams.abv_lt,
        beerName: queryParams.beer_name,
        isInfiniteScroll: state.options.isInfiniteScroll
    }
};

const mapDispatchToProps = (dispatch) => ({
    setItemPerPage: (count, history) => {
        setQueryParams({per_page: count}, history);
        dispatch(setPage(1));
        dispatch(requestFetchBeer(history.location.search));
    },
    changeABV: ({gt, lt}, history) => {
        const queryParams = extractQueryParams(history.location.search);

        if (typeof gt !== 'undefined' && typeof lt !== 'undefined') {
            setQueryParams({abv_gt: gt, abv_lt: lt}, history);
        } else if (typeof gt !== 'undefined') {
            setQueryParams({abv_gt: gt, abv_lt: queryParams.abv_lt}, history);
        } else if (typeof lt !== 'undefined') {
            setQueryParams({abv_gt: queryParams.abv_gt, abv_lt: lt}, history);
        }

        if (typeof gt !== 'undefined' || typeof lt !== 'undefined') {
            dispatch(requestFetchBeerWithDelay(history.location.search));
        }
    },
    setBeerName: (beer_name, history) => {
        setQueryParams({beer_name}, history);
        dispatch(requestFetchBeerWithDelay(history.location.search));
    },
    toggleInfiniteScroll: () => {
        dispatch(toggleInfiniteScroll());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerFilter);