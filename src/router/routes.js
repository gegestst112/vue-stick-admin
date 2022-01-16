import  Layout from '@/layout'

const routes = [
  {
    path: '/',
    redirect: 'home',
    meta: { hidden: true }
  },
  {
    name: 'home',
    path: '/home',
    // alias: ['/'], 
    component: Layout,
    meta: { title: '首页', hidden: false, icon: 'shouye' },
    children: [
      {
        name: 'homePage',
        path: '',
        component: () => import('@/views/home'),
        meta: { title: '首页', hidden: false, icon: '', fixed: true }
      }
    ]
  },
  {
    name: 'icons',
    path: '/icons',
    component: Layout,
    meta: { title: '图标', hidden: false, icon: 'tubiao1' },
    children: [
      {
        name: 'iconsPage',
        path: '',
        component: () => import('@/views/icons'),
        meta: { title: '图标', hidden: false, icon: '' }
      }
    ]
  },
  {
    name: 'table',
    path: '/table',
    redirect: '/table/normal',
    component: Layout,
    meta: { title: '表格', hidden: false, icon: 'biaodanzujian-biaoge' },
    children: [
      {
        name: 'tableNormal',
        path: 'normal',
        component: () => import('@/views/table/normal'),
        meta: { title: '标准表格', hidden: false, icon: '' }
      },
      {
        name: 'tableFixed',
        path: 'fixed',
        component: () => import('@/views/table/fixed'),
        meta: { title: '固定显示', hidden: false, icon: '' }
      },
      {
        name: 'tableEdit',
        path: 'edit',
        component: () => import('@/views/table/edit'),
        meta: { title: '编辑表格', hidden: false, icon: '' }
      },
      {
        name: 'tableDrag',
        path: 'drag',
        component: () => import('@/views/table/drag'),
        meta: { title: '拖拽表格', hidden: false, icon: '' }
      }
    ]
  },
  {
    name: 'menu',
    path: '/menu',
    redirect: '/menu/m1',
    component: Layout,
    meta: { title: '菜单', hidden: false, icon: 'caidan' },
    children: [
      {
        name: 'menu1',
        path: 'm1',
        component: () => import('@/views/menu/menu-1'),
        meta: { title: '菜单1', hidden: false, icon: '' }
      },
      {
        name: 'menu2',
        path: 'm2',
        redirect: '/menu/m2/m21',
        component: () => import('@/views/menu/menu-2'),
        meta: { title: '菜单2', hidden: false, icon: '' },
        children: [
          {
            name: 'menu21',
            path: 'm21',
            component: () => import('@/views/menu/menu-2-1'),
            meta: { title: '菜单2-1', hidden: false, icon: '' }
          },
          {
            name: 'menu22',
            path: 'm22',
            component: () => import('@/views/menu/menu-2-2'),
            meta: { title: '菜单2-2', hidden: false, icon: '' }
          }
        ]
      }
    ]
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    meta: { title: '登录', hidden: true, free:true }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/login/register'),
    meta: { title: '注册', hidden: true, free:true }
  },
  {
    name: 'retrieve',
    path: '/retrieve',
    component: () => import('@/views/login/retrieve'),
    meta: { title: '找回密码', hidden: true, free:true }
  },
  { 
    name: 'error',
    path: '/:error(.*)*',
    component: () => import('@/views/404.vue'),
    meta: { title: '页面没找到', hidden: true, free:true }
  }
]



export default routes


