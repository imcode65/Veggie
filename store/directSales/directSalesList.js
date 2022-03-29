
//マップ表示や直売所リストを表示する際に必要なデータを取り扱う
import {distanceInKmBetweenEarthCoordinates} from '~/plugins/library/distance'
import {getImageThumbnailPaths, getImageThumbnailPath} from '~/plugins/library/imageThumbnail'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  directSales: [],
  directSalesOrdered: [],
})

const state = () => ({
  directSales: [],
  directSalesOrdered: [],
})

const mutations = { 
  ADD_DIRECT_SALE(state, directSale){
    let directSaleTemp = JSON.parse(JSON.stringify(directSale))
    const currentLocation = this.state.currentLocation.currentLocation
    let distance = '0'
    if(currentLocation.latitude !== undefined){
      distance = distanceInKmBetweenEarthCoordinates(directSaleTemp.location.latitude,directSaleTemp.location.longitude,currentLocation.latitude,currentLocation.longitude)
      distance = distance.toFixed(1)
    }
    const ds = {
      id: directSaleTemp.id,
      businessHours: directSaleTemp.businessHours,
      category: directSaleTemp.category,
      city: directSaleTemp.city,
      createdAt: directSaleTemp.createdAt,
      description: directSaleTemp.description,
      distanceFromCurrentLocation: distance,
      id: directSaleTemp.id,
      imageStoragePaths: directSaleTemp.imageStoragePaths,
      isCashless: directSaleTemp.isCashless,
      isPublic: directSaleTemp.isPublic,
      location: directSaleTemp.location,
      metadata: directSaleTemp.metadata,
      name: directSaleTemp.name,
      nameKana: directSaleTemp.nameKana,
      otherCityAddress: directSaleTemp.otherCityAddress,
      ownerId: directSaleTemp.ownerId ? directSaleTemp.ownerId : '',
      phoneNumber: directSaleTemp.phoneNumber,
      postalCode: directSaleTemp.postalCode,
      prefecture: directSaleTemp.prefecture,
      updatedAt: directSaleTemp.updatedAt,
      url: directSaleTemp.url,
      userUploadImages: directSaleTemp.userUploadImages,
      watch_count: directSaleTemp.watch_count,
      realtimeview: directSaleTemp.realtimeview,
    }
    state.directSales.push(ds)
  },
  SET_DIRECT_SALE_DISTANCE(state, directSale){
    const currentLocation = this.state.currentLocation.currentLocation
    let distance = distanceInKmBetweenEarthCoordinates(directSale.location.latitude,directSale.location.longitude,currentLocation.latitude,currentLocation.longitude)
    distance = distance.toFixed(1)
    directSale.distanceFromCurrentLocation = distance
  },
  RESET_STATE_DIRECTSALELIST(state){
    Object.assign(state, getDefaultState())
  }
}

async function countWatchCount(directSaleId) {
  // console.log('counting Timeline Liked Users');
  const directSaleRef = db.collection('directSales').doc(directSaleId)
  const watchCountRef = await directSaleRef.collection('count').doc('watch_count').get();

  if (watchCountRef.data()) {
    return watchCountRef.data().count;
  } else {
    return 0;
  }
}

const actions = {
  async initializeState({commit, state}) {
    commit("RESET_STATE_DIRECTSALELIST")
    let directSaleList = await db.collection('directSales').get();
    directSaleList.docs.forEach(async (doc) => {
      let directSale = doc.data()
      directSale.id = doc.id
      try {
        directSale.imageStoragePaths = 
        getImageThumbnailPaths(directSale.imageStoragePaths)
      } catch (e) {
        directSale.imageStoragePaths = []
      }
      if (directSale && directSale.name !== "" && !!directSale.location && !!directSale.location.latitude && !!directSale.location.latitude) {
        if (!directSale.metadata) {
          directSale.metadata = {numOfLikedUsers: 0, numOfReviews: 0}
        }

        let watch_count = await countWatchCount(doc.id);
        directSale.watch_count = watch_count;
        if (directSale.ownerRef) {
          let ownerInfo = (await directSale.ownerRef.get())
          directSale.ownerId = ownerInfo.id
        }
        commit('ADD_DIRECT_SALE', directSale)
      }
    });
  },
  // Depricated
  async initializeStateOld({commit,state}){
    commit('RESET_STATE_DIRECTSALELIST')
    const list = await db.collection('convenience').doc('directSalesMinimized').collection('directSales').get()
    list.docs.forEach(doc => {
      doc.data().directSales.forEach(ds => {
        let directSale = ds
        if(directSale.imageStoragePath !== '') directSale.imageStoragePath = getImageThumbnailPath(directSale.imageStoragePath)
        if(directSale.name !== '') commit('ADD_DIRECT_SALE', directSale)    
      })
    })
  },
  async myDirectSales({commit}) {
    const list = await db.collection('directSales').get()
    const data = list.docs.map((doc) => {
      const ownerRef = doc.data().ownerRef
      return {
        id: doc.id,
        ownerRef: ownerRef ? ownerRef.id : null
      }
    })
    return data
  },
  async setDirectSalesDistance({commit, state}){
    state.directSales.forEach(directSale => {
      commit('SET_DIRECT_SALE_DISTANCE', directSale)
    })
  }
}

const getters = {
  directSales: state => state.directSales,
}

const directSalesListModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalesListModule;