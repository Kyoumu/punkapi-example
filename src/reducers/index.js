import { combineReducers } from 'redux';
import beer from './beer';
import pagination from './pagination';
import options from './options';

export default combineReducers({
    beer,
    pagination,
    options
});