import { FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE } from './../constants/actions';
import { PAGES_MODE_REPLACE, PAGES_MODE_APPEND } from './../constants';

const initialState = {
    isLoading: false,
    list: {},
    error: false
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
        default:
            return state;
    }
};