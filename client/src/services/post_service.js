/*
* Submit HTTP requests for Post resources at Blogu API
*/

import axios from 'axios'
import AuthService from './auth_service'

// API base url. Check '../.env'
const url = process.env.REACT_APP_API_URL + 'post/'

export default class PostService {
    static list() {
        return axios.get(url)
    }

    static get(id) {
        return axios.get(url + id)
    }

    static create(post) {
        return axios.post(url, post, { headers : AuthService.header() })
    }

    static update(post) {
        return axios.put(url + post._id, post, { headers : AuthService.header() })
    }

    static delete(id) {
        return axios.delete(url + id, { headers : AuthService.header() })
    }    
}