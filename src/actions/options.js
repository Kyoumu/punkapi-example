import { TOGGLE_INFINITE_SCROLL } from './../constants/actions';

/**
 * Переключает состояние вкл/выкл для опции бесконечного списка
 */
export const toggleInfiniteScroll = () => ({type: TOGGLE_INFINITE_SCROLL});