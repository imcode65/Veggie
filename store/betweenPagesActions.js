const getDefaultState = () => ({
  targetLocation: '',
  mode: '',
  showRoute: false,
})

const state = () => ({
  targetLocation: '',
  mode: '',
  showRoute: false,
})

const getters = {
  targetLocation: state => state.targetLocation,
  mode: state => state.mode,
  showRoute: state => state.showRoute
}

const actions ={
  
}

const mutations = {
  SET_SHOW_ROUTE(state, payload) {
    state.showRoute = payload
  },
  SET_MODE(state, payload) {
    state.mode= payload
  },
  SET_TARGET_LOCATION(state, payload) {
    state.targetLocation = payload
  },
  RESET_STATE_BETWEENPAGEACTION(state){
    Object.assign(state, getDefaultState())
  },
}

const betweenPagesActionsModule = {
  state,
  mutations,
  actions,
  getters
}

export default betweenPagesActionsModule;
