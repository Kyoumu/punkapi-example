import { LOCALSTORAGE_STORE_KEY } from './../constants'

const getStateDataToSave = (state) => {
    return {
        options: state.options
    };
};

export const stateSaver = store => next => action => {
    let result = next(action);

    const state = store.getState();
    localStorage.setItem(LOCALSTORAGE_STORE_KEY, JSON.stringify(getStateDataToSave(state)));

    return result;
};

export const getSavedState = () => {
    const rawData = localStorage.getItem(LOCALSTORAGE_STORE_KEY);
    return (rawData !== null) ? JSON.parse(rawData) : {};
};