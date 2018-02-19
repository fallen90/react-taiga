import client from '../lib/http-client';

/* Action Types */

export const FETCH_TASKS = "FETCH_TASKS";
export const FETCH_TASKS_REJECTED = "FETCH_TASKS_REJECTED";
export const FETCH_TASKS_FULFILLED = "FETCH_TASKS_FULFILLED";

export const FETCH_PROJECT = "FETCH_PROJECT";
export const FETCH_PROJECT_REJECTED = "FETCH_PROJECT_REJECTED";
export const FETCH_PROJECT_FULFILLED = "FETCH_PROJECT_FULFILLED";

export const FETCH_MILESTONES = "FETCH_MILESTONES";
export const FETCH_MILESTONES_REJECTED = "FETCH_MILESTONES_REJECTED";
export const FETCH_MILESTONES_FULFILLED = "FETCH_MILESTONES_FULFILLED";

/* Action Creators */

export function fetchTasks(project_id, milestone_id) {
	return (dispatch, getState) => {
		dispatch({ type: FETCH_TASKS });

		const { logged_in, user } = getState().user;
		const { auth_token } = user;
		
		if (logged_in && auth_token != null) {
			client(auth_token)
				.get(`/tasks?project=${project_id}&milestone=${milestone_id}&assigned_to=257433&status__is_closed=false`)
				.then(response => {
					dispatch({
						type: FETCH_TASKS_FULFILLED,
						payload: response.data
					});
				})
				.catch(err => {
					dispatch({ type: FETCH_TASKS_REJECTED, payload: err.response.data });
				});
		} else {
			//USER not logged in
			dispatch({ type : 'USER_LOGOUT' });
		}
	};
}


export function fetchProject(slug){
	return (dispatch, getState) => {
		dispatch({ type: FETCH_PROJECT });

		const { logged_in, user } = getState().user;
		const { auth_token } = user;
		
		if (logged_in && auth_token != null) {
			client(auth_token)
				.get('/projects/by_slug?slug=' + slug)
				.then(response => {
					dispatch({
						type: FETCH_PROJECT_FULFILLED,
						payload: response.data
					});
				})
				.catch(err => {
					dispatch({ type: FETCH_PROJECT_REJECTED, payload: err.response.data });
				});
		} else {
			//USER not logged in
			dispatch({ type : 'USER_LOGOUT' });
		}
	};
}

export function fetchMilestones(){
	return (dispatch, getState) => {
		dispatch({ type: FETCH_MILESTONES });

		const { project } = getState();
		
		if (project.fetched) {
			dispatch({
				type: FETCH_MILESTONES_FULFILLED,
				payload: project.project.milestones
			});
		} else {
			//USER not logged in
			dispatch({ type : 'USER_LOGOUT' });
		}
	};
}

export function selectMilestone(id){
	return (dispatch) => {
		dispatch({ type : 'SELECT_MILESTONE', payload : id });
	}
}