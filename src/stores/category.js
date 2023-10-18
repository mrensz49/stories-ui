import { defineStore } from 'pinia'
import EventService from "@/services/EventService.js"

export const useCategoryStore = defineStore({

    id: 'category',

    state: () => ({
        data: [],
        story: [],
        categories: [],
        category: [],
        latest5: [],
        moral_lesson3: [],
        moral_lessons: [],
        popular5: [],
        errors: [],
        loading_rec: false,
        loading_page: false,
        loading: false,
        searchDialog:false,
    }),

    actions: {

        getRecommended() {
            this.loading_rec = true
            EventService.getRecommended()
            .then(response => {
                this.data = response.data;
                this.loading_rec = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        getCategories() {
            this.loading = true
            EventService.getCategories()
            .then(response => {
                this.categories = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        getCategory(name) {
            this.loading = true
            EventService.getCategory(name)
            .then(response => {
                this.category = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        getNewPage(payloads) {

            this.loading_page = true
            EventService.getNewPage(payloads)
            .then(response => {
                this.category = response.data;
                this.loading_page = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading_page = false
            })
        },

        getStory(payloads) {

            this.loading = true
            EventService.getStory(payloads)
            .then(response => {
                this.story = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        getLatest5() {
            this.loading = true
            EventService.getLatest5()
            .then(response => {
                this.latest5 = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        moralLesson3() {
            this.loading = true
            EventService.moralLesson3()
            .then(response => {
                this.moral_lesson3 = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        getPopular5() {
            this.loading = true
            EventService.getPopular5()
            .then(response => {
                this.popular5 = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

        getMoralLesson(page) {
            this.loading = true
            EventService.getMoralLesson(page)
            .then(response => {
                this.moral_lessons = response.data;
                this.loading = false
            })
            .catch(error => {
                if (typeof error.response !== 'undefined') {
                    this.errors = error.response.data.errors
                }

                this.loading = false
            })
        },

    }

})