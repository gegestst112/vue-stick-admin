const user = [
  {
    url: '/vue-stick-admin/api/user/register',
    type: 'post',
    data: {
      'code':200,
      'data':{
        'username': '@word',
        'nickname': '@cname',
        'role': 'admin',
        'date': '@date'
      }
    }
  },
  {
    url: '/vue-stick-admin/api/user/login',
    type: 'post',
    data: {
      'code':200,
      'data':'登录成功'
    }
  },
  {
    url: '/vue-stick-admin/api/user/info',
    type: 'get',
    data: {
      'code':200,
      'data':{
        'username': '@word',
        'nickname': '@cname',
        'role': 'admin',
        'date': '@date'
      }
    }
  },
  {
    url: '/vue-stick-admin/api/user/logout',
    type: 'post',
    data: {
      'code':200,
      'data':'退出成功'
    }
  }
]

export default user