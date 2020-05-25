/*
* Submit HTTP requests for User resources at Blogu API
*/

import axios from 'axios'
import AuthService from './auth_service'

// API base url. Check '../.env'
const url = process.env.REACT_APP_API_URL + 'user/'

export default class UserService {
    static list() {
        return axios.get(url)
    }

    static get(id) {
        return axios.get(url + id)
    }

    static update(data) {
        return axios.put(url + AuthService.user().id, data, { headers : AuthService.header() })
    }

    static delete() {
        return axios.delete(url + AuthService.user().id, { headers : AuthService.header() })
    }    
}