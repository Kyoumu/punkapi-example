import { fork, takeEvery, select, put } from 'redux-saga/effects';
import { GO_TO_NEXT_PAGE } from './../constants/actions';
import { PAGES_MODE_APPEND } from './../constants';
import { requestFetchBeerList } from './../actions/beer';
import { incrementPage } from './../actions/pagination';

export const goToNextPage = function* (action) {
    const state = yield select();

    if (!state.beer.isLoadingList && state.pagination.isNextPageAvailable && !state.beer.listError) {
        yield put(incrementPage());
        yield put(requestFetchBeerList(action.payload, PAGES_MODE_APPEND));
    }
};

export default function* () {
    yield [
        fork(takeEvery, GO_TO_NEXT_PAGE, goToNextPage)
    ];
};