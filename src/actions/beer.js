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
            const page = encodeURIComponent(state.paginator.page);
            const perPage = encodeURIComponent(state.filter.itemsPerPage);
            const abvGt = encodeURIComponent(state.filter.minABV);
            const abvLt = encodeURIComponent(state.filter.maxABV);
            let url = 'https://api.punkapi.com/v2/beers?page=' + page + '&per_page=' + perPage + '&abv_gt=' + abvGt + '&abv_lt=' + abvLt;
            if (state.filter.beerName) {
                url += '&beer_name=' + state.filter.beerName.replace(/ /g, '_');
            }

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

            dispatch(setPaginatorAvailability(beerData.length !== 0));

            dispatch(successFetchBeer(beerList, mode));
        } catch (e) {
            dispatch(failureFetchBeer(e.message));
        }
    };
};

export const successFetchBeer = (list, mode = PAGES_MODE_REPLACE) => ({type: FETCH_BEER_SUCCESS, payload: {list, mode}});

export const failureFetchBeer = (error) => ({type: FETCH_BEER_FAILURE, error});