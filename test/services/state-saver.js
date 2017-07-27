import { assert } from 'chai';
import { getStateDataToSave } from './../../src/services/state-saver';

describe('getStateDataToSave', function() {
    it('returns object', function() {
        assert.isObject(getStateDataToSave({}));
    });
});