import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js";

export const useAuthStore = defineStore({

    id: 'auth',

    state: () => ({
        user: [],
        reset_password_details: '',
        csrf_token: '',
        loading: false,
        errors_login: [],
        errors_reg: [],
        errors_reset: [],
    }),

    actions: {

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
            })
            .catch(error => {
                this.errors_reg = error.response.data.errors
                this.user_loading = false
                this.loading = false
            })
        },

        async handleLogin(payload) {

            this.loading = true
            this.errors_login = []
            await this.getCSRFToken()
            payload['_token'] = this.csrf_token

            EventService.login(payload)
            .then(response => {
                this.user = response.data.user
                this.loading = false
            })
            .catch(error => {
                this.errors_login = error.response.data.errors
                this.loading = false
            })
        },

        async handleForgotPassword(payload) {

            this.loading = true
            this.errors_reset = []
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
        }

    },

})