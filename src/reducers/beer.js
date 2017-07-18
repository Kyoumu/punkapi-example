import { FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE, SET_FETCH_BEER_TIMER, CLEAR_FETCH_BEER_TIMER } from './../constants/actions';
import { PAGES_MODE_REPLACE } from './../constants';

const initialState = {
    isLoading: false,
    list: {},
    error: false,
    fetchTimer: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BEER_REQUEST:
            return {...state, isLoading: true, error: false};
        case FETCH_BEER_SUCCESS:
            const list = (action.payload.mode === PAGES_MODE_REPLACE) ?
                action.payload.list :
                {...state.list, ...action.payload.list};

            return {...state, list, isLoading: false, error: false};
        case FETCH_BEER_FAILURE:
            return {...state, isLoading: false, error: action.error};
        case SET_FETCH_BEER_TIMER:
            if (state.fetchTimer) {
                clearTimeout(state.fetchTimer);
            }

            return {...state, fetchTimer: action.payload};
        case CLEAR_FETCH_BEER_TIMER:
            return {...state, fetchTimer: null};
        default:
            return state;
    }
};