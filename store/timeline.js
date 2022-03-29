import firebase from '~/plugins/firebase'
import {getImageThumbnailPath, getImageThumbnailPaths} from '~/plugins/library/imageThumbnail'


const db = firebase.firestore()
const urlPattern = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g

const getDefaultState = () => ({
  timelines: [],
  myTimelines: [],
})

const state = () => ({
  timelines: [],
  myTimelines: [],
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
      userName: users[data.userId] ? users[data.userId].name : 'no name',
      userImageStoragePath: users[data.userId] ? getImageThumbnailPath(users[data.userId].imageStoragePath) : 'no image',
      meta: doc.meta || {},
      urls: typeof(data.content) === 'string' ? data.content.match(urlPattern) || [] : [],
      videoUrls: data.videoInfos || [],
      watch_count: doc.watch_count,
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
  async MODIFY_TIMELINE(state, { doc, users }) {
    // console.log('@timeline/MODIFY_TIMELINE')
    const data = doc.data()
    const timeline = {
      id: doc.id,
      comments: data.comments || null,
      content: data.content || '',
      createdAt: data.createdAt || 0,
      imageStoragePaths: getImageThumbnailPaths(data.imageStoragePaths) || [],
      userId: data.userId || '',
      userName: users[data.userId] ? users[data.userId].name : 'no name',
      userImageStoragePath: users[data.userId] ? getImageThumbnailPath(users[data.userId].imageStoragePath) : 'no image',
      meta: doc.meta || {},
      urls: data.content.match(urlPattern) || [],
      watch_count: doc.watch_count,
    }
    // console.log('@timeline/MODIFY_TIMELINE: ' + JSON.stringify(timeline))
    const idx = state.timelines.findIndex(t => t.id == timeline.id)
    if (idx > -1) {
      // console.log('@timeline/MODIFY_TIMELINE: modify!')
      state.timelines.splice(idx, 1, timeline)
    }
  },
  async REMOVE_TIMELINE(state, doc) {
    // console.log('@timeline/REMOVE_TIMELINE')

    // console.log('@timeline/REMOVE_TIMELINE: ' + JSON.stringify(doc.id))
    const idx = state.timelines.findIndex(t => t.id == doc.id)
    if (idx > -1) {
      // console.log('@timeline/REMOVE_TIMELINE: remove!')
      state.timelines.splice(idx, 1)
    }
  },
  RESET_STATE_TIMELINE(state) {
    // Object.assign(state, getDefaultState())
    state.timelines = []
  },
  ADD_MY_TIMELINE(state, {docs, user}) {
    const myTimelines = []

    docs.map((doc) => {
      const data = doc.data()
      const temp = {
        id: doc.id,
        comments: data.comments || null,
        content: data.content || '',
        createdAt: data.createdAt || 0,
        imageStoragePaths: getImageThumbnailPaths(data.imageStoragePaths) || [],
        meta: doc.meta || {},
        urls: typeof(data.content) === 'string' ? data.content.match(urlPattern) || [] : [],
        watch_count: doc.watch_count,
      }
      myTimelines.push(temp)
    })

    state.myTimelines = myTimelines
  }
}

async function countTimelineLikedUsers(timelineId) {
  // console.log(timelineId)
  const timelineRef = db.collection('timeline').doc(timelineId)
  const likedUsers = await timelineRef.collection('likedUsers').get()
  const numOfLikedUsers = likedUsers.docs.length
  return numOfLikedUsers
}

async function countWatchCount(timelineId) {
  const timelineRef = db.collection('timeline').doc(timelineId)
  const watchCountRef = await timelineRef.collection('count').doc('watch_count').get();

  if (watchCountRef.data()) {
    return watchCountRef.data().count;
  } else {
    return 0;
  }
}


const actions = {
  async initializeState({ commit, rootState }) {
    commit('RESET_STATE_TIMELINE')

    const users = {}
    rootState.userList.userList.map(u => users[u.id] = u)

    // firebaseのcollectionからタイムライン情報を取得する
    const ref = db.collection('timeline').orderBy('createdAt', 'desc')
    ref.limit(100).onSnapshot(async function (snapshot) {
      // ドキュメントが作成、変更、削除されるたびに出力される
      for (const change of snapshot.docChanges()) {
        //　いいね数が格納されたmetadataフィールドを取得する
        let metadata = change.doc.data().metadata
        if (isNaN(metadata.numOfLikedUsers) || typeof metadata.numOfLikedUsers !== 'number') {
          metadata = { numOfLikedUsers: await countTimelineLikedUsers(change.doc.id) }
        }
        let watch_count = await countWatchCount(change.doc.id);
        let doc = change.doc
        Object.assign(doc, { meta: metadata, watch_count: watch_count })
        if (change.type === 'added') {
          // 初期表示または通知が追加されたときの処理
          commit('ADD_TIMELINE', { doc: doc, users })
        }
        if (change.type === 'modified') {
          commit('MODIFY_TIMELINE', { doc: doc, users })
        }
        if (change.type === 'removed') {
          commit('REMOVE_TIMELINE', doc)
        }
      }
    })
  },
  async fetchMyTimelines({commit, rootState}) {
    const uid = rootState.currentUser.currentUser.id;

    const ref = db.collection('timeline').where('userId', '==', uid).orderBy('createdAt', 'desc')
    const snapshot = await ref.get()
    commit("ADD_MY_TIMELINE", {docs: snapshot.docs,})
  },
  async addTimeline({ rootState, commit }, payload) {
    const user = rootState.currentUser.currentUser
    const uid = rootState.currentUser.uid
    if (!user || !uid) {
      // console.log('please log in to add timeline')
      return
    }

    // default value
    const timeline = {
      comments: payload.comments || null,
      content: payload.content || '',
      createdAt: new Date(),
      imageStoragePaths: payload.imageStoragePaths || [],
      userId: payload.userId || '',
    }

    commit("ADD_TIMELINE", timeline)
    const ref = db.collection('timeline')
    await ref.set(timeine)
  },
  async removeTimeLine({ rootState, commit }, payload) {
    const user = rootState.currentUser.currentUser
    const uid = rootState.currentUser.uid
    if (!user || !uid) {
      // console.log('please log in to add timeline')
      return
    }
    const ref = await db.collection('timeline')
      .where('userId', '==', uid)
      .get()
    const docIds = ref.docs.map(item => item.id)
    await Promise.all(docIds.map(async docId => await db.collection('timeline').doc(docId).delete()))
    commit('RESET_STATE_TIMELINE')
  }
}

const getters = {
  timelines: state => state.timelines,
  myTimelines: state => state.myTimelines,
}

const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
