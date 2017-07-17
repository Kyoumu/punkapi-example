import { SET_ITEMS_PER_PAGE, SET_MIN_ABV, SET_MAX_ABV } from './../constants/actions';
import { MIN_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE, MIN_ABV, MAX_ABV } from './../constants';

const initialState = {
    itemsPerPage: 24,
    minABV: MIN_ABV,
    maxABV: MAX_ABV,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS_PER_PAGE:
            const itemsPerPage = Math.max(Math.min(action.payload, MAX_ITEMS_PER_PAGE), MIN_ITEMS_PER_PAGE);
            return {...state, itemsPerPage};
        case SET_MIN_ABV:
            return {...state, minABV: Math.min(Math.max(action.payload, MIN_ABV), state.maxABV)};
        case SET_MAX_ABV:
            return {...state, maxABV: Math.max(Math.min(action.payload, MAX_ABV), state.minABV)};
        default:
            return state;
    }
};