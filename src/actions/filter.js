import { SET_ITEMS_PER_PAGE, SET_MIN_ABV, SET_MAX_ABV } from './../constants/actions';
import { requestFetchBeer } from './beer';
import { setPage } from './paginator';

export const setItemPerPage = (count) => {
    return (dispatch, getState) => {
        if (getState().filter.itemsPerPage !== count) {
            dispatch({type: SET_ITEMS_PER_PAGE, payload: count});
            dispatch(setPage(1));
            dispatch(requestFetchBeer());
        }
    }
};

export const setMinABV = (value) => ({type: SET_MIN_ABV, payload: value});
export const setMaxABV = (value) => ({type: SET_MAX_ABV, payload: value});