import { SET_PAGE, INCREMENT_PAGE, SET_NEXT_PAGE_AVAILABILITY } from './../constants/actions';

const initialState = {
    page: 1,
    isNextPageAvailable: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE:
            const page = Math.max(action.payload, 1);
            return {...state, page};
        case INCREMENT_PAGE:
            return {...state, page: state.page + 1};
        case SET_NEXT_PAGE_AVAILABILITY:
            return {...state, isNextPageAvailable: action.payload};
        default:
            return state;
    }
};