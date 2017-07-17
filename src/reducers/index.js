import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import beer from './beer';
import filter from './filter';
import paginator from './paginator';

export default combineReducers({
    router: routerReducer,
    beer,
    filter,
    paginator
});
