import { createStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules/index'

const store = createStore({
  state: {
    
  },
  getters,
  mutations,
  actions,
  modules
})

export default store