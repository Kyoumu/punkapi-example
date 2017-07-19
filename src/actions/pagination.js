import { SET_PAGE, SET_PAGINATION_AVAILABILITY } from './../constants/actions';
import { PAGES_MODE_APPEND } from './../constants';
import { requestFetchBeer } from './beer';

export const goToNextPage = (queryStr) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(setPage(state.pagination.page + 1));
        dispatch(requestFetchBeer(queryStr, PAGES_MODE_APPEND, false));
    };
};

export const setPage = (page) => ({type: SET_PAGE, payload: page});

export const setPaginationAvailability = (isEnabled) => ({type: SET_PAGINATION_AVAILABILITY, payload: isEnabled});