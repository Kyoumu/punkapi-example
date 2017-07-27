import { buildQueryString } from './query-params';
import Beer from './../domains/Beer';

/**
 * Возвращает список пива
 * @param {Object} params Объект с параметрами
 * @throws {Error} При ошибке получения данных
 * @returns {Promise<Array>}
 */
export const getAll = async (params = {}) => {
    let beerData;
    try {
        const response = await fetch('https://api.punkapi.com/v2/beers?' + buildQueryString(params));
        beerData = await response.json();
    } catch (e) {
        beerData = {error: true, message: '404'};
    }

    if (beerData.error) {
        throw new Error(beerData.message);
    }

    let beerList = {};
    beerData.forEach(beerItemData => {
        const beer = new Beer(beerItemData);
        beerList[beer.id] = beer;
    });
    return beerList;
};

/**
 * Возвращает пиво по его ID
 * @param {number} id ID пива
 * @throws {Error} При ошибке получения данных
 * @returns {Promise<Object>}
 */
export const getOneByID = async (id) => {
    let beerData;
    try {
        const response = await fetch('https://api.punkapi.com/v2/beers/' + id);
        beerData = await response.json();
    } catch (e) {
        beerData = {error: true, message: '404'};
    }

    if (beerData.error) {
        throw new Error(beerData.message);
    }

    return new Beer(beerData[0]);
};