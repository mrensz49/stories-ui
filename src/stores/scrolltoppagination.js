import { defineStore } from "pinia";

export const useScrollTopPagination = defineStore({
  id: "scrolltoppagination",

  actions: {
    scroll() {
      window.scrollTo({
        top: 150,
        behavior: "smooth",
      });
    },

    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
});
