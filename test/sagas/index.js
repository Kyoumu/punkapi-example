import { assert } from 'chai';
import { fork } from 'redux-saga/effects';
import root from './../../src/sagas';
import beer from './../../src/sagas/beer';
import pagination from './../../src/sagas/pagination';

describe('root saga', function () {
    it('should create root saga', function () {
        const generator = root();

        assert.deepEqual(generator.next().value, [
            fork(beer),
            fork(pagination)
        ]);
        assert.isOk(generator.next().done);
    });
});