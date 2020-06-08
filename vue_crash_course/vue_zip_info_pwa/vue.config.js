module.exports = {
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: new RegExp("^https://api.zippopotam.us/us/"),
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    manifestOptions: {
      name: "zip-info-pwa",
      short_name: "Zip Info",
      start_url: "/",
      background_color: "#FFF",
      theme_color: "#3880ff",
    },
  },
};
