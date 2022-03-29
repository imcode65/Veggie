import firebase from '~/plugins/firebase'
const db = firebase.firestore()

const getDefaultState = () => ({
  dmProfiles: [],
  unsubscribe: '',
})

const state = () => ({
  dmProfiles: [],
  unsubscribe: '',
})

const getters = {
  dmProfiles: state => state.dmProfiles,
}

const actions = {

  // DM履歴一覧のリスト表示
  async initializeState({ state, rootState, commit, dispatch }) {
    await dispatch('detachSnapshot')
    commit('RESET_STATE_DM_DMPROFILE')
    
    const users = {}
    rootState.userList.userList.map(u => users[u.id] = u)

    // DMでやりとりしたことのあるアカウントを取得する
    const unsubscribe = await db.collection('DM').where('userIds', 'array-contains', rootState.currentUser.uid).orderBy('lastSent', 'desc').onSnapshot(
      snapshot => {
        for (const change of snapshot.docChanges()) {
          //　いいね数が格納されたmetadataフィールドを取得する
          let doc = change.doc
          let profile = doc.data()
          profile.id = doc.id
          const uid = rootState.currentUser.uid
          const theOtherUserUid = (doc.data().userIds.filter(userId => {
            return userId !== uid
          }))[0]
          const theOtherUser = users[theOtherUserUid]
          profile.theOtherUser = theOtherUser //? theOtherUser : ''

          if (change.type === 'added') {
            if(profile.numOfMessages && profile.numOfMessages > 0) commit('ADD_DM_PROFILE', profile)
          }
          if (change.type === 'modified') {
            const idx = state.dmProfiles.findIndex(i => i.id == profile.id)
            if (idx > -1){
              commit('MODIFY_DM_PROFILE', { profile, idx }) 
            }
          }
        }
      }
    )
    commit('SET_UNSUBSCRIBE', unsubscribe)   
  },
  async detachSnapshot({state}) {
    if(state.unsubscribe !== '') state.unsubscribe()
  }
}


const mutations = {
  RESET_STATE_DM_DMPROFILE(state) {
    Object.assign(state, getDefaultState())
  },
  ADD_DM_PROFILE(state, profile){
    state.dmProfiles.push(profile)
  },
  MODIFY_DM_PROFILE(state, { profile, idx }){
    // 更新されたプロファイルが上にくるよう並び替え
    state.dmProfiles.splice(0, 0, profile)
    state.dmProfiles.splice(idx + 1, 1)

  },
  SET_UNSUBSCRIBE(state, unsubscribe){
    state.unsubscribe = unsubscribe
  },
}


const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
