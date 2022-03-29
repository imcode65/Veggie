import firebase from '~/plugins/firebase'

const db = firebase.firestore()

const getDefaultState = () => ({
  id: db.collection('reviews').doc().id,
  // id: '',
  directSaleId: '',
  userId: '',
  content: '',
  createdAt: '',
  image: {
    file: '',
    path: '',
    blob: '',
    updated: true,
  },
  image2: {
    file: '',
    path: '',
    blob: '',
    updated: true,
  },
  image3: {
    file: '',
    path: '',
    blob: '',
    updated: true,
  },
})

const state = () => ({
  id: db.collection('reviews').doc().id,
  // id: '',
  directSaleId: '',
  userId: '',
  content: '',
  createdAt: '',
  image: {
    file: '',
    path: '',
    blob: '',
    updated: true,
  },
  image2: {
    file: '',
    path: '',
    blob: '',
    updated: true,
  },
  image3: {
    file: '',
    path: '',
    blob: '',
    updated: true,
  },
})

const mutations = {
  UPDATE_DIRECTSALE_ID(state, payload) {
    state.directSaleId = payload
  },
  UPDATE_CONTENT(state, payload) {
    state.content = payload
  },
  UPDATE_IMAGE_PATH(state, { timestamp }) {
    state.image.path = timestamp != '' ? `reviews/${state.id}/images/${timestamp}_0.jpeg` : ''
  },
  UPDATE_IMAGE(state, payload) {
    state.image.file = payload
  },
  UPDATE_IMAGE_BLOB(state, blob) {
    state.image.blob = blob
  },
  IS_UPDATED_IMAGE(state, bool) {
    state.image.updated = bool
  },
  UPDATE_IMAGE_2_PATH(state, { timestamp }) {
    state.image2.path = timestamp != '' ? `reviews/${state.id}/images/${timestamp}_1.jpeg` : ''
  },
  UPDATE_IMAGE_2(state, payload) {
    state.image2.file = payload
  },
  UPDATE_IMAGE_2_BLOB(state, blob) {
    state.image2.blob = blob
  },
  IS_UPDATED_IMAGE_2(state, bool) {
    state.image2.updated = bool
  },
  UPDATE_IMAGE_3_PATH(state, { timestamp }) {
    state.image3.path = timestamp != '' ? `reviews/${state.id}/images/${timestamp}_2.jpeg` : ''
  },
  UPDATE_IMAGE_3(state, payload) {
    state.image3.file = payload
  },
  UPDATE_IMAGE_3_BLOB(state, blob) {
    state.image3.blob = blob
  },
  IS_UPDATED_IMAGE_3(state, bool) {
    state.image3.updated = bool
  },
  STATE_INITIALIZATION_FOR_UPDATE(state, payload) {
    // console.log('STATE_INITIALIZATION_FOR_UPDATE start')
    state.id = payload.id
    if(payload.directSaleId) state.directSaleId = payload.directSaleId 
    state.userId = payload.userId
    state.content = payload.content
    state.createdAt = payload.createdAt
    if (payload.imageStoragePaths.length > 0) {
      state.image.path = payload.imageStoragePaths[0]
      state.image.updated = true
    }
    if (payload.imageStoragePaths.length > 1) {
      state.image2.path = payload.imageStoragePaths[1]
      state.image2.updated = true
    }
    if (payload.imageStoragePaths.length > 2) {
      state.image3.path = payload.imageStoragePaths[2]
      state.image3.updated = true
    }
    // console.log('STATE_INITIALIZATION_FOR_UPDATEED: ' + JSON.stringify(state))
  },
  RESET_STATE_DIRECTSALEREVIEWPOST(state) {
    Object.assign(state, getDefaultState())
  },
}

const actions = {
  async sendPost({ commit, state, rootState }) {
    // console.log('@store/posts/directSaleReviewPostForm/sendPost')
    if (!state.image.updated || !state.image2.updated || !state.image3.updated) {
      // console.log(`image updated status: ${state.image.updated}, ${state.image2.updated}, ${state.image3.updated}`)
      return
    }
    const ref = db.collection('reviews')
    const userId = firebase.auth().currentUser.uid
    const { serverTimestamp } = firebase.firestore.FieldValue

    const imageStoragePaths = []
    if (state.image.path) imageStoragePaths.push(state.image.path)
    if (state.image2.path) imageStoragePaths.push(state.image2.path)
    if (state.image3.path) imageStoragePaths.push(state.image3.path)

    await ref.doc(state.id).set({
      userRef: await db.collection('users').doc(firebase.auth().currentUser.uid),
      userId,
      directSaleRef: db.collection('directSales').doc(state.directSaleId),
      content: state.content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      imageStoragePaths
    },{merge: true}).then(res => {
      // console.log('successfully sent post');
      setTimeout(() => {
        location.reload();
      }, 3000)
    })
  },
  async deletePost({commit}, post){
    try{
      const doc = await db.collection('reviews').doc(post.id).get()
      await doc.ref.delete()
    }
    catch(e){
      // console.log(e);
    }

  },
  async uploadImages({ commit, dispatch, state }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).substr(-2)
    const day = ("0" + date.getDate()).substr(-2)
    const hours = ("0" + date.getHours()).substr(-2)
    const minutes = ("0" + date.getMinutes()).substr(-2)
    const seconds = ("0" + date.getSeconds()).substr(-2)
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`

    const file = state.image.file
    const file2 = state.image2.file
    const file3 = state.image3.file

    if (file || file2 || file3) {
      const fileUploadProcess = (f, i) => {
        commit(`IS_UPDATED_IMAGE${i == 1 ? '' : '_' + i}`, false)
        commit(`UPDATE_IMAGE${i == 1 ? '' : '_' + i}_PATH`, { timestamp })
        const imageRef = firebase.storage().ref().child(state[`image${i == 1 ? '' : String(i)}`].path)

        const uploadTask = imageRef.put(f)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                // console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                // console.log('Upload is running');
                break;
            }
          }, function (error) {
            // console.log(error)

          }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
              // console.log('File available at', downloadURL);
              // console.log("画像登録に成功しました");

              commit(`IS_UPDATED_IMAGE${i == 1 ? '' : '_' + i}`, true)

              await dispatch("sendPost");
            });
          });
      }

      if (file) fileUploadProcess(file, 1)
      if (file2) fileUploadProcess(file2, 2)
      if (file3) fileUploadProcess(file3, 3)
    } else {
      // 画像がなかったら投稿処理実施
      await dispatch("sendPost");
    }
  },
}

const getters = {
  id: state => state.id,
  userId: state => state.userId,
  content: state => state.content,
  comments: state => state.comments,
  createdAt: state => state.createdAt,
  image: state => state.image,
  image2: state => state.image2,
  image3: state => state.image3
}

const directSalePostFormModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalePostFormModule;