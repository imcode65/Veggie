//直売所の最新情報を管理する
import firebase from '~/plugins/firebase'
import {getImageThumbnailPath, getImageThumbnailPaths} from '~/plugins/library/imageThumbnail'

const db = firebase.firestore()

const getDefaultState = () => ({
  reviews: [],
  userList: []
})

const state = () => ({
  reviews: [],
  userList: []
})

const mutations = { 
  async ADD_REVIEW(state, { doc }) {
    const data = doc.data()
    const review = {
      id: doc.id,
      content: data.content || '',
      createdAt: data.createdAt || 0,
      imageStoragePaths: getImageThumbnailPaths(data.imageStoragePaths) || [],
      userId: data.userRef.id || '',
      meta: data.metadata || {},
      directSaleId: data.directSaleId || '',
    }
    state.reviews.push(review)
  },
  ADD_USER(state, { doc }) {
    const data = doc.data()
    const user = {
      // reviewId: doc.id,
      id: doc.id || '',
      name: data.name || 'no name',
      imageStoragePath: data.imageStoragePath || 'no image',
    }
    state.userList.push(user)
  },
  RESET_STATE_DIRECTSALEREVIEWER(state){
    Object.assign(state, getDefaultState())
  },
}

const actions ={
  async getReviewsByDirectSaleId({state, commit, rootState, dispatch}, directSaleId){
    // console.log('@directSaleRevies/getReviesByDirectSaleId');
    commit('RESET_STATE_DIRECTSALEREVIEWER')
    const response  = await db.collection('reviews')
                              .where('directSaleId', '==', directSaleId)
                              .orderBy('createdAt')
                              .get()
    response.docs.forEach(doc => {
      commit('ADD_REVIEW', {doc})
    })
    await initializeUserList({commit, reviews:state.reviews})   
  },
}

async function initializeUserList({commit, reviews}){
  const ref = db.collection('users')
  let promises = []
  reviews.forEach((review, index) => {
    promises[index] = ref.doc(review.userId).get()
  })
  const res = await Promise.all(promises)
  res.forEach(doc => {
    commit('ADD_USER', { doc })
  })
}

const getters = {
  reviews: state => state.reviews,
  userList: state => state.userList,
}

const directSalePostsModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalePostsModule;