import { defineStore } from "pinia";
import EventService from "@/services/EventService.js";
import toast from "@/services/toast.js";
import { useScrollTopPagination } from "@/stores/scrolltoppagination.js";

export const useCategoryStore = defineStore({
  id: "category",

  state: () => ({
    scrollTopPagination: useScrollTopPagination(),

    data: [],
    story: [],
    categories: [],
    category: [],
    latest5: [],
    moral_lesson3: [],
    moral_lessons: [],
    popular5: [],
    credits: [],
    reaction_summary: [],
    users_reaction: [],
    loading_rec: false,
    loading_page: false,
    loading: false,
    searchDialog: false,
    loading_reaction: [],
    current_page: 1,
  }),

  actions: {
    getRecommended() {
      this.loading_rec = true;
      EventService.getRecommended()
        .then((response) => {
          this.data = response.data;
          this.loading_rec = false;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    getCategories() {
      this.loading = true;
      EventService.getCategories()
        .then((response) => {
          this.categories = response.data;
          this.loading = false;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    getCategory(name) {
      this.loading = true;
      EventService.getCategory(name)
        .then((response) => {
          this.category = response.data;
          this.loading = false;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    getNewPage(payloads) {
      this.loading_page = true;
      EventService.getNewPage(payloads)
        .then((response) => {
          this.category = response.data;
          this.loading_page = false;
          this.scrollTopPagination.scroll();
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading_page = false;
        });
    },

    getStory(payloads) {
      this.loading = true;
      EventService.getStory(payloads)
        .then((response) => {
          this.story = response.data;
          this.loading = false;
          this.scrollTopPagination.scrollTop();
          this.getReactionSummary(response.data.story.id);
          this.getUsersReaction(response.data.story.id);
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    getReactionSummary(payload) {
      EventService.getReactionSummary(payload)
        .then((response) => {
          this.reaction_summary = response.data;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }
        });
    },

    getUsersReaction(payload) {
      EventService.getUsersReaction(payload)
        .then((response) => {
          this.users_reaction = response.data;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }
        });
    },

    getLatest5() {
      this.loading = true;
      EventService.getLatest5()
        .then((response) => {
          this.latest5 = response.data;
          this.loading = false;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    moralLesson3() {
      this.loading = true;
      EventService.moralLesson3()
        .then((response) => {
          this.moral_lesson3 = response.data;
          this.loading = false;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    getPopular5() {
      this.loading = true;
      EventService.getPopular5()
        .then((response) => {
          this.popular5 = response.data;
          this.loading = false;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    getMoralLesson(page) {
      this.loading = true;
      EventService.getMoralLesson(page)
        .then((response) => {
          this.moral_lessons = response.data;
          this.loading = false;
          this.scrollTopPagination.scroll();
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }

          this.loading = false;
        });
    },

    getCredits(pages) {
      this.loading = true;
      EventService.getCredits(pages)
        .then((response) => {
          this.credits.push(response.data.data);
          this.current_page = parseInt(response.data.current_page) + 1;
          this.loading = false;
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
          }
          this.loading = false;
        });
    },

    postReaction(payload) {
      this.loading_reaction.push({ reaction: payload.type });
      EventService.postReaction(payload)
        .then((response) => {
          this.loading_reaction = [];
          this.getReactionSummary(payload.id);
          this.getUsersReaction(payload.id);
        })
        .catch((error) => {
          if (typeof error.response !== "undefined") {
            this.errors = error.response.data.errors;
            if (error.response.data.message == "Unauthenticated.") {
              toast.error("Please log in to proceed.");
            }
          }
          this.loading_reaction = [];
        });
    },
  },
});
