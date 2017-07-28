import { assert } from 'chai';
import { select, put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import sinon from 'sinon';
import { requestInitializeBeerList, requestFetchBeerList as requestFetchBeerListAction, successFetchBeerList, failureFetchBeerList, successInitializeBeerList, requestFetchBeerListWithDelay as requestFetchBeerListWithDelayAction, requestFetchBeerItem as requestFetchBeerItemAction, successFetchBeerItem, failureFetchBeerItem } from './../../src/actions/beer';
import rootBeer, { initializeBeerList, requestFetchBeerList, requestFetchBeerListWithDelay, requestFetchBeerItem } from './../../src/sagas/beer';
import { setPage, setNextPageAvailability } from './../../src/actions/pagination';
import { extractQueryParams } from './../../src/services/query-params';
import { getOneByID, getAll } from './../../src/services/punk-api';
import { FILTER_DELAY } from './../../src/constants';
import Beer from './../../src/domains/Beer';

describe('initializeBeerList saga', function () {
    before(function () {
        window.scrollTo = () => {};
    });

    after(function () {
        delete window.scrollTo;
    });

    it('should load list when list is not initialized', function () {
        const state = {
            beer: {isListInitialized: false, isLoadingList: false},
            pagination: {page: 1}
        };
        const pageQueryParams = extractQueryParams('');
        const error = new Error('error message');
        const action = requestInitializeBeerList('');
        const generator = initializeBeerList(action);

        assert.deepEqual(generator.next(state).value, select());
        assert.deepEqual(generator.next(state).value, select());
        assert.deepEqual(generator.next(state).value, put(setPage(1)));
        assert.deepEqual(generator.next().value, call(getAll, {
            page: state.pagination.page,
            per_page: pageQueryParams.per_page,
            abv_gt: pageQueryParams.abv_gt,
            abv_lt: pageQueryParams.abv_lt,
            beer_name: (pageQueryParams.beer_name || '').trim().replace(/ /g, '_')
        }));
        assert.deepEqual(generator.throw(error).value, put(failureFetchBeerList(error.message)));
        assert.deepEqual(generator.next().value, put(successInitializeBeerList()));
        assert.isOk(generator.next().done);
    });

    it('should not work when list is initialized', function () {
        const state = {
            beer: {isListInitialized: true}
        };
        const action = requestInitializeBeerList('');
        const generator = initializeBeerList(action);

        assert.deepEqual(generator.next().value, select());
        assert.isOk(generator.next(state).done);
    });

    it('should not work when list is loading', function () {
        const state = {
            beer: {isLoadingList: true}
        };
        const action = requestInitializeBeerList('');
        const generator = initializeBeerList(action);

        assert.deepEqual(generator.next().value, select());
        assert.isOk(generator.next(state).done);
    });
});


describe('requestFetchBeerWithDelay saga', function () {
    it('should dispatch request', function () {
        const action = requestFetchBeerListWithDelayAction('');
        const generator = requestFetchBeerListWithDelay(action);

        assert.deepEqual(generator.next().value, call(delay, FILTER_DELAY));
        assert.deepEqual(generator.next().value, put(requestFetchBeerListAction(action.payload.queryStr, action.payload.mode)));
        assert.isOk(generator.next().done);
    });
});


describe('requestFetchBeer saga', function () {
    let state = {
        pagination: {page: 1}
    };

    beforeEach(function () {
        window.scrollTo = () => {};
        sinon.spy(window, 'scrollTo');
    });

    afterEach(function () {
        window.scrollTo.restore();
        delete window.scrollTo;
    });

    it('should scroll on replace', function () {
        const action = requestFetchBeerListAction('');
        const generator = requestFetchBeerList(action);

        assert.deepEqual(generator.next().value, select());
        assert.deepEqual(generator.next(state).value, put(setPage(1)));
        assert.isOk(window.scrollTo.called);
    });

    it('dispatches list of beer on success', function () {
        const pageQueryParams = extractQueryParams('');
        const action = requestFetchBeerListAction('');
        const generator = requestFetchBeerList(action);

        const beerList = {};
        for (let i = 0; i < pageQueryParams.per_page; i++) {
            beerList[i] = new Beer({id: i});
        }

        assert.deepEqual(generator.next().value, select());
        assert.deepEqual(generator.next(state).value, put(setPage(1)));
        assert.deepEqual(generator.next().value, call(getAll, {
            page: state.pagination.page,
            per_page: pageQueryParams.per_page,
            abv_gt: pageQueryParams.abv_gt,
            abv_lt: pageQueryParams.abv_lt,
            beer_name: (pageQueryParams.beer_name || '').trim().replace(/ /g, '_')
        }));
        assert.deepEqual(generator.next(beerList).value, put(setNextPageAvailability(true)));
        assert.deepEqual(generator.next().value, put(successFetchBeerList(beerList, action.payload.mode)));
        assert.isOk(generator.next().done);
    });

    it('dispatches error on error', function () {
        const pageQueryParams = extractQueryParams('');
        const action = requestFetchBeerListAction('');
        const generator = requestFetchBeerList(action);
        const error = new Error('error message');

        assert.deepEqual(generator.next().value, select());
        assert.deepEqual(generator.next(state).value, put(setPage(1)));
        assert.deepEqual(generator.next().value, call(getAll, {
            page: state.pagination.page,
            per_page: pageQueryParams.per_page,
            abv_gt: pageQueryParams.abv_gt,
            abv_lt: pageQueryParams.abv_lt,
            beer_name: (pageQueryParams.beer_name || '').trim().replace(/ /g, '_')
        }));
        assert.deepEqual(generator.throw(error).value, put(failureFetchBeerList(error.message)));
        assert.isOk(generator.next().done);
    });
});


describe('requestFetchBeerItem saga', function () {
    it('dispatches beer item on success', function () {
        const action = requestFetchBeerItemAction(1);
        const generator = requestFetchBeerItem(action);
        const beer = new Beer();

        assert.deepEqual(generator.next().value, call(getOneByID, action.payload));
        assert.deepEqual(generator.next(beer).value, put(successFetchBeerItem(beer)));
        assert.isOk(generator.next().done);
    });

    it('dispatches error on error', function () {
        const action = requestFetchBeerItemAction(1);
        const generator = requestFetchBeerItem(action);
        const error = new Error('error message');

        assert.deepEqual(generator.next().value, call(getOneByID, action.payload));
        assert.deepEqual(generator.throw(error).value, put(failureFetchBeerItem(action.payload, error.message)));
        assert.isOk(generator.next().done);
    });
});


describe('rootBeer saga', function () {
    it('should create root saga', function () {
        const generator = rootBeer();

        assert.deepEqual(generator.next().value, [
            fork(takeEvery, requestInitializeBeerList('').type, initializeBeerList),
            fork(takeLatest, requestFetchBeerListWithDelayAction('').type, requestFetchBeerListWithDelay),
            fork(takeEvery, requestFetchBeerListAction('').type, requestFetchBeerList),
            fork(takeEvery, requestFetchBeerItemAction(1).type, requestFetchBeerItem)
        ]);
        assert.isOk(generator.next().done);
    });
});