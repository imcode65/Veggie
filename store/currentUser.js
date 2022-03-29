import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  uid: '',
  currentUser: '',
  likedDirectSalesIdList: [],
  favoritedDirectSalesIdList: [],
  likedTimelineIdList: [],
})

const state = () => ({
  uid: '',
  currentUser: '',
  likedDirectSalesIdList: [],
  favoritedDirectSalesIdList: [],
  likedTimelineIdList: [],
  isAdmin: false,
})

const mutations = {
  SET_UID(state, uid) {
    state.uid = uid
    // console.log(process.env.ADMIN_ID)
    if (uid === process.env.ADMIN_ID) {
      state.isAdmin = true;
    }
  },
  SET_USER(state, user) {
    state.currentUser = user
  },
  SET_LIKED_DIRECT_SALE_ID_LIST(state, directSaleIdList) {
    // console.log('@store/currentUser/SET_LIKED_DIRECT_SALE_ID_LIST')
    state.likedDirectSalesIdList = directSaleIdList
  },
  SET_FAVORITED_DIRECT_SALE_ID_LIST(state, directSaleIdList) {
    // console.log('@store/currentUser/SET_FAVORITED_DIRECT_SALE_ID_LIST')
    state.favoritedDirectSalesIdList = directSaleIdList
  },
  SET_LIKED_TIMELINE_ID_LIST(state, timelineIdList) {
    state.likedTimelineIdList = timelineIdList
  },
  ADD_LIKED_TIMELINE_ID(state, timelineId) {
    state.likedTimelineIdList.push(timelineId)
  },
  ADD_FOLLOW(state, user) {
    if (!state.currentUser.following_users) state.currentUser.following_users = []
    state.currentUser.following_users.push(user.id)
  },
  REMOVE_FOLLOW(state, user) {
    const idx = state.currentUser.following_users.indexOf(user.id)
    state.currentUser.following_users.splice(idx, 1)
  },
  RESET_STATE_CURRENT_USER(state) {
    Object.assign(state, getDefaultState())
  },
}

const actions = {
  async initializeState({ commit, dispatch, state }, user) {
    // console.log('currentUser/initializeState')
    commit('RESET_STATE_CURRENT_USER')
    const userRef = db.collection('users').doc(user.uid)
    try {
      const doc = await userRef.get()
      dispatch('setLikedDirectSaleIdList', userRef)
      dispatch('setFavoritedDirectSaleIdList', userRef)
      dispatch('setLikedTimelineIdList', userRef)
  
      commit('SET_UID', user.uid)
  
      // doc.existsがfalseだった場合、初めてログインするユーザなので
      // firebaseのusersに新規登録する
      // 本来firebase側のトリガーで処理した方が良い気もするが、
      // とりあえず今はiOS版に合わせる
      if (doc.exists) {
        let salesRef = db.collection('users').doc(user.uid)
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
      
          // commit('SET_USER_DETAIL', user)   
          commit('SET_USER', user)
        } catch(e) {
          // console.log(e)
        }
        return
      }
      // console.log('newUser')
      try {
        await registerNewUser(user)
        commit('SET_USER', { 
          uid: user.uid, 
          email: user.email, 
          name: user.displayName, 
          metadata: {
            numOfVisitedDirectSales: 0
          }
        })
      } catch(e) {
        // console.log(e)
      }
    } catch(e) {
      alert('ユーザー情報を取得できませんでした')
    }
  },

  async setLikedDirectSaleIdList({commit}, userRef) {
    const response = await userRef.collection('likedDirectSales').get().catch(error => {
      // console.log(error)
    })
    const directSaleIdList = response.docs.map(doc => {
      return doc.id
    })
    commit('SET_LIKED_DIRECT_SALE_ID_LIST', directSaleIdList)
  },

  async setFavoritedDirectSaleIdList({ commit }, userRef) {
    // console.log('@currentUser/setFavoriteDirectSaleIdList')
    const response = await userRef.collection('directSaleFavorites').get().catch(error => {
      // console.log(error)
    })
    const favoritedDirectSalesIdList = response.docs.map(doc => {
      return doc.id
    })
    commit('SET_FAVORITED_DIRECT_SALE_ID_LIST', favoritedDirectSalesIdList)
  },

  async setLikedTimelineIdList({ commit }, userRef) {
    // console.log('@currentUser/setLikedTimelineIdList')
    const response = await userRef.collection('likedTimelines').get().catch(error => {
      // console.log(error)
    })
    const likedTimelineIdList = response.docs.map(doc => {
      return doc.data().id
    })
    commit('SET_LIKED_TIMELINE_ID_LIST', likedTimelineIdList)
  },

  async likeDirectSale({ commit, state, rootState }, directSaleId) {
    // console.log('@currentUser/likeDirectSale')
    const userRef = db.collection('users').doc(rootState.currentUser.uid)
    const { serverTimestamp } = firebase.firestore.FieldValue
    await userRef.collection('likedDirectSales').doc(directSaleId).set({
      id: directSaleId,
      ref: userRef.collection('likedDirectSales').doc(directSaleId),
      createdAt: serverTimestamp()
    })
    .catch(error => {
      // console.log(error)
    })
    let likedDirectSalesIdList = JSON.parse(JSON.stringify(state.likedDirectSalesIdList))
    likedDirectSalesIdList.push(directSaleId)
    commit('SET_LIKED_DIRECT_SALE_ID_LIST', likedDirectSalesIdList)
    // Add point feature
    const pointRef = db.collection('points').doc(rootState.currentUser.uid)
    pointRef.collection("monthly").get()
  },

  async likeDirectSaleCancel({ commit, state, rootState }, directSaleId) {
    // console.log('@currentUser/likeDirectSaleCancel')
    const userRef = db.collection('users').doc(rootState.currentUser.uid)
    const directSaleToBeDeleted = await userRef.collection('likedDirectSales').where('id', '==', directSaleId).get()
      .catch(error => {
        // console.log(error)
      })
    directSaleToBeDeleted.docs[0].ref.delete()
    let likedDirectSalesIdList = JSON.parse(JSON.stringify(state.likedDirectSalesIdList))
    likedDirectSalesIdList = likedDirectSalesIdList.filter((val, index, arr) => {
      return val !== directSaleId
    })
    commit('SET_LIKED_DIRECT_SALE_ID_LIST', likedDirectSalesIdList)
  },

  async addFavoriteDirectSale({ commit, state, rootState }, directSaleId) {
    // console.log('@currentUser/addFavoriteDirectSale')
    const userRef = db.collection('users').doc(rootState.currentUser.uid)
    const directSaleRef = db.collection('directSales').doc(directSaleId)
    const directSale = await directSaleRef.get()
    userRef.collection('directSaleFavorites').doc(directSaleId).set({
      directSaleRef: directSaleRef,
      directSale: directSale.data(),
    }).catch(error => {
      // console.log(error);
    })
    let favoritedDirectSalesIdList = JSON.parse(JSON.stringify(state.favoritedDirectSalesIdList))
    favoritedDirectSalesIdList.push(directSaleId)
    commit('SET_FAVORITED_DIRECT_SALE_ID_LIST', favoritedDirectSalesIdList)
  },

  async removeFavoriteDirectSale({ commit, state, rootState }, directSaleId) {
    // console.log('@currentUser/addFavoriteDirectSale')
    const userRef = db.collection('users').doc(rootState.currentUser.uid)
    userRef.collection('directSaleFavorites').doc(directSaleId).delete()
      .catch(error => {
        // console.log(error)
      })
    let favoritedDirectSalesIdList = JSON.parse(JSON.stringify(state.favoritedDirectSalesIdList))
    favoritedDirectSalesIdList = favoritedDirectSalesIdList.filter((val, index, arr) => {
      return val !== directSaleId
    })
    commit('SET_FAVORITED_DIRECT_SALE_ID_LIST', favoritedDirectSalesIdList)
  },

  async likeTimeline({ commit, state, rootState }, timelineId) {
    // console.log('currentUser/likeTimeline');
    const userRef = db.collection('users').doc(rootState.currentUser.uid)
    const { serverTimestamp } = firebase.firestore.FieldValue
    await userRef.collection('likedTimelines').doc(timelineId).set({
      id: timelineId,
      ref: userRef.collection('likedTimelines').doc(timelineId),
      createdAt: serverTimestamp()
    })
    .catch(error => {
      // console.log(error)
    })
    commit('ADD_LIKED_TIMELINE_ID', timelineId)
  },

  async likeTimelineCancel({ commit, state, rootState }, timelineId) {
    const userRef = db.collection('users').doc(rootState.currentUser.uid)
    const timelineToBeDeleted = await userRef.collection('likedTimelines').where('id', '==', timelineId).get()
      .catch(error => {
        // console.log(error)
      })
    timelineToBeDeleted.docs[0].ref.delete()

    let likedTimelineIdList = JSON.parse(JSON.stringify(state.likedTimelineIdList))
    likedTimelineIdList = likedTimelineIdList.filter((val, index, arr) => {
      return val !== timelineId
    })
    commit('SET_LIKED_TIMELINE_ID_LIST', likedTimelineIdList)
  },

  async follow({ commit, state }, user) {
    commit('ADD_FOLLOW', user)
    await db.collection('users').doc(state.uid).set(
      state.currentUser
    )
  },
  async unfollow({ commit, state }, user) {
    commit('REMOVE_FOLLOW', user)
    await db.collection('users').doc(state.uid).set(
      state.currentUser
    )
  },
  async removeUserData({ commit, state }, user) {
    let userRef = db.collection('users').doc(state.uid)

    // レビュー（みんなの投稿）消去
    let reviewDocs = await db.collection('reviews').where('userRef', '==', userRef).get()
    let reviewIds = reviewDocs.docs.map(doc => doc.id)
    await Promise.all(reviewIds.map(async reviewId => await db.collection('reviews').doc(reviewId).delete()))

    // 直売所消去
    let directSaleDocs = await db.collection('directSales').where('ownerRef', '==', userRef).get()
    let directSaleIds = directSaleDocs.docs.map(doc => doc.id)
    await Promise.all(directSaleIds.map(async directSaleId => await db.collection('directSales').doc(directSaleId).delete()))

    // ユーザー情報消去
    await userRef.delete()
    commit('RESET_STATE_CURRENT_USER')
  }
}

async function registerNewUser(user) {
  let newUserRef = db.collection('users').doc(user.uid)
  await newUserRef.set({
    name: user.displayName,
    isProducer: false,
  })
}

const getters = {
  uid: state => state.uid,
  currentUser: state => state.currentUser,
  isAdmin: state => state.isAdmin,
  likedDirectSalesIdList: state => state.likedDirectSalesIdList,
  favoritedDirectSalesIdList: state => state.favoritedDirectSalesIdList,
  likedTimelineIdList: state => state.likedTimelineIdList,
}

const currentUserModule = {
  state,
  mutations,
  actions,
  getters
}

export default currentUserModule;
