import { buildQueryString } from './query-params';
import Beer from './../domains/Beer';

/**
 * Возвращает список пива
 * @param params Объект с параметрами
 * @throws Error При ошибке получения данных
 * @returns {Promise<Array>}
 */
export const getAll = async (params) => {
    const url = 'https://api.punkapi.com/v2/beers?' + buildQueryString(params);

    const response = await fetch(url);
    const beerData =  await response.json();

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
 * @param id ID пива
 * @throws Error При ошибке получения данных
 * @returns {Promise<Object>}
 */
export const getOneByID = async (id) => {
    const response = await fetch('https://api.punkapi.com/v2/beers/' + id);
    const beerData = await response.json();

    if (beerData.error) {
        throw new Error(beerData.message);
    }

    return new Beer(beerData[0]);
};