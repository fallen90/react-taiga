import client from "../lib/http-client";

export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_FULFILLED = "LOGIN_FULFILLED";
export const LOGIN_REJECTED = "LOGIN_REJECTED";


export const USER_LOGOUT = "USER_LOGOUT";

export function login(username, password) {
	return (dispatch, getState) => {
		const { logged_in } = getState().user;
		dispatch({ type: LOGIN_PENDING });

		if (!logged_in) {
			client()
				.post("/auth", {
					password: password,
					type: "normal",
					username: username
				})
				.then(response => {
					dispatch({ type: LOGIN_FULFILLED, payload: response.data });
				})
				.catch(err => {
					dispatch({
						type: LOGIN_REJECTED,
						payload: err.response.data
					});
				});
		} else {
			dispatch({ type: 'LOGIN_CACHED' }); //wont do anything
		}
	};
}

export function logout(){
	return (dispatch) => {
		dispatch({ type : USER_LOGOUT });
	}
}
