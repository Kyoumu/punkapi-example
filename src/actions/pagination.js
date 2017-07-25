import { GO_TO_NEXT_PAGE, SET_PAGE, INCREMENT_PAGE, SET_NEXT_PAGE_AVAILABILITY } from './../constants/actions';

/**
 * Переходит на следующую страницу и запрашивает список пива для данной страницы, присоединяя его к существующему
 * @param {string} queryStr
 */
export const goToNextPage = (queryStr) => ({type: GO_TO_NEXT_PAGE, payload: queryStr});

/**
 * Устанавливает номер страницы
 * @param {number} page Номер страницы
 */
export const setPage = (page) => ({type: SET_PAGE, payload: page});

/**
 * Увеличивает номер страницы на 1
 */
export const incrementPage = () => ({type: INCREMENT_PAGE});

/**
 * Указывает, доступна ли следующая страница или нет
 * @param {boolean} isAvailable Доступность следующей страницы
 */
export const setNextPageAvailability = (isAvailable) => ({type: SET_NEXT_PAGE_AVAILABILITY, payload: isAvailable});