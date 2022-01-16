//设置子路由的 path
const setPath = (parent) => {
  parent.children.forEach(e=>{
    if(e.path.indexOf('/') == -1){
      e.path = parent.path + '/' + e.path;
    }
    if(e.children && e.children.length>1){
      setPath(e)
    }
  })
}

const state = {
  side: [], //路由菜单列表
  notes: [],  //tag记录列表
  pathname: ''  //默认菜单path
} 

const mutations = {
  SET_SIDE(state, payload){
    state.side = payload;
  },
  ADD_NOTES(state, payload){
    if (state.notes.some(e => e.name === payload.name)) return
    state.notes.push(
      Object.assign({}, payload)
    )
  },
  DEL_NOTES(state, payload){
    for (const [i, e] of state.notes.entries()) {
      if (e.name == payload.name) {
        state.notes.splice(i, 1)
        break
      }
    }
  },
  SET_PATHNAME(state, payload){
    state.pathname = payload;
  }
}

const actions = {
  setSide({ commit }, payload){
    payload.forEach(e=>{
      if(e.children && e.children.length>1){
        setPath(e)
      }
    })
    commit('SET_SIDE',payload)
  },
  addNotes({ commit }, payload){
    commit('ADD_NOTES',payload)
  },
  delNotes({ commit, state }, payload){
    return new Promise(resolve => {
      commit('DEL_NOTES',payload)
      resolve({
        // visitedViews: [...state.visitedViews],
        // cachedViews: [...state.cachedViews]
      })
    })
  },
  setPathname({ commit }, payload){
    commit('SET_PATHNAME',payload)
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}