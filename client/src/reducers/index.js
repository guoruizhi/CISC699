import { combineReducers } from 'redux';
import employees from "./employees";
import search from './search';

const reducers = combineReducers({
    employees,
    search,
});

export default reducers;