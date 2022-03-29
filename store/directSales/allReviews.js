import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  myReviews: [],
})

const state = () => ({
  myReviews: [],
})

const mutations = { 
  SET_MY_REVIEWS(state, reviews){
    state.myReviews = reviews
  },
  RESET_STATE_ALLREVIEW(state){
    Object.assign(state, getDefaultState())
  }
}
const actions ={
  async initializeState({commit,state, rootState}){
    commit('RESET_STATE_ALLREVIEW')
    const userId = firebase.auth().currentUser.uid

    let salesRef = db.collection('reviews')

    let list = await salesRef.where('userId', '==', userId).get()

    const reviews = list.docs.map(doc => {
      return doc.data()
    })

    commit('SET_MY_REVIEWS', reviews)
  },

}

const getters = {
  myReviews: state => state.myReviews,
}

const allReviewsModule = {
  state,
  mutations,
  actions,
  getters
}

export default allReviewsModule;