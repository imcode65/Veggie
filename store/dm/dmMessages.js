import firebase from '~/plugins/firebase'
const db = firebase.firestore()

const getDefaultState = () => ({
  dmDocId: '',
  dmMessages: [],
  unsubscribe: '',
  timeOpened: ''
})

const state = () => ({
  dmDocId: '',
  dmMessages: [],
  unsubscribe: '',
  timeOpened: ''
})

const getters = {
  dmMessages: state => state.dmMessages,
  dmDocId: state => state.dmDocId,
}

const actions = {
  async getDMDoc({state, rootState}, toUid){
    const uid = rootState.currentUser.uid
    // 2アカウント間のDM管理ドキュメントを取得する
    const ref = db.collection('DM')
    let doc = await ref.where('dmCompoundId', 'in', [uid+toUid, toUid+uid])
                              .get()
                              .then(response => {
                                return response.docs[0]
                              })
    // なかったら作成する
    if (!doc){
      // console.log('add new dm doc');
      const newDocRef = await db.collection('DM').add({
        userIds: [
          uid,
          toUid
        ]
      })
      .catch(error => {
        // console.log(error)
      })
      doc = await newDocRef.get().catch(error => {
        // console.log(error)
      })
    }
    return doc
  },
  // DMの詳細画面　メッセージの表示
  async initializeState({ state, rootState, commit, dispatch }, toUid){
    // console.log('@store/dm/dmMessages/initializeState');
    await dispatch('detachSnapshot')
    commit('RESET_STATE_DM_MESSAGE')
    const uid = rootState.currentUser.uid
    const doc = await dispatch('getDMDoc', toUid)
    commit('SET_DMDOC_ID', doc.id)
    commit('SET_TIMEOPENED', Math.floor(new Date().getTime()/1000))

    const unsubscribe = doc.ref.collection('message')
                               .orderBy('date')
                                // .orderBy('date', 'desc')
                                // .limit(200)
                               .onSnapshot(async function (snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          if(change.doc.data().senderId !== uid){
            // 相手からのメッセージだった場合、それを既読にする
            change.doc.ref.set({
              read: true
            }, {merge: true})
          }
          else{
            // 自分の送ったメッセージが５秒後に既読になっていなかったら
            // notificationを相手のアカウントに追加する
            setTimeout(async () => {
              const doc = (await change.doc.ref.get())
              const isRead = doc.data().read
              const date = doc.data().date.seconds
              const senderId = doc.data().senderId
              // 未読かつ新しく追加されたかつ相手から送られたメッセージか
              if(!isRead && date > state.timeOpened && toUid !== uid){
                // console.log('setTimeout/isNotRead');
                const { serverTimestamp } = firebase.firestore.FieldValue
                await db.collection('users')
                        .doc(toUid)
                        .collection('notifications')
                        .add({
                          details: [
                            {
                              content: doc.id,
                              title: "ダイレクトメッセージID"
                            },
                          ],
                          kind: 'DM',
                          read: false,
                          userId: senderId,
                          createdAt: serverTimestamp()
                        })
                        .then(response => {
                          // console.log('notification successfully added', response)
                        })
                        .catch(error => {
                          // console.log(error)
                        })
              }
            }, 5000)
          }
          commit('ADD_MESSAGE', change.doc)  
        }
      })
    })  
    //メッセージモーダルを開いたら相手からの最新メッセージを既読にする
    await dispatch('readLastMessage', doc)
    commit('SET_UNSUBSCRIBE', unsubscribe)     
  },
  async readLastMessage({state, rootState}, doc){
    doc.ref.collection('message')
    .orderBy('date', 'desc')
    .limit(1)
    .get()
    .then(response => {
      const doc = response.docs[0]
      const uid = rootState.currentUser.uid
      if(doc.data().senderId === uid) return
      doc.ref.set({
        read: true
      }, {merge: true})
    })
  },
  async detachSnapshot({state}){
    // console.log(`unsubscribing snapshot`);
    if(state.unsubscribe !== '') state.unsubscribe()
  }
}


const mutations = {
  RESET_STATE_DM_MESSAGE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_DMDOC_ID(state, id){
    state.dmDocId = id
  },
  SET_UNSUBSCRIBE(state, unsubscribe){
    state.unsubscribe = unsubscribe
  },
  SET_TIMEOPENED(state, timestamp){
    state.timeOpened = timestamp
  },
  ADD_MESSAGE(state, doc){
    const data = doc.data()
    const message = {
      id: doc.id,
      date: data.date,
      read: false,
      senderId: data.senderId,
      text: data.text
    }
    state.dmMessages.push(message)
  },
}


const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
