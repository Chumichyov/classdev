import instance from "./instance";
import authModule from "./modules/auth";
import courseModule from "./modules/course";
import notificationModule from "./modules/notification";
import userModule from "./modules/user";
import taskModule from "./modules/task";

export default {
  auth: authModule(instance),
  course: courseModule(instance),
  notification: notificationModule(instance),
  user: userModule(instance),
  task: taskModule(instance),
};
