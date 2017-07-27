import { assert } from 'chai';
import sinon from 'sinon';
import { removeEmptyParams, setQueryParams, extractQueryParams, defaultQueryParamsOnExtract, buildQueryString, filterQueryParam } from './../../src/services/query-params';
import { MIN_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE, MIN_ABV, MAX_ABV } from './../../src/constants';

describe('removeEmptyParams', function() {
    it('removes empty params', function() {
        assert.deepEqual(removeEmptyParams({a: 'a', b: '', c: true, d: undefined}), {a: 'a', c: true});
    });

    it('not removes other falsy params', function() {
        const obj = {a: false, b: null, c: 0, d: NaN};
        assert.deepEqual(removeEmptyParams(obj), obj);
    });
});


describe('setQueryParams', function() {
    let history = {
        location: {
            search: 'http://test.com/?a=a&b=b',
            pathname: '/'
        },
        push: function() {},
        replace: function() {}
    };

    it('setQueryParams push', function() {
        let historyMock = sinon.mock(history);

        historyMock.expects('push').once();

        setQueryParams({c: 'c', d: 'd'}, history, {mode: 'push'});

        historyMock.verify();
    });

    it('setQueryParams replace', function() {
        let historyMock = sinon.mock(history);

        historyMock.expects('replace').once();

        setQueryParams({c: 'c', d: 'd'}, history, {mode: 'replace'});

        historyMock.verify();
    });
});


describe('extractQueryParams', function() {
    it('works with removing empty', function() {
        assert.deepEqual(extractQueryParams('?a=1&b=&beer_name=q#hash', true, true), {...defaultQueryParamsOnExtract, a: '1', beer_name: 'q'});
    });

    it('works without removing empty', function() {
        assert.deepEqual(extractQueryParams('?a=1&b=&beer_name=q#hash', true, false), {...defaultQueryParamsOnExtract, a: '1', b: '', beer_name: 'q'});
    });
});


describe('buildQueryString', function() {
    it('works with removing empty', function() {
        assert.equal(buildQueryString({a: 'a', b: ''}, true), 'a=a');
    });

    it('works without removing empty', function() {
        assert.equal(buildQueryString({a: 'a', b: ''}, false), 'a=a&b=');
    });
});


describe('filterQueryParam', function() {
    it('filters per_page', function() {
        assert.equal(filterQueryParam('per_page', MIN_ITEMS_PER_PAGE), MIN_ITEMS_PER_PAGE);

        if (MAX_ITEMS_PER_PAGE - MIN_ITEMS_PER_PAGE >= 1) {
            assert.equal(filterQueryParam('per_page', MAX_ITEMS_PER_PAGE - MIN_ITEMS_PER_PAGE), MAX_ITEMS_PER_PAGE - MIN_ITEMS_PER_PAGE);
        }

        assert.equal(filterQueryParam('per_page', MAX_ITEMS_PER_PAGE), MAX_ITEMS_PER_PAGE);
    });

    it('filters abv_gt', function() {
        assert.equal(filterQueryParam('abv_gt', MIN_ABV - 1, {abv_lt: MAX_ABV}), MIN_ABV);
        assert.equal(filterQueryParam('abv_gt', MAX_ABV + 1, {abv_lt: MAX_ABV}), MAX_ABV);

        if (MAX_ABV - MIN_ABV >= 1) {
            assert.equal(filterQueryParam('abv_gt', MAX_ABV, {abv_lt: MAX_ABV - MIN_ABV}), MAX_ABV - MIN_ABV);
        }
    });

    it('filters abv_lt', function() {
        assert.equal(filterQueryParam('abv_lt', MIN_ABV - 1, {abv_gt: MIN_ABV}), MIN_ABV);
        assert.equal(filterQueryParam('abv_lt', MAX_ABV + 1, {abv_gt: MIN_ABV}), MAX_ABV);

        if (MAX_ABV - MIN_ABV >= 1) {
            assert.equal(filterQueryParam('abv_lt', MIN_ABV, {abv_gt: MAX_ABV - MIN_ABV}), MAX_ABV - MIN_ABV);
        }
    });

    it('filters beer_name', function() {
        const beerName = ' test ';
        assert.equal(filterQueryParam('beer_name', beerName), beerName);
    });
});