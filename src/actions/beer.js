import 'whatwg-fetch';
import { FETCH_BEER_REQUEST, FETCH_BEER_SUCCESS, FETCH_BEER_FAILURE } from './../constants/actions';
import Beer from './../domains/Beer';

export const requestFetchBeer = () => {
    return async (dispatch) => {
        dispatch({type: FETCH_BEER_REQUEST});

        try {
            const response = await fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10');
            const beerData = await response.json();
            const beerList = beerData.map(beerItemData => new Beer(beerItemData));

            dispatch(successFetchBeer(beerList));
        } catch (e) {
            dispatch(failureFetchBeer(e.message));
        }
    }
};

export const successFetchBeer = (beerList) => ({type: FETCH_BEER_SUCCESS, payload: beerList});

export const failureFetchBeer = (error) => ({type: FETCH_BEER_FAILURE, error});