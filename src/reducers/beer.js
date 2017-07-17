import { FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE } from './../constants/actions';

const initialState = {
    isLoading: false,
    list: [],
    error: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BEER_REQUEST:
            return {...state, isLoading: true, error: false};
        case FETCH_BEER_SUCCESS:
            return {...state, list: (action.payload || []), isLoading: false, error: false};
        case FETCH_BEER_FAILURE:
            return {...state, isLoading: false, error: action.error};
        default:
            return state;
    }
};