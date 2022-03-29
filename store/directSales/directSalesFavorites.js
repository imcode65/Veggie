// mypage/favorite/にてお気に入り直売所を表示するためのファイル
// directSalesListに含めるか迷った
import { distanceInKmBetweenEarthCoordinates } from '~/plugins/library/distance'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const getDefaultState = () => ({
  directSalesFavorites: [],
})

const state = () => ({
  directSalesFavorites: [],
})

const mutations = { 
  ADD_DIRECT_SALE_FAVORITE(state, directSale){
    let currentLocation = this.state.currentLocation.currentLocation
    let distance = distanceInKmBetweenEarthCoordinates(directSale.location.latitude,directSale.location.longitude,currentLocation.latitude,currentLocation.longitude)
    distance = distance.toFixed(1)
    directSale.distanceFromCurrentLocation = distance

    let ds = JSON.parse(JSON.stringify(directSale))
    state.directSalesFavorites.push(ds)
  },
  RESET_STATE_DIRECTSALEFAVORITE(state){
    Object.assign(state, getDefaultState())
  }
}
const actions ={
  async initializeState({ commit, state, rootState}){
    // console.log('directSales/directSalesList/initializeState')
    commit('RESET_STATE_DIRECTSALEFAVORITE')
    // firebaseのcollectionから直売所情報を取得する
    const favoriteSalesList = rootState.currentUser.favoritedDirectSalesIdList
    let salesRef = db.collection('directSales')

    let list = await salesRef.get()
    .catch(error => {
      // console.log(error)
    })
    list.docs.map(async doc => {
      if(favoriteSalesList.includes(doc.id)){
        let directSale = doc.data()
        directSale.id = doc.id
        commit('ADD_DIRECT_SALE_FAVORITE', directSale)
      }
    })
  },

}

const getters = {
  directSales: state => state.directSalesFavorites,
}

const directSalesListModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSalesListModule;