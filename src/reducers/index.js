import { combineReducers } from 'redux';
import project from './project';
import tasks from './tasks';
import user from './user';

export default combineReducers({
	project, user, tasks
});