import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  userList: [],
})

const state = () => ({
  userList: [],
})

const mutations = { 
  ADD_USER(state, doc){
    const data = doc.data()
    const user = {
      id: doc.id,
      imageStoragePath: data.imageStoragePath || '',
    }
    state.userList.push(user)
  },
  RESET_STATE_TOP_USERLISTRECOMMEND(state){
    Object.assign(state, getDefaultState())
  },
}
const actions ={
  async initializeState({commit,state}){
    // console.log('top/userListRecommended/initializeRecommededUserList')
    commit('RESET_STATE_TOP_USERLISTRECOMMEND')
    let usersRef = db.collection('users')
    let list = await usersRef.limit(20).where('imageStoragePath', '!=', '').get()
    .catch(error => {
      // console.log(error)
    })
    list.docs.map(doc => {
      commit('ADD_USER', doc)
    })
  },
}

const getters = {
  userList: state => state.userList,
}

const userListModule = {
  state,
  mutations,
  actions,
  getters
}

export default userListModule;