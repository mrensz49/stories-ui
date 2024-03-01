import moment from 'moment';

export const utilsMixin = {
  methods: {
    showIcon(type) {
      const iconMap = {
        like: "mdi-thumb-up",
        love: "mdi-heart",
        happy: "mdi-emoticon-happy-outline",
        sad: "mdi-emoticon-sad-outline",
        angry: "mdi-emoticon-angry-outline",
      };
      return iconMap[type] || "mdi-thumb-up"; // Default to 'mdi-thumb-up' if type is not found
    },
    getImageUrl(name) {
      return new URL(`/images/bg/${name}`, import.meta.url).href;
    },

    getPublicImage(name = "no-image.jpg") {
      const baseURL = this.getBaseURL();
      return `${baseURL}storage/${name}`;
    },

    getPublicImageThumbnail(name = "../no-image.jpg") {
      const baseURL = this.getBaseURL();
      return `${baseURL}storage/${name}`;
    },

    getBaseURL() {
      return import.meta.env.VITE_NODE_ENV === "development"
        ? import.meta.env.VITE_APP_URL
        : import.meta.env.VITE_APP_URL_PROD + "public/";
    },

    getHumanDateDay(date) {
      return (
        moment(date, "YYYY-MM-DD H:m").format("MMM. DD, YYYY - h:mma") || ""
      );
    },
  },
};
