import { all, fork, takeEvery, select, put } from 'redux-saga/effects';
import { GO_TO_NEXT_PAGE } from './../constants/actions';
import { PAGES_MODE_APPEND } from './../constants';
import { requestFetchBeer } from './../actions/beer';
import { incrementPage } from './../actions/pagination';

const goToNextPage = function* () {
    yield takeEvery(GO_TO_NEXT_PAGE, function* (action) {
        const state = yield select();

        if (!state.beer.isLoadingList && state.pagination.isNextPageAvailable && !state.beer.listError) {
            yield put(incrementPage());
            yield put(requestFetchBeer(action.payload, PAGES_MODE_APPEND));
        }
    });
};

export default function* () {
    yield all([
        fork(goToNextPage)
    ]);
};