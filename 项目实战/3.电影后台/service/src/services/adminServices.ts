import Admin from './../models/Admin'

interface IAdminObj {
  loginId: string;
  loginIdPwd: string;
  name: string;
}

/**
 * 增加
 */
const addAdmin = function(adminObj:IAdminObj) {
  return Admin.create(adminObj);
};

export {
  addAdmin
}

