import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  userList: [],
})

const state = () => ({
  userList: [],
})

const mutations = { 
  ADD_USER(state, user){
    let ds = JSON.parse(JSON.stringify(user))
    if(ds.imageStoragePath == null){
      ds.imageStoragePath = ""
    }
    state.userList.push(ds)
  },
  RESET_STATE_USERLIST(state){
    Object.assign(state, getDefaultState())
  },
}
const actions ={
  async initializeState({commit,state}){
    commit('RESET_STATE_USERLIST')

    let usersRef = db.collection('users')
    let list = await usersRef.get()
    list.docs.map(doc => {
      //doc.data()をそのままpushしようとすると、
      //データの型が違う場合エラーになるため、要素ごとに分けてアサインする
      //開発中のみに発生する問題かもしれない
      let user = doc.data()
      user.id = doc.id
      commit('ADD_USER', user)
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