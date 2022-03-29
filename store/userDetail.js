//直売所の詳細情報を取り扱うのに使用する
import firebase from '~/plugins/firebase'

const db = firebase.firestore()

const getDefaultState = () => ({
  user: undefined
})

const state = () => ({
  user: undefined
})

const mutations = { 
  SET_USER_DETAIL(state, user){
    state.user = JSON.parse(JSON.stringify(user))
  },
  ADD_FOLLOWER(state, newFollowerId){
    state.user.user_following.push(newFollowerId)
  },
  REMOVE_FOLLOWER(state, followerId){
    const idx = state.user.user_following.indexOf(followerId)
    if (idx > -1) {
      state.user.user_following.splice(idx, 1)
    }
  },
  RESET_STATE_USERDETAIL(state){
    Object.assign(state, getDefaultState())
  },
}

const actions ={
  async initializeState({ commit, dispatch }, userId){
    let salesRef = db.collection('users').doc(userId)
    try {
      let doc = await salesRef.get()

      let user = {
        ...doc.data(),
        id: doc.id,
      }
      if (!user.following_users) {
        user.following_users = []
      }
      if (!user.user_following) {
        user.user_following = []
      }
  
      // ADD Watch count
      let watchCountRef = await doc.ref.collection('count').doc('watch_count').get();
  
      if (watchCountRef.data()) {
        user.watch_count = watchCountRef.data().count;
      } else {
        user.watch_count = 0;
      }
  
      commit('SET_USER_DETAIL', user)   
    } catch(e) {
      // console.log(e)
    }
  },
  async addFollower({commit}, userId){
    commit('ADD_FOLLOWER', userId)
  },
  async removeFollower({commit}, userId){
    commit('REMOVE_FOLLOWER', userId)
  },
  async increaseWatchCount({ commit, dispatch, state, rootState }, userId) {
    // console.log("Increase watch count", userId)
    // console.log("Uid ", rootState.currentUser.uid)
    
    let userRef = db.collection('users').doc(userId)
    let doc = await userRef.get()
    
    let watchCountRef = await doc.ref.collection('count').doc('watch_count')
    let countDoc = await watchCountRef.get();
    
    if (rootState.currentUser.uid !== "") {
      let countUserRef = await countDoc.ref.collection('counts').doc(rootState.currentUser.uid)
      
      if (!(await countUserRef.get()).exists) {
        await countDoc.ref.collection('counts').doc(rootState.currentUser.uid).set({
          date: Date.now()
        })
        if (countDoc.data()) {
          watchCountRef.set({
            count: countDoc.data().count + 1
          })
        } else {
          watchCountRef.set({
            count: 1
          })
        }
      }
    }
  }
}

const getters = {
  user: state => state.user,
}

const userDetailModule = {
  state,
  mutations,
  actions,
  getters
}

export default userDetailModule;