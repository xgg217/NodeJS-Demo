import request from "../utils/request";

export const apiLogin = (obj:any) => {
  return request({
    method: 'POST',
    url: '/api/admin/login',
    data: obj
  })
}
