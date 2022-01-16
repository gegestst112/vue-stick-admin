import { createRouter,createWebHistory } from 'vue-router'
import routeData from './routes.js'
import store from '@/store/index.js'

const routes = routeData

const router = createRouter({
  history: createWebHistory() ,
  routes
})

router.beforeEach((to,from) => {
  if(!to.meta.free && (!sessionStorage.userName || !sessionStorage.menu)){
    router.push({
      path: '/login',
      query: {
        redirect: to.path
      }
    })
  }
})
router.afterEach((to,from) => {
  document.title = to.meta.title + '-' + store.state.setting.title;
  let pathname = location.pathname;
  store.dispatch('menu/setPathname',pathname);
})

export default router


