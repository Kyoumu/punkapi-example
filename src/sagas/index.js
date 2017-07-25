import { all, fork } from 'redux-saga/effects';
import beer from './beer';
import pagination from './pagination';

export default function* () {
    yield all([
        fork(beer),
        fork(pagination)
    ])
}