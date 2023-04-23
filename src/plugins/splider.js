export default {
  install(App) {
    App.config.globalProperties.$splider = {
      options(width) {
        const options = {
          fixedWidth: width,
          gap: "1rem",
          arrows: false,
          pagination: true,
          drag: "free",
          paginationDirection: "ltr",
          flickPower: 300,
          snap: true,
        };
        return options;
      },
    };
  },
};
