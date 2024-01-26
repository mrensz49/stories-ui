import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";  
import { useScrollTopPagination } from '@/stores/scrolltoppagination.js'
import router from '@/router'

export const useAuthStore = defineStore({

    id: 'auth',

    state: () => ({
        scrollTopPagination: useScrollTopPagination(),
        is_logged_in: 0,
        user: [],
        reset_password_details: '',
        csrf_token: '',
        loading: false,
        count_read_stories: 0,
        count_unread_stories: 0,
        count_latest_stories: 0,
        list_stories: [],
        unread_stories: [],
        errors_login: [],
        errors_reg: [],
        errors_reset: [],
    }),

    actions: {
        
        async isLoggedIn() {
            await EventService.isLoggedIn()
            .then(response => {
                this.is_logged_in = response.data;
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
            })
        }, 

        async getCSRFToken() {
            await EventService.getCSRFToken()
            .then(response => {
                this.csrf_token = response.data;
            })
        },

        async handleRegister(payload) {

            this.loading = true
            this.errors_reg = []
            await this.getCSRFToken()
            payload['_token'] = this.csrf_token

            EventService.register(payload)
            .then(response => {
                this.user = response.data.user
                this.loading = false
                router.push({name: 'Dashboard'})
            })
            .catch(error => {
                this.user_loading = false
                this.loading = false

                if (error.response.data?.errors == undefined) {
                    this.errors_reg.push([error.response.data.message])
                } else {
                    this.errors_reg = error.response.data?.errors

                }
            })
        },

        async handleLogin(payload) {

            this.loading = true
            this.errors_login = []
            await this.getCSRFToken()
            payload['_token'] = this.csrf_token

            EventService.login(payload)
            .then(response => {
                this.loading = false
                localStorage.setItem('storiesforyou_token', response.data.token)
                router.push({name: 'Dashboard'})
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.loading = false
            })
        },

        async handleForgotPassword(payload) {

            this.loading = true
            this.errors_reset = []
            this.reset_password_details = ''
            await this.getCSRFToken()
            payload['_token'] = this.csrf_token

            EventService.forgotPassword(payload)
            .then(response => {
                this.reset_password_details = response.data.status
                this.loading = false
            })
            .catch(error => {
                this.errors_reset = error.response.data.errors
                this.loading = false
            })
        },

        async handleResetPassword(payload) {

            this.loading = true
            this.errors_reset = []
            this.reset_password_details = ''
            await this.getCSRFToken()
            payload['_token'] = this.csrf_token

            EventService.resetPassword(payload)
            .then(response => {
                this.reset_password_details = response.data.message
                this.loading = false
            })
            .catch(error => {
                this.errors_reset = error.response.data.errors
                this.loading = false
            })
        },

        getCountReadStories() {
            this.loading = true
            EventService.getCountReadStories()
            .then(response => {
                this.count_read_stories = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
    
                this.loading = false
            })
        },    
    
        getCountUnReadStories() {
            this.loading = true
            EventService.getCountUnReadStories()
            .then(response => {
                this.count_unread_stories = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
    
                this.loading = false
            })
        },

        getReadStories(page) {
            this.loading = true
            EventService.getReadStories(page)
            .then(response => {
                this.list_stories = response.data;
                this.loading = false
                this.scrollTopPagination.scroll()
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
    
                this.loading = false
            })
        },
        
        getUnReadStories(page) {
            this.loading = true
            EventService.getUnReadStories(page)
            .then(response => {
                this.list_stories = response.data;
                this.loading = false
                this.scrollTopPagination.scroll()
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
    
                this.loading = false
            })
        },

        getCountLatestStories() {
            this.loading = true
            EventService.getCountLatestStories()
            .then(response => {
                this.count_latest_stories = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
    
                this.loading = false
            })
        },

        getLatestStories(page) {
            this.loading = true
            EventService.getLatestStories(page)
            .then(response => {
                this.list_stories = response.data;
                this.loading = false
                this.scrollTopPagination.scroll()
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }
    
                this.loading = false
            })
        },

    }, 
})