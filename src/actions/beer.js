import 'whatwg-fetch';
import { extractQueryParams, buildQueryString } from './../services/query-params';
import { FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE, SET_FETCH_BEER_TIMER, CLEAR_FETCH_BEER_TIMER } from './../constants/actions';
import { PAGES_MODE_REPLACE, FILTER_DELAY } from './../constants';
import { setPaginationAvailability } from './pagination';
import Beer from './../domains/Beer';

export const requestFetchBeer = (history, mode = PAGES_MODE_REPLACE) => {
    return async (dispatch, getState) => {
        const state = getState();
        dispatch({type: FETCH_BEER_REQUEST});

        try {
            const pageQueryParams = extractQueryParams(history.location.search);
            const queryParams = {
                page: state.pagination.page,
                per_page: pageQueryParams.per_page,
                abv_gt: pageQueryParams.abv_gt,
                abv_lt: pageQueryParams.abv_lt,
                beer_name: pageQueryParams.beer_name.trim().replace(/ /g, '_')
            };
            const url = 'https://api.punkapi.com/v2/beers?' + buildQueryString(queryParams);

            const response = await fetch(url);
            const beerData = await response.json();

            if (beerData.error) {
                throw new Error(beerData.message);
            }

            let beerList = {};
            beerData.forEach(beerItemData => {
                const beer = new Beer(beerItemData);
                beerList[beer.id] = beer;
            });

            dispatch(setPaginationAvailability(beerData.length !== 0));
            dispatch(successFetchBeer(beerList, mode));
        } catch (e) {
            dispatch(failureFetchBeer(e.message));
        }
    };
};

export const successFetchBeer = (list, mode = PAGES_MODE_REPLACE) => ({type: FETCH_BEER_SUCCESS, payload: {list, mode}});

export const failureFetchBeer = (error) => ({type: FETCH_BEER_FAILURE, error});

export const requestFetchBeerWithDelay = (history, mode = PAGES_MODE_REPLACE) => {
    return (dispatch) => {
        const timerID = setTimeout(() => {
            dispatch(clearFetchTimer());
            dispatch(requestFetchBeer(history, mode));
        }, FILTER_DELAY);

        dispatch({type: SET_FETCH_BEER_TIMER, payload: timerID});
    };
};

export const clearFetchTimer = () => ({type: CLEAR_FETCH_BEER_TIMER});