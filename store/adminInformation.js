import {PublishState} from '~/constants/'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()



const state = () => ({
  adminInformation:{
    message: '',
    link: '',
    linkState: PublishState.private, 
  }
})

const mutations = { 
  UPDATE_MESSAGE(state, payload){
    state.adminInformation.message = payload
  },
  UPDATE_LINK(state, payload){
    state.adminInformation.link = payload
  },
  UPDATE_LINK_STATE(state, payload){
    state.adminInformation.linkState = payload
  },
  STATE_INITIALIZATION(state, payload){
    state.adminInformation.message = payload.message
    state.adminInformation.link = payload.link
    state.adminInformation.linkState = payload.linkState
  }
}

const actions ={
  async initializeState({commit}){
    let adminRef = db.collection('admin_information')
    adminRef.get()
    .then(response => {     
      if(!response.docs[0]){
        return false
      }
      const doc = response.docs[0].data()
      commit('STATE_INITIALIZATION', doc.adminInformation)
    })
    .catch((error) => {
      // console.log(error)
    })
  },
}

const getters = {
  adminInformation: state => state.adminInformation,
  message: state => state.adminInformation.message,
  link: state => state.adminInformation.link,
  linkState: state => state.adminInformation.linkState
}

const adminInformationModule = {
  state,
  mutations,
  actions,
  getters
}

export default adminInformationModule