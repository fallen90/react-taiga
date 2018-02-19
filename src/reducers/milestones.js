import {
	FETCH_MILESTONES,
	FETCH_MILESTONES_FULFILLED,
	FETCH_MILESTONES_REJECTED
} from '../actions/projectActions';

const initialState = {
	milestones : [],
    fetching: false,
    fetched: false,
    rejected: false,
    error: {
        _error_message: null
    }
};

export default function milestones(state = initialState, action){
	switch (action.type) {
        case FETCH_MILESTONES:
            return { ...state, fetching: true };
        case FETCH_MILESTONES_REJECTED:
            return { ...state, fetching: false, rejected: true, error: action.payload }
        case FETCH_MILESTONES_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                rejected: false,
                milestones: action.payload
            };
        default:
            return state;
    }
}