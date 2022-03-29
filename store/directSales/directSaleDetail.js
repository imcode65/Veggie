//直売所の詳細情報を取り扱うのに使用する
import {distanceInKmBetweenEarthCoordinates} from '~/plugins/library/distance'
import {getImageThumbnailPath, getImageThumbnailPaths} from '~/plugins/library/imageThumbnail'

import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  directSale: undefined,
  likedUsersIdList: [],
})

const state = () => ({
  directSale: undefined,
  likedUsersIdList: [],
})

const mutations = { 
  SET_DIRECT_SALE(state, directSale){
    let currentLocation = this.state.currentLocation.currentLocation
    let distance = distanceInKmBetweenEarthCoordinates(directSale.location.latitude,directSale.location.longitude,currentLocation.latitude,currentLocation.longitude)
    distance = distance.toFixed(1)
    const ds = {
        businessHours: directSale.businessHours,
        category: directSale.category,
        city: directSale.city,
        createdAt: directSale.createdAt,
        description: directSale.description,
        distanceFromCurrentLocation: distance,
        id: directSale.id,
        imageStoragePaths: directSale.imageStoragePaths,
        isCashless: directSale.isCashless,
        isPublic: directSale.isPublic,
        location: directSale.location,
        metadata: directSale.metadata,
        name: directSale.name,
        nameKana: directSale.nameKana,
        otherCityAddress: directSale.otherCityAddress,
        ownerId: directSale.ownerRef ? directSale.ownerRef.id : '',
        ownerName: directSale.ownerName ? directSale.ownerName : '',
        ownerImage: directSale.ownerImage ? directSale.ownerImage : '',
        phoneNumber: directSale.phoneNumber,
        postalCode: directSale.postalCode,
        prefecture: directSale.prefecture,
        updatedAt: directSale.updatedAt,
        url: directSale.url,
        userUploadImages: directSale.userUploadImages,
        watch_count: directSale.watch_count,
        realtimeview: directSale.realtimeview,
    }
    state.directSale = ds
  },
  SET_LIKED_USERS_ID_LIST(state, usersIdList){
    // console.log('@store/currentUser/SET_LIKED_USERS_ID_LIST')
    state.likedUsersIdList = usersIdList
  },
  RESET_STATE_DIRECTSALEDETAIL(state){
    Object.assign(state, getDefaultState())
  },
}

const actions ={
  async initializeState({commit, dispatch, state}, directSaleId){
    // firebaseのcollectionから直売所情報を取得する
    let salesRef = db.collection('directSales').doc(directSaleId)
    try {
      let doc = await salesRef.get()
      let directSale = doc.data()
      directSale.id = doc.id
      if(directSale.metadata === undefined){
        let likedUsers = await doc.ref.collection('likedUsers').get()
        directSale.metadata = { numOfLikedUsers: likedUsers.docs.length}
      }
      // ADD Watch count
      let watchCountRef = await doc.ref.collection('count').doc('watch_count').get();
  
      if (watchCountRef.data()) {
          directSale.watch_count = watchCountRef.data().count;
      } else {
          directSale.watch_count = 0;
      }
  
      if(directSale.ownerRef && directSale.ownerRef.id) {
        try {
          let user = await db.collection('users').doc(directSale.ownerRef.id).get()
          if (user.exists) {
            let data = user.data()
            directSale.ownerName = data.name ? data.name : ''
            directSale.ownerImage = data.imageStoragePath ? data.imageStoragePath : ''
          }
        } catch(error)　{
          // console.log('管理者情報を取得できませんでした')
        }
      }
      
      directSale.imageStoragePaths = getImageThumbnailPaths(directSale.imageStoragePaths)
      // console.log(directSale.ownerRef)
      commit('SET_DIRECT_SALE', directSale) 
    } catch(e) {
      // console.log(e)
    }
  },
  async increaseWatchCount({ commit, dispatch, state, rootState }, directSaleId) {
    // console.log("Increase watch count", directSaleId)
    // console.log("Uid ", rootState.currentUser.uid)
    
    let salesRef = db.collection('directSales').doc(directSaleId)
    let doc = await salesRef.get()
    
    let watchCountRef = await doc.ref.collection('count').doc('watch_count')
    let countDoc = await watchCountRef.get();
    
    if (rootState.currentUser.uid !== "") {
      let countUserRef = await countDoc.ref.collection('counts').doc(rootState.currentUser.uid)
      
      if (!(await countUserRef.get()).exists) {
        await countDoc.ref.collection('counts').doc(rootState.currentUser.uid).set({
          date: Date.now()
        })
        if (countDoc.data()) {
          watchCountRef.set({
            count: countDoc.data().count + 1
          })
        } else {
          watchCountRef.set({
            count: 1
          })
        }
      }
    }
  }
}

const getters = {
  directSale: state => state.directSale,
  likedUsersIdList: state => state.likedUsersIdList,
}

const directSalesDetailModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalesDetailModule;