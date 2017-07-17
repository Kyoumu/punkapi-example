import { SET_PAGE, SET_PAGINATOR_AVAILABILITY } from './../constants/actions';
import { PAGES_MODE_APPEND } from './../constants';
import { requestFetchBeer } from './beer';

export const goToNextPage = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(setPage(state.paginator.page + 1));
        dispatch(requestFetchBeer(PAGES_MODE_APPEND));
    }
};

export const setPage = (page) => ({type: SET_PAGE, payload: page});

export const setPaginatorAvailability = (isEnabled) => ({type: SET_PAGINATOR_AVAILABILITY, payload: isEnabled});