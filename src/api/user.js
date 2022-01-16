import request from '@/axios'

const user = {
  register(data) {
    return request({
      url: '/vue-stick-admin/api/user/register',
      method: 'post',
      data
    })
  },
  login(data) {
    return request({
      url: '/vue-stick-admin/api/user/login',
      method: 'post',
      data
    })
  },
  getInfo() {
    return request({
      url: '/vue-stick-admin/api/user/info',
      method: 'get',
      params: {}
    })
  },
  logout() {
    return request({
      url: '/vue-stick-admin/api/user/logout',
      method: 'post'
    })
  }
}


export default user