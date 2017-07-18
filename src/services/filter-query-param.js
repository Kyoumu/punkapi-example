import { MIN_ABV, MAX_ABV, MIN_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from './../constants';

const filters = {
    per_page: (value) => {
        return Math.min(Math.max(value * 1, MIN_ITEMS_PER_PAGE), MAX_ITEMS_PER_PAGE);
    },
    abv_gt: (value, prevParams) => {
        const lt = (typeof prevParams.abv_lt !== 'undefined') ? Math.min(prevParams.abv_lt * 1, MAX_ABV) : MAX_ABV;
        return Math.min(Math.max(value * 1, MIN_ABV), lt);
    },
    abv_lt: (value, prevParams) => {
        const gt = (typeof prevParams.abv_gt !== 'undefined') ? Math.max(prevParams.abv_gt * 1, MIN_ABV) : MIN_ABV;
        return Math.max(Math.min(value * 1, MAX_ABV), gt);
    },
    beer_name: (value) => {
        return value;
    }
};

/**
 * Фильтрует параметр урла согласно правилам в константе filters
 * @param {string} name Название параметра
 * @param value Значение параметра
 * @param prevParams Объект со всеми предыдущими параметрами урла
 * @returns {*} Новое значение
 */
export default (name, value, prevParams = {}) => {
    if (filters[name]) {
        return filters[name](value, prevParams);
    }

    return value;
};