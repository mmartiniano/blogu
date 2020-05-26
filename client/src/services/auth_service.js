/*
* Submit HTTP requests for Auth resources at Blogu API
*/

import axios from 'axios'

// API base url. Check '../.env'
const url = process.env.REACT_APP_API_URL + 'auth/'

export default class AuthService {
    static signup(credentials) {
        return axios.post(url + 'signup', credentials)
    }

    static login(credentials) {
        return axios
        .post(url + 'signin', credentials)
        .then(response => {
            if (response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data))

            return response.data
        })
    }

    static logout() {
        localStorage.removeItem('user')
    }

    // Current authenticated user
    static user() {
        return JSON.parse(localStorage.getItem('user'))
    }

    // HTTP request header with access token
    static header() {
        if (this.user && this.user.token)
            return { Authorization: 'Bearer ' + this.user.token}

        return {}
    }
}