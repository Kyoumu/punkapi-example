import {
    FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE, SET_FETCH_BEER_TIMER, CLEAR_FETCH_BEER_TIMER, BEER_LIST_INITIALIZE,
    FETCH_BEER_ITEM_REQUEST, FETCH_BEER_ITEM_SUCCESS, FETCH_BEER_ITEM_FAILURE
} from './../constants/actions';
import { PAGES_MODE_REPLACE } from './../constants';

const initialState = {
    isListInitialized: false,
    isLoadingList: false,
    itemLoadings: {}, //список идентификаторов загружаемых бутылок пива в формате [id]: true
    currentList: {}, //только отфильтрованный список пива
    totalList: {}, //список, состоящий из всех встречавшихся бутылок пива
    listError: false,
    itemErrors: {}, //список ошибок загрузки отдельных бутылок в формате [id]: errorMessage
    fetchTimer: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BEER_LIST_INITIALIZE:
            return {...state, isListInitialized: true};
        case FETCH_BEER_REQUEST:
            return {...state, isLoadingList: true, listError: false};
        case FETCH_BEER_SUCCESS:
            const currentList = (action.payload.mode === PAGES_MODE_REPLACE) ?
                action.payload.list :
                {...state.currentList, ...action.payload.list};
            const totalList = {...state.totalList, ...action.payload.list};

            return {...state, currentList, totalList, isLoadingList: false, listError: false};
        case FETCH_BEER_FAILURE:
            return {...state, isLoadingList: false, listError: action.error};
        case SET_FETCH_BEER_TIMER:
            if (state.fetchTimer) {
                clearTimeout(state.fetchTimer);
            }

            return {...state, fetchTimer: action.payload};
        case CLEAR_FETCH_BEER_TIMER:
            return {...state, fetchTimer: null};
        case FETCH_BEER_ITEM_REQUEST:
            return {
                ...state,
                itemLoadings: {...state.itemLoadings, [action.payload]: true},
                itemErrors: {...state.itemErrors, [action.payload]: false}
            };
        case FETCH_BEER_ITEM_SUCCESS:
            return {
                ...state,
                itemLoadings: {...state.itemLoadings, [action.payload.id]: false},
                itemErrors: {...state.itemErrors, [action.payload.id]: false},
                totalList: {...state.totalList, [action.payload.id]: action.payload}
            };
        case FETCH_BEER_ITEM_FAILURE:
            return {
                ...state,
                itemLoadings: {...state.itemLoadings, [action.payload]: false},
                itemErrors: {...state.itemErrors, [action.payload]: action.error}
            };
        default:
            return state;
    }
};