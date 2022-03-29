import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  userIdToUpdate: '',
  uid: '',
  currentUser: {
    name: "",
    introduction: "",
    url:"",  
    imageStoragePath:"",
    backgroundImagePath: "",
    image: {
      file: '',
      path: '',
      blob: undefined
    },
    backImage: {
      file: '',
      path: '',
      blob: undefined
    },
  }
})

const state = () => ({
  userIdToUpdate: '',
  uid: '',
  currentUser: {
    name: "",
    introduction: "",
    url:"",  
    imageStoragePath:"",
    backgroundImagePath: "",
    image: {
      file: '',
      path: '',
      blob: undefined
    },
    backImage: {
      file: '',
      path: '',
      blob: undefined
    },
  }
})

const mutations = {
  SET_UID(state, uid) {
    state.uid = uid
  },
  UPDATE_IMAGE(state, payload){
    // payload が　''の時はイメージを削除するとき。パスを''にする
    const path = payload === '' ? '' : `users/${firebase.auth().currentUser.uid}/userProfile/iconImage/${new Date().getTime()}.jpeg`
    state.currentUser.image.file = payload
    state.currentUser.image.path = path
  },
  UPDATE_IMAGE_BLOB(state, blob){
    state.currentUser.image.blob = blob
  },
  UPDATE_BACKIMAGE(state, payload){
    // payload が　''の時はイメージを削除するとき。パスを''にする
    const path = payload === '' ? '' : `users/${firebase.auth().currentUser.uid}/userProfile/backImage/${new Date().getTime()}.jpeg`
    state.currentUser.backImage.file = payload
    state.currentUser.backImage.path = path
  },
  UPDATE_BACKIMAGE_BLOB(state, blob){
    state.currentUser.backImage.blob = blob
  },

  UPDATE_NAME(state, payload){
    state.currentUser.name = payload
  },
  UPDATE_URL(state, payload){
    state.currentUser.url = payload
  },
  UPDATE_INTRODUCTION(state, payload){
    state.currentUser.introduction = payload
  },
  RESET_STATE_UPDATEUSERPROFILE(state) {
    Object.assign(state, getDefaultState())
  },
  STATE_INITIALIZATON(state, payload){    
    const data = payload.data()
    state.userIdToUpdate = payload.id

    if(data.name == null){
      return;
    }

    // state.fields.directSale = data.directSaleなどとしてしまうと、
    // データの不整合で例えばdata.directSaleにbusinessHours属性が
    // なかったときにバグになりうるので、一つ一つ設定している
    if (data.name !== undefined){
      state.currentUser.name = data.name
    }
    if (data.url!== undefined){
      state.currentUser.url= data.url
    }
    if (data.introduction !== undefined){
      state.currentUser.introduction = data.introduction
    }
    if (data.imageStoragePath !== undefined){
       state.currentUser.image.path = data.imageStoragePath
    }
    if (data.backgroundImagePath !== undefined){
       state.currentUser.backImage.path = data.backgroundImagePath
    }
    if(data.image !== undefined){
      state.currentUser.image = data.image
    }
  }

}

const actions = {
  async initializeState({commit, state}, user){
    commit('RESET_STATE_UPDATEUSERPROFILE')
    let userRef = db.collection('users').doc(user.uid)
    let doc = await userRef.get()
    .catch(error => {
      alert('ユーザー情報を取得できませんでした')
      console.log(error)
    })

    commit('SET_UID', user.uid)
    commit('STATE_INITIALIZATON', doc)
    
  },

  async uploadImages({commit},payload){
    const file = payload.currentUser.image.file
    if (file) {
      const imageRef = firebase.storage().ref().child(payload.currentUser.image.path)    
      await imageRef.put(file)  
    }
  },

  async uploadBackImages({commit},payload){
    const file = payload.currentUser.backImage.file
    if (file) {
      const imageRef = firebase.storage().ref().child(payload.currentUser.backImage.path)    
      await imageRef.put(file)  
    }
  },

  async update({ rootState,state }) {
    const user = state.currentUser
    const ref = db.collection('users').doc(state.uid)
    await ref.set({
      name: user.name,
      url: user.url,
      introduction: user.introduction,
      imageStoragePath: state.currentUser.image.path,
      backgroundImagePath: state.currentUser.backImage.path
    })
  }
}

const getters = {
  userIdToUpdate: state => state.userIdToUpdate,
  currentUser: state => state.currentUser,
  image: state => state.currentUser.image,
  backImage: state => state.currentUser.backImage,
  name: state => state.currentUser.name,
  introduction: state => state.currentUser.introduction,
  url: state => state.currentUser.url,
}

const currentUserModule = {
  state,
  mutations,
  actions,
  getters
}

export default currentUserModule;
