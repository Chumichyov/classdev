import instance from "./instance";
import authModule from "./modules/auth";
import courseModule from "./modules/course";

export default {
  auth: authModule(instance),
  course: courseModule(instance),
};
