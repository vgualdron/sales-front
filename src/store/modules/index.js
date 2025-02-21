import common, { name as commonName } from './common';
import role, { name as roleName } from './role';
import permission, { name as permissionName } from './permission';
import user, { name as userName } from './user';
import home, { name as homeName } from './home';
import category, { name as categoryName } from './category';
import file, { name as fileName } from './file';
import configuration, { name as configurationName } from './configuration';
import notification, { name as notificationName } from './notification';
import report, { name as reportName } from './report';
import product, { name as productName } from './product';
import image, { name as imageName } from './image';

export default {
  [homeName]: home,
  [commonName]: common,
  [roleName]: role,
  [permissionName]: permission,
  [userName]: user,
  [categoryName]: category,
  [fileName]: file,
  [configurationName]: configuration,
  [notificationName]: notification,
  [reportName]: report,
  [productName]: product,
  [imageName]: image,
};
