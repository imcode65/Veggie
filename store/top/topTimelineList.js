import firebase from '~/plugins/firebase'
import {getImageThumbnailPath, getImageThumbnailPaths} from '~/plugins/library/imageThumbnail'


const db = firebase.firestore()
const urlPattern = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g

const getDefaultState = () => ({
  timelines: [],
})

const state = () => ({
  timelines: [],
})

const mutations = {
  async ADD_TIMELINE(state, { doc, users }) {
    const data = doc.data()
    const timeline = {
      id: doc.id,
      comments: data.comments || null,
      content: data.content || '',
      createdAt: data.createdAt || 0,
      imageStoragePaths: getImageThumbnailPaths(data.imageStoragePaths) || [],
      userId: data.userId || '',
      userName: users[data.userId] ? users[data.userId].name : '',
      userImageStoragePath: users[data.userId] ? getImageThumbnailPath(users[data.userId].imageStoragePath) : '',
      meta: data.metadata || {},
      urls: data.content.match(urlPattern) || [],
    }

    if (state.timelines.length > 0) {
      const latest = state.timelines[0].createdAt || 0
      if (timeline.createdAt === 0 || latest < timeline.createdAt) {
        // 最新の投稿は先頭に追加（投稿された直後はcreatedAtが確定しておらず0になるのを考慮している）
        state.timelines.splice(0, 0, timeline)
        return
      }
    }
    state.timelines.push(timeline)
  },
  RESET_STATE_TOPTIMELINELIST(state) {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  async initializeState({ commit, rootState, state }) {
    // console.log("top/topTimelineList/initializeState")
    commit('RESET_STATE_TOPTIMELINELIST')

    const users = {}
    rootState.userList.userList.map(u => users[u.id] = u)

    // console.log(users)
    // firebaseのcollectionからタイムライン情報を取得する
    const ref = db.collection('timeline').orderBy('createdAt', 'desc')
    const res = await ref.limit(3).get()
    res.docs.forEach(doc => {
      commit('ADD_TIMELINE', { doc, users })
    })
  },  

}

const getters = {
  timelines: state => state.timelines,
}

const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
