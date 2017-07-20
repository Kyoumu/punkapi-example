import { SET_PAGE, INCREMENT_PAGE, SET_PAGINATION_AVAILABILITY } from './../constants/actions';
import { PAGES_MODE_APPEND } from './../constants';
import { requestFetchBeer } from './beer';

export const goToNextPage = (queryStr) => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.beer.isLoadingList || !state.pagination.isEnabled || state.beer.listError) {
            return;
        }

        dispatch(incrementPage());
        dispatch(requestFetchBeer(queryStr, PAGES_MODE_APPEND));
    };
};

export const setPage = (page) => ({type: SET_PAGE, payload: page});

export const incrementPage = () => ({type: INCREMENT_PAGE});

export const setPaginationAvailability = (isEnabled) => ({type: SET_PAGINATION_AVAILABILITY, payload: isEnabled});