import { assert } from 'chai';
import { takeEvery, select, fork, put } from 'redux-saga/effects';
import rootPagination, { goToNextPage } from './../../src/sagas/pagination';
import { goToNextPage as goToNextPageAction, incrementPage } from './../../src/actions/pagination';
import { requestFetchBeerList } from './../../src/actions/beer';
import { PAGES_MODE_APPEND } from './../../src/constants';

describe('goToNextPage saga', function () {
    it('should work when available', function () {
        const state = {
            beer: {isLoadingList: false, listError: false},
            pagination: {isNextPageAvailable: true}
        };
        const action = goToNextPageAction('');
        let generator = goToNextPage(action);

        assert.deepEqual(generator.next().value, select());
        assert.deepEqual(generator.next(state).value, put(incrementPage()));
        assert.deepEqual(generator.next(state).value, put(requestFetchBeerList(action.payload, PAGES_MODE_APPEND)));
        assert.isOk(generator.next().done);
    });

    it('should not work when list is loading', function () {
        const state = {
            beer: {isLoadingList: true, listError: false},
            pagination: {isNextPageAvailable: true}
        };
        const action = goToNextPageAction('');
        let generator = goToNextPage(action);

        assert.deepEqual(generator.next().value, select());
        assert.isOk(generator.next(state).done);
    });

    it('should not work when list error', function () {
        const state = {
            beer: {isLoadingList: false, listError: 'error'},
            pagination: {isNextPageAvailable: true}
        };
        const action = goToNextPageAction('');
        let generator = goToNextPage(action);

        assert.deepEqual(generator.next().value, select());
        assert.isOk(generator.next(state).done);
    });

    it('should not work when next page is not available', function () {
        const state = {
            beer: {isLoadingList: false, listError: false},
            pagination: {isNextPageAvailable: false}
        };
        const action = goToNextPageAction('');
        let generator = goToNextPage(action);

        assert.deepEqual(generator.next().value, select());
        assert.isOk(generator.next(state).done);
    });
});


describe('rootPagination saga', function () {
    it('should create root saga', function () {
        const generator = rootPagination();

        assert.deepEqual(generator.next().value, [
            fork(takeEvery, goToNextPageAction('').type, goToNextPage)
        ]);
        assert.isOk(generator.next().done);
    });
});