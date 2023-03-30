import instance from "./instance";
import authModule from "./modules/auth";
import courseModule from "./modules/course";
import notificationModule from "./modules/notification";

export default {
  auth: authModule(instance),
  course: courseModule(instance),
  notification: notificationModule(instance),
};
