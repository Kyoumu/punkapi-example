import { combineReducers } from 'redux';
import beer from './beer';
import pagination from './pagination';

export default combineReducers({
    beer,
    pagination
});