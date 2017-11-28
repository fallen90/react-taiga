import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function(auth_token) {
	if(auth_token) axios.defaults.headers.common["Authorization"] = "Bearer " + auth_token;

    return axios.create({
        baseURL: API_BASE_URL
    });
}