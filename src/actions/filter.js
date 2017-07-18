import { SET_ITEMS_PER_PAGE, SET_MIN_ABV, SET_MAX_ABV, SET_BEER_NAME, SET_BEER_NAME_TIMER, SET_ABV_TIMER } from './../constants/actions';
import { FILTER_DELAY } from './../constants';
import { requestFetchBeer } from './beer';
import { setPage } from './paginator';

export const setItemPerPage = (count) => {
    return (dispatch, getState) => {
        if (getState().filter.itemsPerPage !== count) {
            dispatch({type: SET_ITEMS_PER_PAGE, payload: count});
            dispatch(setPage(1));
            dispatch(requestFetchBeer());
        }
    };
};

export const setABV = ({min, max}) => {
    return (dispatch) => {
        if (typeof min !== 'undefined') {
            dispatch({type: SET_MIN_ABV, payload: min});
        }
        if (typeof max !== 'undefined') {
            dispatch({type: SET_MAX_ABV, payload: max});
        }

        if (typeof max !== 'undefined' || typeof min !== 'undefined') {
            const timerID = setTimeout(() => {
                dispatch(requestFetchBeer());
            }, FILTER_DELAY);
            dispatch({type: SET_ABV_TIMER, payload: timerID});
        }
    };
};

export const setBeerName = (value) => {
    return (dispatch) => {
        dispatch({type: SET_BEER_NAME, payload: value});

        const timerID = setTimeout(() => {
            dispatch(requestFetchBeer());
        }, FILTER_DELAY);
        dispatch({type: SET_BEER_NAME_TIMER, payload: timerID});
    };
};