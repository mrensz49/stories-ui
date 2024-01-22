import { defineStore } from 'pinia'

export const useScrollTopPagination = defineStore({

    id: 'scrolltoppagination',


    actions: {
        scroll() {
            window.scrollTo({
                top: 150,
                behavior: "smooth"
            });         
        },
    }
})
