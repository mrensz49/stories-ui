import axios from 'axios'

let time_out = 10000
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV == 'development'
            ? import.meta.env.VITE_APP_URL : import.meta.env.VITE_APP_URL_PROD,
    //   baseURL: `http://stories-v2.test/`,
    //   withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: time_out,
    // signal: newAbortSignal(time_out),
})
auth(apiClient)

function auth(apiC) {

    apiC.interceptors.request.use(function (config) {
        const token = localStorage.getItem('stories_token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, null, { synchronous: true });
}

export default {

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

}