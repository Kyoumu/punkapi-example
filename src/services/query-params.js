const queryString = require('query-string');
import filterQueryParam from './filter-query-param';
import { DEFAULT_ITEMS_PER_PAGE, MIN_ABV, MAX_ABV } from './../constants';

/**
 * Убирает пустые параметры
 * @param params Объект с параметрами
 * @returns {{}} Объект с убранными пустыми параметрами
 */
const removeEmptyParams = (params) => {
    let newParams = {...params};
    let emptyKeys = [];

    for (let key in newParams) {
        if (newParams[key] === '' || typeof newParams[key] === 'undefined') {
            emptyKeys.push(key);
        }
    }

    emptyKeys.forEach((key) => delete newParams[key]);

    return newParams;
};

/**
 * Устанавливает новые параметры в query string текущего url в браузере
 * @param newQueryParams Объект с новыми параметрами
 * @param history History из react-router
 * @param options Опции
 */
export const setQueryParams = (newQueryParams, history, options = {}) => {
    options = {
        filter: true,
        removeEmpty: true,
        mode: 'push',
        ...options
    };

    let queryParams = queryString.parse(history.location.search || '');
    for (let key in newQueryParams) {
        queryParams[key] = newQueryParams[key];
    }

    if (options.filter) {
        for (let key in queryParams) {
            queryParams[key] = filterQueryParam(key, queryParams[key], queryParams);
        }
    }

    if (options.removeEmpty) {
        queryParams = removeEmptyParams(queryParams);
    }

    history[options.mode]({
        pathname: history.location.pathname,
        search: queryString.stringify(queryParams),
    })
};

/**
 * Извлекает параметры из query string (обычно это history.location.search из react-router)
 * @param {string} queryStr Query string
 * @param filter Фильтровать ли параметры
 * @returns {string} Объект с убранными пустыми параметрами
 */
export const extractQueryParams = (queryStr, filter = true) => {
    const defaultQueryParams = {
        per_page: DEFAULT_ITEMS_PER_PAGE,
        abv_gt: MIN_ABV,
        abv_lt: MAX_ABV,
        beer_name: ''
    };

    let queryParams = {...defaultQueryParams, ...queryString.parse(queryStr || '')};

    if (filter) {
        for (let key in queryParams) {
            queryParams[key] = filterQueryParam(key, queryParams[key], queryParams);
        }
    }

    return queryParams;
};

/**
 * Строит query string из объекта с её параметрами
 * @param queryParams Объект с параметрами для query string
 * @param {bool} removeEmpty Убирать ли пустые параметры
 * @returns {string} Query string
 */
export const buildQueryString = (queryParams, removeEmpty = true) => {
    if (removeEmpty) {
        queryParams = removeEmptyParams(queryParams);
    }

    return queryString.stringify(queryParams);
};