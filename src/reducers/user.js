import {
	LOGIN_PENDING,
	LOGIN_FULFILLED,
	LOGIN_REJECTED,
	USER_LOGOUT
} from "../actions/userActions";

const initialState = {
	user: {
		full_name: "Guest User",
		auth_token: null,
		username: "guest",
		id: 0,
		roles: ["GUEST"],
		is_active: true
	},
	pending: false,
	logged_in: false,
	rejected : false,
	error: {
		_error_message : ""
	}
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case LOGIN_PENDING:
			return { ...state, pending: true };
		case LOGIN_REJECTED:
			return { ...state, pending: false, rejected : true, error: action.payload };
		case LOGIN_FULFILLED:
			return {
				...state,
				pending: false,
				logged_in: true,
				rejected : false,
				user: action.payload
			};
		case USER_LOGOUT :
			return initialState;
		default:
			return state;
	}
}

// {
//     "bio": bio,
//     "photo": "https://media.taiga.io/user/d/3/0/4/43305a1a16c069a68f69d3d04597b169e47caf7515689a887c34a061fc9a/gravatar.jpeg.80x80_q85_crop.jpg",
//     "color": "#bedb1e",
//     "lang": "en",
//     "total_private_projects": 0,
//     "full_name": "Jasper John Cinatad",
//     "id": 257433,
//     "is_active": true,
//     "roles": ["DEV"],
//     "total_public_projects": 0,
//     "gravatar_id": "63dbec97c6a8c80cfea91d81b7b1b2df",
//     "max_memberships_public_projects": null,
//     "big_photo": "https://media.taiga.io/user/d/3/0/4/43305a1a16c069a68f69d3d04597b169e47caf7515689a887c34a061fc9a/gravatar.jpeg.300x300_q85_crop.jpg",
//     "theme": "high-contrast",
//     "uuid": "0acdec5bdd4841cd9f9a7b87f2b99f27",
//     "full_name_display": "Jasper John Cinatad",
//     "max_public_projects": null,
//     "max_memberships_private_projects": 4,
//     "email": "jasperc@1day.io",
//     "auth_token": "eyJ1c2VyX2F1dGhlbnRpY2F0aW9uX2lkIjoyNTc0MzN9:1eJepc:XTCJ4gWBoAAOQZvF63VuDEYTg94",
//     "username": "fallen90",
//     "timezone": "",
//     "max_private_projects": 1
// }
