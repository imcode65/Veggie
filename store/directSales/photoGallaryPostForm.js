import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  post: {
    id: '',
    directSaleId: '',
    image: {
      file: '',
      path: '',
      blob: ''
    },
  }
})

const state = () => ({
  post: {
    id: '',
    directSaleId: '',
    image: {
      file: '',
      path: '',
      blob: ''
    },
  }
})

const mutations = {
  UPDATE_ID(state, payload) {
    state.post.id = payload
  },
  UPDATE_DIRECT_SALE_ID(state, payload) {
    state.post.directSaleId = payload
  },
  UPDATE_IMAGE(state, payload) {
    const path = payload === '' ? '' : `images/users/${firebase.auth().currentUser.uid}/photoGallaryPosts/${new Date().getTime()}.jpeg`
    state.post.image.file = payload
    state.post.image.path = path
  },
  UPDATE_IMAGE_BLOB(state, blob) {
    state.post.image.blob = blob
  },
  RESET_STATE_PHOTOGALLARYPOST(state) {
    Object.assign(state, getDefaultState())
  },
}

const actions = {
  async sendPost({ commit, state }) {
    if (!state.post?.image?.file) return

    let postRef = db.collection('userUploadImageRegistrations')
    const { serverTimestamp } = firebase.firestore.FieldValue
    await postRef.add({
      directSaleId: state.post.directSaleId,
      uid: firebase.auth().currentUser.uid,
      imageStoragePath: [
        state.post.image.path,
      ],
      deleted: false,
      reportedUserIds: [],
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    })
    commit('RESET_STATE_PHOTOGALLARYPOST')
  },
  async deletePost({ commit }, image) {
    const ref = db.collection('userUploadImageRegistrations').doc(image.userUploadImageRegistrationId)
    const { serverTimestamp } = firebase.firestore.FieldValue
    await ref.set({
      deleted: true,
      updatedAt: serverTimestamp(),
    }, { merge: true })
  },
  async reportPost({ commit }, image) {
    const auth = firebase.auth();
    auth.onAuthStateChanged(async user => {
      // console.log(JSON.stringify(image))
      if (user) {
        const ref = db.collection('userUploadImageRegistrations').doc(image.userUploadImageRegistrationId)
        const { serverTimestamp } = firebase.firestore.FieldValue
        const doc = await ref.get()
        const registration = doc.data()

        if (!registration.reportedUserIds) {
          registration.reportedUserIds = []
        }
        if (!registration.reportedUserIds.includes(user.uid)) {
          registration.reportedUserIds.push(user.uid)
        } else {
          registration.reportedUserIds.splice(registration.reportedUserIds.indexOf(user.uid), 1)
        }
        ref.set({
          reportedUserIds: registration.reportedUserIds,
          updatedAt: serverTimestamp(),
        }, { merge: true })
      }
    });
  },
  async uploadImages({ commit, state }) {
    const file = state.post.image.file
    if (file) {
      const imageRef = firebase.storage().ref().child(state.post.image.path)
      await imageRef.put(file)
    }
  },
}

const getters = {
  image: state => state.post.image,
}

const directSalePostFormModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalePostFormModule;