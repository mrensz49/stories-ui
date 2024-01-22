module.exports = {
  devServer: {
    proxy: import.meta.env.VITE_NODE_ENV == 'development' ? import.meta.env.VITE_APP_URL : import.meta.env.VITE_APP_URL_PROD,
  },
  "transpileDependencies": [
    "vuetify"
  ]
}

