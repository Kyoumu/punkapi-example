import { takeEvery, takeLatest, all, fork, select, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { requestFetchBeer as requestFetchBeerAction, failureFetchBeer, successFetchBeer, failureFetchBeerItem, successFetchBeerItem } from './../actions/beer';
import { setPage, setNextPageAvailability } from './../actions/pagination';
import { BEER_LIST_INITIALIZE_REQUEST, BEER_LIST_INITIALIZE_SUCCESS, FETCH_BEER_REQUEST, FETCH_BEER_ITEM_REQUEST, FETCH_BEER_WITH_DELAY_REQUEST } from './../constants/actions';
import { PAGES_MODE_REPLACE, FILTER_DELAY } from './../constants';
import { extractQueryParams } from './../services/query-params';
import { getAll, getOneByID } from './../services/punk-api';

const initializeBeerList = function* () {
    yield takeEvery(BEER_LIST_INITIALIZE_REQUEST, function* (action) {
        const state = yield select();

        if (!state.beer.isListInitialized) {
            yield* requestFetchBeerSaga({payload: {queryStr: action.payload}});
            yield put({type: BEER_LIST_INITIALIZE_SUCCESS});
        }
    });
};

const requestFetchBeerWithDelay = function* () {
    yield takeLatest(FETCH_BEER_WITH_DELAY_REQUEST, function* (action) {
        const { queryStr, mode } = action.payload;

        yield call(delay, FILTER_DELAY);
        yield put(requestFetchBeerAction(queryStr, mode));
    });
};

const requestFetchBeerSaga = function* (action) {
    const { queryStr, mode } = action.payload;
    const state = yield select();

    if (mode === PAGES_MODE_REPLACE) {
        window.scrollTo(0, 0);
        yield put(setPage(1));
    }

    try {
        const pageQueryParams = extractQueryParams(queryStr || '');
        const beerList = yield call(getAll, {
            page: state.pagination.page,
            per_page: pageQueryParams.per_page,
            abv_gt: pageQueryParams.abv_gt,
            abv_lt: pageQueryParams.abv_lt,
            beer_name: pageQueryParams.beer_name.trim().replace(/ /g, '_')
        });

        yield put(setNextPageAvailability(Object.values(beerList).length === pageQueryParams.per_page));
        yield put(successFetchBeer(beerList, mode));
    } catch (e) {
        yield put(failureFetchBeer(e.message));
    }
};

const requestFetchBeer = function* () {
    yield takeEvery(FETCH_BEER_REQUEST, requestFetchBeerSaga);
};

const requestFetchBeerItem = function* () {
    yield takeEvery(FETCH_BEER_ITEM_REQUEST, function* (action) {
        try {
            const beer = yield call(getOneByID, action.payload);
            yield put(successFetchBeerItem(beer));
        } catch (e) {
            yield put(failureFetchBeerItem(action.payload, e.message));
        }
    });
};

export default function* () {
    yield all([
        fork(initializeBeerList),
        fork(requestFetchBeerWithDelay),
        fork(requestFetchBeer),
        fork(requestFetchBeerItem)
    ]);
};