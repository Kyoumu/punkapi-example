const queryString = require('query-string');
import { DEFAULT_ITEMS_PER_PAGE, MIN_ABV, MAX_ABV, MIN_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from './../constants';

/**
 * Убирает пустые параметры
 * @param {Object} params Объект с параметрами
 * @returns {Object} Объект с убранными пустыми параметрами
 */
export const removeEmptyParams = (params) => {
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
 * @param {Object} newQueryParams Объект с новыми параметрами
 * @param {any} history History из react-router
 * @param {Object} options Опции
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
 * Параметры из query string по-умолчанию
 */
export const defaultQueryParamsOnExtract = {
    per_page: DEFAULT_ITEMS_PER_PAGE,
    abv_gt: MIN_ABV,
    abv_lt: MAX_ABV
};

/**
 * Извлекает параметры из query string (обычно это location.search из react-router)
 * @param {string} queryStr Query string
 * @param {boolean} filter Фильтровать ли параметры
 * @param {bool} removeEmpty Убирать ли пустые параметры
 * @returns {string} Query string в виде объекта
 */
export const extractQueryParams = (queryStr, filter = true, removeEmpty = true) => {
    if (queryStr.includes('#')) {
        queryStr = queryStr.split('#')[0];
    }

    let queryParams = {...defaultQueryParamsOnExtract, ...queryString.parse(queryStr || '')};

    if (filter) {
        for (let key in queryParams) {
            queryParams[key] = filterQueryParam(key, queryParams[key], queryParams);
        }
    }

    if (removeEmpty) {
        queryParams = removeEmptyParams(queryParams);
    }

    return queryParams;
};

/**
 * Строит query string из объекта с её параметрами
 * @param {Object} queryParams Объект с параметрами для query string
 * @param {bool} removeEmpty Убирать ли пустые параметры
 * @returns {string} Query string
 */
export const buildQueryString = (queryParams, removeEmpty = true) => {
    if (removeEmpty) {
        queryParams = removeEmptyParams(queryParams);
    }

    return queryString.stringify(queryParams);
};

/**
 * Фильтрует параметр урла согласно правилам в константе filters
 * @param {string} name Название параметра
 * @param {any} value Значение параметра
 * @param {Object} prevParams Объект со всеми предыдущими параметрами урла
 * @returns {any} Новое значение
 */
export const filterQueryParam = (name, value, prevParams = {}) => {
    const filters = {
        per_page: (value) => {
            return Math.min(Math.max(value * 1, MIN_ITEMS_PER_PAGE), MAX_ITEMS_PER_PAGE);
        },
        abv_gt: (value, prevParams) => {
            const lt = (typeof prevParams.abv_lt !== 'undefined') ? Math.min(prevParams.abv_lt * 1, MAX_ABV) : MAX_ABV;
            value = value || MIN_ABV;

            return Math.min(Math.max(value * 1, MIN_ABV), lt);
        },
        abv_lt: (value, prevParams) => {
            const gt = (typeof prevParams.abv_gt !== 'undefined') ? Math.max(prevParams.abv_gt * 1, MIN_ABV) : MIN_ABV;
            value = value || MAX_ABV;

            return Math.max(Math.min(value * 1, MAX_ABV), gt);
        },
        beer_name: (value) => {
            return value;
        }
    };

    if (filters[name]) {
        return filters[name](value, prevParams);
    }

    return value;
};