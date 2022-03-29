import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  notifications: [],
  unreadCountStr: '',
  unsubscribe: '',
})

const state = () => ({
  notifications: [],
  unreadCountStr: '',
  unsubscribe: '',
})

const getters = {
  unreadCountStr: state => state.unreadCountStr,
  notifications: state => state.notifications,
}

const actions = {
  async initializeState({ rootState, state, commit, dispatch }) {
    // firebaseのcollectionからお知らせ情報を取得する
    await dispatch('detachSnapshot')
    // console.log('@notifications/initializeState');
    const user = rootState.currentUser.currentUser
    const uid = rootState.currentUser.uid
    if (user && uid) {
      const ref = db.collection('users').doc(`${uid}`).collection(`notifications`)
      const unsubscribe = ref.orderBy('createdAt').limit(30).onSnapshot(function (snapshot) {
        // ドキュメントが作成、変更、削除されるたびに出力される
        for (const change of snapshot.docChanges()) {
          // console.log(JSON.stringify(change.doc.data()));
          if (change.type === 'added') {
            // 通知が追加されたときの処理
            // console.log(`@store/notifications: notification added!!`)
            if (change.doc.data().read === false) {
              commit('SET_UNREAD_COUNT_STR', state.unreadCountStr ? String(Number(state.unreadCountStr) + 1) : "1")
              // console.log(`@store/notifications: ${state.unreadCountStr} unread notifications`)
            }
          }
        }
      })
      commit('SET_UNSUBSCRIBE', unsubscribe) 
    }
  },
  async readAll({ rootState, state, commit, dispatch }) {
    // if(state.unsubscribe !== '') await dispatch('detachSnapshot')
    commit('RESET_STATE_NOTIFICATION')

    const user = rootState.currentUser.currentUser
    const uid = rootState.currentUser.uid
    if (user && uid) {
      const ref = db.collection('users').doc(`${uid}`).collection(`notifications`)
      const collection = await ref.orderBy('createdAt', 'desc').get()   //.where('read', '==', false)
        .catch(error => {
          alert('@store/notifications: 通知情報を取得できませんでした')
          // console.log(error)
        })

      await Promise.all(collection.docs.map(async doc => {
        const d = doc.data()
        d.id = doc.id
        d.dispMessage = ""
        if (d.kind === '自分の投稿へのいいね' && d.userId) {
          const uRef = db.collection('users').doc(`${d.userId}`)
          const u = await uRef.get()
          d.dispMessage = u.data().name + "があなたのタイムライン投稿にいいね♡しました"
        }
        else if (d.kind === 'DM' && d.userId) {
          const uRef = db.collection('users').doc(`${d.userId}`)
          const u = await uRef.get()
          d.dispMessage = u.data().name + "からDMが届いています"
        }
        commit('ADD_NOTIFICATION', d)
      }))

      const notificationsMap = {}
      collection.docs.map(d => notificationsMap[d.id] = d.data())

      for (const id in notificationsMap) {
        const notification = notificationsMap[id]
        if (notification.read) continue
        notification.read = true
        ref.doc(id).set(notification)
      }
    }
  },
  async detachSnapshot({state}){
    // console.log(`unsubscribing snapshot`);
    if(state.unsubscribe !== '') state.unsubscribe()
  },
  async delete({rootState, commit}, notificationId) {
    const user = rootState.currentUser.currentUser
    const uid = rootState.currentUser.uid
    if (user && uid) {
      try {
        db.collection('users').doc(`${uid}`).collection(`notifications`).doc(notificationId).delete();
        commit('DELETE_NOTIFICATION', notificationId);
      } catch {
        alert("削除に失敗しました");
      }
    }
    else {
      alert("ユーザー情報が正しくありません");
    }
  }
}
const mutations = {
  SET_UNREAD_COUNT_STR(state, str) {
    state.unreadCountStr = str
  },
  ADD_NOTIFICATION(state, payload) {
    state.notifications.push(payload)
  },
  SET_UNSUBSCRIBE(state, unsubscribe){
    state.unsubscribe = unsubscribe
  },
  RESET_STATE_NOTIFICATION(state) {
    Object.assign(state, getDefaultState())
  },
  DELETE_NOTIFICATION(state, payload) {
    const notes = state.notifications.filter( (note) => {
      return note.id !== payload
    })
    state.notifications = notes;
  },
}


const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
