import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineSectionReducers from 'combine-section-reducers';

import user from './user/user.reducer';


const reducer = combineSectionReducers({ user });

export default createStore(reducer, applyMiddleware(thunkMiddleware));
