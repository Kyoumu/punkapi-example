import 'whatwg-fetch';
import {
    FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE, BEER_LIST_INITIALIZE_REQUEST, FETCH_BEER_WITH_DELAY_REQUEST, BEER_LIST_INITIALIZE_SUCCESS,
    FETCH_BEER_ITEM_REQUEST, FETCH_BEER_ITEM_SUCCESS, FETCH_BEER_ITEM_FAILURE
} from './../constants/actions';
import { PAGES_MODE_REPLACE } from './../constants';

/**
 * Инициализация списка с пивом в первый раз при заходе на страницу Home
 * @param {string} queryStr (см. requestFetchBeerList)
 */
export const requestInitializeBeerList = (queryStr) => ({type: BEER_LIST_INITIALIZE_REQUEST, payload: queryStr});

/**
 * Вызывается после успешной инициализации загрузки пива
 */
export const successInitializeBeerList = () => ({type: BEER_LIST_INITIALIZE_SUCCESS});

/**
 * Загрузить список пива, учитывая параметры из url с задержкой
 * @param {string} queryStr (см. requestFetchBeerList)
 * @param {string} mode (см. requestFetchBeerList)
 */
export const requestFetchBeerListWithDelay = (queryStr, mode = PAGES_MODE_REPLACE) => ({type: FETCH_BEER_WITH_DELAY_REQUEST, payload: {queryStr, mode}});

/**
 * Загрузить список пива, учитывая параметры из url
 * @param {string} queryStr Query string, из которой возьмётся параметры для загрузки списка пива
 * @param {string} mode Очищать ли предыдущий список (PAGES_MODE_REPLACE) или добавлять в его конец (PAGES_MODE_APPEND)
 */
export const requestFetchBeerList = (queryStr, mode = PAGES_MODE_REPLACE) => ({type: FETCH_BEER_REQUEST, payload: {queryStr, mode}});

/**
 * Вызывается после успешной загрузки списка пива
 * @param {Array<Beer>} list Список пива
 * @param {string} mode Режим (см. requestFetchBeerList)
 */
export const successFetchBeerList = (list, mode = PAGES_MODE_REPLACE) => ({type: FETCH_BEER_SUCCESS, payload: {list, mode}});

/**
 * Вызывается после неудачной загрузки списка пива
 * @param {string} error Сообщение об ошибке
 */
export const failureFetchBeerList = (error) => ({type: FETCH_BEER_FAILURE, payload: error});



/**
 * Загрузка информации о пиве по его ИД
 * @param {number} id ИД пива
 */
export const requestFetchBeerItem = (id) => ({type: FETCH_BEER_ITEM_REQUEST, payload: id});

/**
 * Вызывается после успешной загрузки одного пива
 * @param {Beer} beer Одно пиво
 */
export const successFetchBeerItem = (beer) => ({type: FETCH_BEER_ITEM_SUCCESS, payload: beer});

/**
 * Вызывается после неудачной загрузки одного пива
 * @param {number} id ИД пива
 * @param {string} error Сообщение об ошибке
 */
export const failureFetchBeerItem = (id, error) => ({type: FETCH_BEER_ITEM_FAILURE, payload: {id, error}});