import * as axios from 'axios';
import config from "./config";

const baseUrl = config.baseUrl

export default class Request {
    static post(url, data) {
        try {
            return axios({
                method: 'POST',
                baseURL: baseUrl + url,
                data: data,
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                json: true
            })
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    }
    static get(url) {
        try {
            return axios({
                method: 'GET',
                baseURL: baseUrl + url,
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                json: true
            })
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    }
    static put(url, data) {
        try {
            return axios({
                method: 'PUT',
                baseURL: baseUrl + url,
                data: data,
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                json: true
            })
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    }
    static delete(url) {
        try {
            return axios({
                method: 'DELETE',
                baseURL: baseUrl + url,
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                json: true
            })
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    }
    static getNoToken(url) {
        try {
            return axios({
                method: 'GET',
                baseURL: baseUrl + url,
                json: true
            })
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    }
    static postNoToken(url, data) {
        try {
            return axios({
                method: 'POST',
                baseURL: baseUrl + url,
                data: data,
                json: true
            })
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    }
    static putNoToken(url, data) {
        try {
            return axios({
                method: 'PUT',
                baseURL: baseUrl + url,
                data: data,
                json: true
            })
        } catch (e) {
            alert(e.response ? e.response.msg : e.message)
        }
    }
}
