import { TOGGLE_INFINITE_SCROLL } from './../constants/actions';

const initialState = {
    isInfiniteScroll: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_INFINITE_SCROLL:
            return {...state, isInfiniteScroll: !state.isInfiniteScroll};
        default:
            return state;
    }
}