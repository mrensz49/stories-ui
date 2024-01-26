import axios from 'axios'

let time_out = 10000
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV == 'development'
            ? import.meta.env.VITE_APP_URL : import.meta.env.VITE_APP_URL_PROD,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: time_out,
    // signal: newAbortSignal(time_out),
})
auth(apiClient)

const apiClientLogin = axios.create({
    baseURL: 'http://localhost/stories-v2/public/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: time_out,
})
auth(apiClientLogin)

function auth(apiC) {

    apiC.interceptors.request.use(function (config) {
        const token = localStorage.getItem('storiesforyou_token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, null, { synchronous: true });
}

export default {

    fetchUserAccess() {
        return apiClient.get(`/user-access`)
    },

    isLoggedIn() {
        return apiClient.get(`/is-logged-in`)
    },

    getCSRFToken() {
        return apiClient.get(`/csrf-token`)
    },

    getRecommended() {
        return apiClient.get(`/recommended`)
    },

    getCategories() {
        return apiClient.get(`/categories`)
    },

    getCategory(name) {
        return apiClient.get(`/category/${name}`)
    },

    getNewPage(payloads) {
        return apiClient.get(`/category/${payloads.name}?page=${payloads.page}`)
    },

    getStory(payloads) {
        return apiClient.get(`/story/${payloads.name}/${payloads.title}`)
    },

    getLatest5() {
        return apiClient.get(`/latest5`)
    },

    moralLesson3() {
        return apiClient.get(`/moral_lesson3`)
    },

    getPopular5() {
        return apiClient.get(`/popular5`)
    },

    getMoralLesson(page) {
        return apiClient.get(`/moral_lessons?page=${page}`)
    },

    getCountReadStories() {
        return apiClient.get(`/count-read-stories`)
    },    

    getReadStories(page) {
        return apiClient.get(`/read-stories?page=${page}`)
    }, 

    getUnReadStories(page) {
        return apiClient.get(`/unread-stories?page=${page}`)
    }, 

    getCountUnReadStories() {
        return apiClient.get(`/count-unread-stories`)
    },

    getCountLatestStories() {
        return apiClient.get(`/count-latest-stories`)
    },    

    getLatestStories(page) {
        return apiClient.get(`/latest-stories?page=${page}`)
    }, 

    register(payloads) {
        return apiClient.post(`/auth/register`, payloads)
    },

    login(payloads) {
        return apiClient.post(`/auth/login`, payloads)
    },

    forgotPassword(payloads) {
        return apiClient.post(`/auth/forgot-password`, payloads)
    },

    resetPassword(payloads) {
        return apiClient.post(`/auth/reset-password`, payloads)
    },
}