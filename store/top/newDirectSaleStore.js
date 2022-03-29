import firebase from '~/plugins/firebase'
import {getImageThumbnailPath, getImageThumbnailPaths} from '~/plugins/library/imageThumbnail'

const db = firebase.firestore()

const getDefaultState = () => ({
  newDirectSaleStoreList: [],
})

const state = () => ({
  newDirectSaleStoreList: [],
})

const mutations = {
    ADD_NEW_DIRECT_SALE(state, doc) {
        const data = doc.data();
        const newlist = {
            id: doc.id || '',
            name: data.name,
            prefecture: data.prefecture,
            city: data.city,
            imageStoragePaths: getImageThumbnailPaths(data.imageStoragePaths) || [],
        }
        // console.log(newlist);
        state.newDirectSaleStoreList.push(newlist)
    },
    RESET_STATE_NEWDIRECTSALESTORE(state) {
        Object.assign(state, getDefaultState())
    }
}

const actions = {
  async initializeState({ commit, state }) {
    try{
        commit('RESET_STATE_NEWDIRECTSALESTORE')
        let ref = db.collection('directSales')
        let list = await ref.limit(5).orderBy('createdAt', 'desc').get()
        .catch(error => {
            // console.log(error)
        })
        list.docs.map(doc => {
            commit('ADD_NEW_DIRECT_SALE', doc)
        })
    }
    catch(e){
      // console.log(e);
    }
  },  
}

const getters = {
    newDirectSaleStoreList: state => state.newDirectSaleStoreList,
}

const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
