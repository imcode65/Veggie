import firebase from '~/plugins/firebase'
const db = firebase.firestore()



const getDefaultState = () => ({
  directSale: {},
  post: {
    id: '',
    directSaleId: '',
    directSaleName: '',
    description: '',
    image:{
      file: '',
      path: '',
      blob: ''
    },
    image2:{
      file: '',
      path: '',
      blob: ''
    },
    image3:{
      file: '',
      path: '',
      blob: ''
    },
  }
})

const state = () => ({
  directSale: {},
  post: {
    id: '',
    directSaleId: '',
    directSaleName: '',
    description: '',
    image:{
      file: '',
      path: '',
      blob: ''
    },
    image2:{
      file: '',
      path: '',
      blob: ''
    },
    image3:{
      file: '',
      path: '',
      blob: ''
    },
  }
})

const mutations = { 
  UPDATE_DIRECT_SALE(state, payload){
    state.directSale = payload.directSale
    state.directSale.id = payload.id
  },
  UPDATE_ID(state, payload){
    state.post.id = payload
  },
  UPDATE_DIRECTSALE_ID(state, payload){
    state.post.directSaleId = payload
  },
  UPDATE_DIRECTSALE_NAME(state, payload){
    state.post.directSaleName = payload
  },
  UPDATE_DESCRIPTION(state, payload){
    state.post.description = payload
  },
  UPDATE_IMAGE(state, payload){
    const path = payload === '' ? '': `images/users/${firebase.auth().currentUser.uid}/directSalePosts/${new Date().getTime()}.jpeg` 
    state.post.image.file = payload
    state.post.image.path = path
  },
  UPDATE_IMAGE_BLOB(state, blob){
    state.post.image.blob = blob
  },
  UPDATE_IMAGE_2(state, payload){
    const path = payload === '' ? '': `images/users/${firebase.auth().currentUser.uid}/directSalePosts/${new Date().getTime()}.jpeg` 
    state.post.image2.file = payload
    state.post.image2.path = path
  },
  UPDATE_IMAGE_2_BLOB(state, blob){
    state.post.image2.blob = blob
  },
  UPDATE_IMAGE_3(state, payload){
    const path = payload === '' ? '': `images/users/${firebase.auth().currentUser.uid}/directSalePosts/${new Date().getTime()}.jpeg` 
    state.post.image3.file = payload
    state.post.image3.path = path
  },
  UPDATE_IMAGE_3_BLOB(state, blob){
    state.post.image3.blob = blob
  },
  STATE_INITIALIZATION(state, payload){    
    state.post.id = payload.id
    state.post.directSaleId = payload.directSaleId
    state.post.directSaleName = payload.directSaleName
    state.post.description = payload.description
    state.post.image.path = payload.imageStoragePaths[0]
    state.post.image2.path = payload.imageStoragePaths[1]
    state.post.image3.path = payload.imageStoragePaths[2]
  },
  RESET_STATE(state){
    Object.assign(state, getDefaultState())
  },
}

const actions = {
  async sendPost({commit}, post){
    let postRef = db.collection('direct_sale_posts')
    const { serverTimestamp } = firebase.firestore.FieldValue
    const auth = firebase.auth();
        if(post && post.id != ''){
          return await postRef.doc(post.id).update({
            directSaleId: post.directSaleId,
            directSaleName: post.directSaleName,
            uid: firebase.auth().currentUser.uid,
            description: post.description,
            imageStoragePaths: [
              post.image.path,
              post.image2.path,
              post.image3.path,
            ],
            updatedAt: serverTimestamp(),
          })
        }
        return await postRef.add({
          directSaleId: post.directSaleId,
          directSaleName: post.directSaleName,
          uid: firebase.auth().currentUser.uid,
          description: post.description,
          imageStoragePaths: [
            post.image.path,
            post.image2.path,
            post.image3.path,
          ],
          deleted: false,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        })
  },
  async deletePost({commit}, post){
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if (user) {
        let postRef = db.collection('direct_sale_posts')
        const { serverTimestamp } = firebase.firestore.FieldValue
        if(post.id != ''){
          return postRef.doc(post.id).update({
            deleted: true,
            updatedAt: serverTimestamp(),
          })
        }
      } 
    });
  },
  async uploadImages({commit},post){
    const file = post.image.file
    const file2 = post.image2.file
    const file3 = post.image3.file
    if (file) {
      const imageRef = firebase.storage().ref().child(post.image.path)
      await imageRef.put(file)
    }
    if (file2) {
      const imageRef = firebase.storage().ref().child(post.image2.path)
      await imageRef.put(file2)
    }
    if (file3) {
      const imageRef = firebase.storage().ref().child(post.image3.path)
      await imageRef.put(file3)
    }
  },
  async getDirectSale({commit}, id){
    let salesRef = db.collection('direct_sales')
    await salesRef.where("uid", "==", id).get()
          .then(querySnapshot => {     
              if(!querySnapshot.docs[0]){
                alert('直売所が登録されていません。')
              }
              const doc = querySnapshot.docs[0]
              this.firebaseData = doc.data()
              commit('UPDATE_DIRECT_SALE', doc.data())
            })
  },
}

const getters = {
  directSale: state => state.directSale,
  post: state => state.post,
  id: state => state.post.id,
  directSaleId: state => state.post.directSaleId,
  directSaleName: state => state.post.directSaleName,
  description: state => state.post.description,
  image: state => state.post.image,
  image2: state => state.post.image2,
  image3: state => state.post.image3
}

const directSalePostFormModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalePostFormModule;