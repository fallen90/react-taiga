import { combineReducers } from 'redux';
import milestones from './milestones';
import project from './project';
import tasks from './tasks';
import user from './user';

export default combineReducers({
	project, user, tasks, milestones
});