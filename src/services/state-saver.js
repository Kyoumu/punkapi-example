import { LOCALSTORAGE_STORE_KEY } from './../constants'

/**
 * Возврашает ту часть state, которую нужно сохранить
 * @param {Object} state Данные store из Redux
 * @returns {Object} Данные для сохранения
 */
export const getStateDataToSave = (state) => {
    return {
        options: state.options
    };
};

/**
 * Middleware для Redux для сохранения данных
 * @param {Object} store Store из Redux
 */
export const stateSaver = store => next => action => {
    let result = next(action);

    const state = store.getState();
    localStorage.setItem(LOCALSTORAGE_STORE_KEY, JSON.stringify(getStateDataToSave(state)));

    return result;
};

/**
 * Возвращает сохранённую часть state из оффлайн-хранилища
 * @returns {Object} Сохранённая часть state
 */
export const getSavedState = () => {
    const rawData = localStorage.getItem(LOCALSTORAGE_STORE_KEY);
    return (rawData !== null) ? JSON.parse(rawData) : {};
};