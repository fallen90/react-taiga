import {
    FETCH_PROJECT,
    FETCH_PROJECT_FULFILLED,
    FETCH_PROJECT_REJECTED
} from '../actions/projectActions.js';

const initialState = {
    project: {
        id : 227853,
        name: "",
        slug : "",
        roles: [],
        milestones: [],
        task_statuses : [],
        members : [],
        points : [],
        description: "...",
    },
    selected_milestone : '162523',
    fetching: false,
    fetched: false,
    rejected: false,
    error: {
        _error_message: null
    }
};

export default function project(state = initialState, action) {

    switch (action.type) {
    	/* Asyncs */
        case FETCH_PROJECT:
            return { ...state, fetching: true };
        case FETCH_PROJECT_REJECTED:
            return { ...state, fetching: false, rejected: true, error: action.payload }
        case FETCH_PROJECT_FULFILLED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                rejected: false,
                project: action.payload
            };
        case 'SELECT_MILESTONE' :
            return {
                ...state,
                selected_milestone : action.payload
            }
        default:
            return state;
    }
};