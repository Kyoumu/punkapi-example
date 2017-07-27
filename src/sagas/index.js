import { all, fork } from 'redux-saga/effects';
import beer from './beer';
import pagination from './pagination';

export default function* () {
    yield [
        fork(beer),
        fork(pagination)
    ];
}