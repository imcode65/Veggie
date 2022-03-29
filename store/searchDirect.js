const getDefaultState = () => ({
  searchString: '',
})

const state = () => ({
  searchString: '',
})

const mutations = { 
  
  UPDATE_SEARCH_STRING(state, searchstring){
    state.searchString = searchstring
  },

  RESET_STATE_SEARCH_DIRECT(state){
    Object.assign(state, getDefaultState())
  },
}

const actions ={
  async initializeState({commit, state}){
    commit('RESET_STATE_SEARCH_DIRECT')
    commit('UPDATE_SEARCH_STRING', "")
  },
  async changeSearchWord({commit, state}, payload) {
    commit('UPDATE_SEARCH_STRING', payload)
  }
}

const getters = {
  searchString: state => state.searchString,
}

const searchDirectModule = {
  state,
  mutations,
  actions,
  getters
}

export default searchDirectModule;