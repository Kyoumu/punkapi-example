import { SET_PAGE, INCREMENT_PAGE, SET_PAGINATION_AVAILABILITY } from './../constants/actions';

const initialState = {
    page: 1,
    isEnabled: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE:
            const page = Math.max(action.payload, 1);
            return {...state, page};
        case INCREMENT_PAGE:
            return {...state, page: state.page + 1};
        case SET_PAGINATION_AVAILABILITY:
            return {...state, isEnabled: action.payload};
        default:
            return state;
    }
};