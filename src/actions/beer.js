import 'whatwg-fetch';
import { extractQueryParams, buildQueryString } from './../services/query-params';
import {
    FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE, SET_FETCH_BEER_TIMER, CLEAR_FETCH_BEER_TIMER, BEER_LIST_INITIALIZE,
    FETCH_BEER_ITEM_REQUEST, FETCH_BEER_ITEM_SUCCESS, FETCH_BEER_ITEM_FAILURE
} from './../constants/actions';
import { PAGES_MODE_REPLACE, FILTER_DELAY } from './../constants';
import { setPaginationAvailability } from './pagination';
import Beer from './../domains/Beer';
import { setPage } from './pagination';

/**
 * Инициализация списка с пивом в первый раз при заходе на страницу Home
 * @param queryStr (см. requestFetchBeer)
 * @param mode (см. requestFetchBeer)
 */
export const initializeBeerList = (queryStr, mode) => {
    return (dispatch, getState) => {
        if (!getState().beer.isListInitialized) {
            dispatch({type: BEER_LIST_INITIALIZE});
            dispatch(requestFetchBeer(queryStr, mode));
        }
    };
};

/**
 * Загрузить список пива, учитывая параметры из url с задержкой
 * @param queryStr (см. requestFetchBeer)
 * @param mode (см. requestFetchBeer)
 */
export const requestFetchBeerWithDelay = (queryStr, mode) => {
    return (dispatch) => {
        const timerID = setTimeout(() => {
            dispatch(clearFetchBeerTimer());
            dispatch(requestFetchBeer(queryStr, mode));
        }, FILTER_DELAY);

        dispatch({type: SET_FETCH_BEER_TIMER, payload: timerID});
    };
};

/**
 * Загрузить список пива, учитывая параметры из url
 * @param {string} queryStr Query string, из которой возьмётся параметры для загрузки списка пива
 * @param mode Очищать ли предыдущий список (PAGES_MODE_REPLACE) или добавлять в его конец (PAGES_MODE_APPEND)
 * @param {boolean} resetPage Сбрасывать ли номер страницы при загрузке
 */
export const requestFetchBeer = (queryStr, mode = PAGES_MODE_REPLACE, resetPage = true) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_BEER_REQUEST});
        if (resetPage) {
            dispatch(setPage(1));
        }

        const state = getState();

        try {
            const pageQueryParams = extractQueryParams(queryStr || '');
            const queryParams = {
                page: state.pagination.page,
                per_page: pageQueryParams.per_page,
                abv_gt: pageQueryParams.abv_gt,
                abv_lt: pageQueryParams.abv_lt,
                beer_name: pageQueryParams.beer_name.trim().replace(/ /g, '_')
            };
            const url = 'https://api.punkapi.com/v2/beers?' + buildQueryString(queryParams);

            const response = await fetch(url);
            const beerData = await response.json();

            if (beerData.error) {
                throw new Error(beerData.message);
            }

            let beerList = {};
            beerData.forEach(beerItemData => {
                const beer = new Beer(beerItemData);
                beerList[beer.id] = beer;
            });

            dispatch(setPaginationAvailability(beerData.length === pageQueryParams.per_page));
            dispatch(successFetchBeer(beerList, mode));
        } catch (e) {
            dispatch(failureFetchBeer(e.message));
        }
    };
};

/**
 * Вызывается после успешной загрузки списка пива
 * @param list Список пива
 * @param mode Режим (см. requestFetchBeer)
 */
export const successFetchBeer = (list, mode = PAGES_MODE_REPLACE) => ({type: FETCH_BEER_SUCCESS, payload: {list, mode}});

/**
 * Вызывается после неудачной загрузки списка пива
 * @param {string} error Сообщение об ошибке
 */
export const failureFetchBeer = (error) => ({type: FETCH_BEER_FAILURE, error});


/**
 * Выполняется когда нужно очистить таймер задержки загрузки списка пива (см. requestFetchBeerWithDelay)
 */
export const clearFetchBeerTimer = () => ({type: CLEAR_FETCH_BEER_TIMER});


/**
 * Загрузка информации о пиве по его ИД
 * @param id ИД пива
 */
export const requestFetchBeerItem = (id) => {
    return async (dispatch) => {
        dispatch({type: FETCH_BEER_ITEM_REQUEST, payload: id});

        try {
            const response = await fetch('https://api.punkapi.com/v2/beers/' + id);
            const beerData = await response.json();

            if (beerData.error) {
                throw new Error(beerData.message);
            }

            const beer = new Beer(beerData[0]);
            dispatch(successFetchBeerItem(beer));
        } catch (e) {
            dispatch(failureFetchBeerItem(id, e.message));
        }
    };
};

/**
 * Вызывается после успешной загрузки одного пива
 * @param beer Одно пиво
 */
export const successFetchBeerItem = (beer) => ({type: FETCH_BEER_ITEM_SUCCESS, payload: beer});

/**
 * Вызывается после неудачной загрузки одного пива
 * @param id ИД пива
 * @param {string} error Сообщение об ошибке
 */
export const failureFetchBeerItem = (id, error) => ({type: FETCH_BEER_ITEM_FAILURE, error, payload: id});