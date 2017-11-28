/* TODO : import action types from actions */

export default function tasks(state = {
	tasks : [],
	fetching : false,
	fetched : false,
	rejected : false,
	error : {
	  _error_message : null
	}
}, action){

	switch(action.type){
		case 'FETCH_TASKS':
			return {...state, fetching : true};
		case 'FETCH_TASKS_REJECTED':
			return {...state, fetching : false, rejected : true, error : action.payload }
		case 'FETCH_TASKS_FULFILLED':
			return {
				...state,
				fetching : false,
				fetched : true,
				rejected : false,
				tasks : action.payload
			};
		default:
			return state;
	}
};