import setting from '@/setting'

const state = {
  title: setting.title,
  collapse:setting.collapse
} 

const mutations = {
  SET_COLLAPSE(state, payload){
    state.collapse = payload;
  }
}

const actions = {
  setCollapse({ commit }, payload){
    commit('SET_COLLAPSE',payload)
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}