import moment from "moment";

moment.locale("ru");

export default {
  install(App) {
    App.config.globalProperties.$moment = {
      getDate(date) {
        return moment(date).format("LL");
      },
      getDateTime(date) {
        return moment(date).format("LLL");
      },
    };
  },
};
