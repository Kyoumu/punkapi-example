import 'whatwg-fetch';
import { FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE } from './../constants/actions';
import { PAGES_MODE_REPLACE } from './../constants';
import { setPaginatorAvailability } from './paginator';
import Beer from './../domains/Beer';

export const requestFetchBeer = (mode = PAGES_MODE_REPLACE) => {
    return async (dispatch, getState) => {
        const state = getState();
        dispatch({type: FETCH_BEER_REQUEST});

        try {
            const response = await fetch('https://api.punkapi.com/v2/beers?page=' + state.paginator.page + '&per_page=' + state.filter.itemsPerPage);
            const beerData = await response.json();

            let beerList = {};
            beerData.forEach(beerItemData => {
                const beer = new Beer(beerItemData);
                beerList[beer.id] = beer;
            });

            dispatch(setPaginatorAvailability(beerData.length !== 0));

            dispatch(successFetchBeer(beerList, mode));
        } catch (e) {
            dispatch(failureFetchBeer(e.message));
        }
    }
};

export const successFetchBeer = (list, mode = PAGES_MODE_REPLACE) => ({type: FETCH_BEER_SUCCESS, payload: {list, mode}});

export const failureFetchBeer = (error) => ({type: FETCH_BEER_FAILURE, error});