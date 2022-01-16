const state = {
  userName: null
} 

const mutations = {
  SET_NAME(state, payload){
    state.userName = payload;
  }
}

const actions = {
  setName({ commit }, payload){
    commit('SET_NAME',payload)
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}