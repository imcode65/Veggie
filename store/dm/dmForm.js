import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const getDefaultState = () => ({
  message: ''
})

const state = () => ({
  message: ''
})

const getters = {
  message: state => state.message
}

const actions = {
  async sendDM({ state, rootState, commit, dispatch }){
    const fromUid = rootState.currentUser.uid
    await db.collection('DM').doc(rootState.dm.dmMessages.dmDocId).collection('message').add({
            senderId: fromUid,
            text: state.message,
          })
          .catch(error => {
            // console.log(error)
          })
    // commit('dm/dmMessages/ADD_MESSAGE', )
    commit('UPDATE_MESSAGE', '')
  },
}
const mutations = {
  RESET_STATE_DM_FORM(state) {
    Object.assign(state, getDefaultState())
  },
  UPDATE_DMDOC_ID(state, id){
    state.dmDocId = id
  },
  UPDATE_MESSAGE(state, message){
    state.message = message
  },
}


const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
