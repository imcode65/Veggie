import firebase from '~/plugins/firebase'
import {getImageThumbnailPath, getImageThumbnailPaths} from '~/plugins/library/imageThumbnail'


const db = firebase.firestore()

const getDefaultState = () => ({
  userList: [],
  reviews: [],
  directSaleNameList: [],
})

const state = () => ({
  userList: [],
  reviews: [],
  directSaleNameList: [],
})

const mutations = {
  async ADD_REVIEW(state, { doc }) {
    const data = doc.data()
    // let directname = await getDirectSaleState(data.directSaleId)
    const review = {
      id: doc.id,
      content: data.content || '',
      createdAt: data.createdAt || 0,
      imageStoragePaths: getImageThumbnailPaths(data.imageStoragePaths) || [],
      userId: data.userRef.id || '',
      // userName: users[data.userId] ? users[data.userId].name : 'no name',
      // userImageStoragePath: users[data.userId] ? getImageThumbnailPath(users[data.userId].imageStoragePath) : 'no image',
      meta: data.metadata || {},
      directSaleId: data.directSaleId || '',
      // directSaleName: directname || '',
    }

    state.reviews.push(review)
  },

  ADD_USER(state, { doc }) {
    const data = doc.data()
    const user = {
      // reviewId: doc.id,
      id: doc.id || '',
      userName: data.name || 'no name',
      userImageStoragePath: data.imageStoragePath || 'no image',
    }

    state.userList.push(user)
    // console.log(state.userList)
  },

  async ADD_DIRECTSALENAME(state, { doc }) {
    const data = doc.data()
    const nameList = {
      // reviewId: doc.id,
      id: doc.id || '',
      saleName: data.name || 'no name',
    }
    
    state.directSaleNameList.push(nameList)
    // console.log(state.directSaleNameList)
  },

  RESET_STATE_TOPDIRECTSALEREVIEW(state) {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  async initializeState({ commit, rootState, state }) {
    try{
      commit('RESET_STATE_TOPDIRECTSALEREVIEW')
      // firebaseのcollectionからタイムライン情報を取得する
      const ref = db.collection('reviews').orderBy('createdAt', 'desc')
      // await ref.limit(4).where('imageStoragePaths[0]', '!=', '').get().then(res => {
      await ref.limit(3).get().then(res => {
        res.docs.forEach(doc => {
          commit('ADD_REVIEW', {doc})
        })
      })
      // console.log(state.reviews);

      initializeUserList({commit, reviews:state.reviews})
      initializeDirectSaleStoreNameList({commit, reviews:state.reviews})

      // console.log('topDirectSaleReviewList/initializeState');
    }
    catch(e){
      // console.log(e);
    }
  }
}

async function initializeUserList({commit, reviews}){
  const ref = db.collection('users')
  // console.log(ref);
  let promises = []
  reviews.forEach((review, index) => {
    // console.log(review.userId);
    promises[index] = ref.doc(review.userId).get()
  })
  // console.log(promises);
  const res = await Promise.all(promises)
  // console.log(res);
  res.forEach(doc => {
    commit('ADD_USER', { doc })
  })
}

async function initializeDirectSaleStoreNameList({commit, reviews}){
  const ref = db.collection('directSales')
  // console.log(ref);
  let promises = []
  reviews.forEach((review, index) => {
    // console.log(review.userId);
    promises[index] = ref.doc(review.directSaleId).get()
  })
  // console.log(promises);
  const res = await Promise.all(promises)
  // console.log(res);
  res.forEach(doc => {
    commit('ADD_DIRECTSALENAME', { doc })
  })
}


// async function getDirectSaleState(directSaleId){
//   // firebaseのcollectionから直売所情報を取得する
//   let salesRef = db.collection('directSales').doc(directSaleId)
//   let doc = await salesRef.get()
//   .catch(error => {
//   })
//   return doc.data().name
// }

const getters = {
  reviews: state => state.reviews,
  userList: state => state.userList,
  directSaleNameList: state => state.directSaleNameList,
}

const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
