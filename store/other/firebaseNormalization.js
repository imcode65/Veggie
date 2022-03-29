import firebase from '~/plugins/firebase'
import { API_KEY } from '~/constants/'
const db = firebase.firestore()
const getDefaultState = () => ({})

const state = () => ({})

const getters = {
}

const actions = {
  // DM コレクションのデータ構成を修正する
  async normalizeDMDoc({state}){
    const dmCollection = await db.collection('DM').get()
    dmCollection.docs.forEach(async doc => {
      // console.log(doc);
      // create lastMessage and lastSent field
      const numOfMessages = (await doc.ref.collection('message').get())?.docs.length
      // console.log('numOfMessages', numOfMessages);

      doc.ref.set({
        numOfMessages: numOfMessages || 0
      }, {merge: true})     

      const lastMessage = await doc.ref.collection('message').orderBy('date', 'desc').limit(1).get()
      doc.ref.set({
        // lastSent が''だとiOS側で一覧取得する際に不具合が生じる
        lastSent: lastMessage?.docs[0]?.data()?.date || firebase.firestore.FieldValue.delete(),
        lastMessage: lastMessage?.docs[0]?.data()?.text || '',
        lastSenderId: lastMessage?.docs[0]?.data()?.senderId || '',
        lastMessageRead: lastMessage?.docs[0]?.data()?.read || true,
      }, {merge: true})

      // 複合インデックスの作成
      const dmCompoundId = doc.data().userIds[0] + doc.data().userIds[1] 
      await doc.ref.set({
        dmCompoundId: dmCompoundId ?? '',
      }, {merge: true})

      const message = await doc.ref.collection('message').get()
      if (!message.docs.length) doc.ref.delete()
    })
  },
  async normalizeDMMessage({state}){
    const dmCollection = await db.collection('DM').get()
    dmCollection.docs.forEach(async doc => {
      // console.log(doc);
      const messages = await doc.ref.collection('message').get()
      messages.forEach(message => {
        message.ref.set({
          id: message.id
        }, {merge: true})
      })
    })
  },
  async normalizeUser(){
    const collection = await db.collection('users').get()
    let count = 0

    collection.docs.forEach(async doc => {
      if(doc.data().metadata == undefined || doc.data().metadata?.numOfVisitedDirectSales == undefined){
        const numOfVisitedDirectSales = (await doc.ref.collection('visitedDirectSales').get()).docs.length
        doc.ref.set({
          metadata: {
            numOfVisitedDirectSales
          }
        }, {merge: true})
        count++
      }
    })
    // console.log('count', count);

  },
  async normalizeDirectSale(){
    const collection = await db.collection('directSales').get()
    // let count = 0

    collection.docs.forEach(async doc => {
      // const ownerRef = doc.data().ownerRef
      // if (ownerRef && ownerRef.id == VEGGIE_OWNER_ID) {
      //   count ++
      // }
      if (doc.data().location == null || doc.data().location?.latitude == '') {
        const address =  doc.data().prefecture + doc.data().city + doc.data().otherCityAddress
        const response = await getLocationFromAddress(this, address)
        let location = {}
        location.latitude = response.results[0].geometry.location.lat
        location.longitude = response.results[0].geometry.location.lng
        doc.ref.set({
          location: location
        }, { merge: true })
      }
      const metadata = doc.data().metadata
      if (metadata.numOfReviews == undefined ) {
        const response = await db.collection('reviews').where('directSaleId', '==', doc.id).get()
        const numOfReviews = response.docs.length
        doc.ref.set({
          metadata: {
            numOfReviews
          }
        }, { merge: true })
      }
    })
  },
  async normalizeDirectSaleRegistrations() {
    const collection = await db.collection('directSaleRegistrations').get()
    let count = 0
    collection.docs.forEach(async doc => {
      if(doc.data().directSale?.location == undefined || doc.data().directSale?.location?.latitude == ''||doc.data().directSale?.location?.latitude == 36.12707109999999){
        const address =  doc.data().directSale?.prefecture + doc.data().directSale?.city + doc.data().directSale?.otherCityAddress
        const response = await getLocationFromAddress(this, address)
        let location = {}
        location.latitude = response.results[0].geometry.location.lat
        location.longitude = response.results[0].geometry.location.lng
        doc.ref.update({
          'directSale.location': location,
        })
        count++
      }
    })
  },
  async normalizeTimeline({state}) {
    const collection = await db.collection('timeline').get()
    collection.docs.forEach(async doc => {
      if(!doc.data().metadata) {
        doc.ref.set({
          metadata: {
            numOfLikedUsers: 0
          },
        }, { merge: true })
      }
    })
  },
  async normalizeDirectSaleReview({state}) {
    const collection = await db.collection('directSales').get()
    collection.docs.forEach(async doc => {
      const c = await doc.ref.collection('reviews').get()
      c.docs.forEach(async review => {
        const userId = (await review.data().userRef.get()).id
        const directSaleId = doc.id
        review.ref.set({
          id: review.id,
          directSaleId: directSaleId,
          userId
        }, { merge: true })
        if(!review.data().metadata) {
          review.ref.set({
            metadata: {
              numOfLikedUsers:  0
            },
          }, { merge: true })
        }
      })
    })
  },
  async updateUserUploadImageRegistrations({state}) {
    const doc = await db.collection('userUploadImageRegistrations').doc('1sg2bFt9ZCRz5NJ057Qr').get()
    await doc.ref.set({
      updated: true
    }, { merge: true }).then(response => {
    }).catch(e => {
      // console.log(e);
    })
  },

  async normalizeReview({state}) {
    const collection = await db.collection('reviews').get()
    collection.docs.forEach(async doc => {
      const userId = (await doc.data().userRef.get()).id
      const directSaleId = doc.data().directSaleRef.id
      doc.ref.set({
        id: doc.id,
        directSaleId: directSaleId,
        userId
      }, { merge: true })
      if(!doc.data().metadata) {
        doc.ref.set({
          metadata: {
            numOfLikedUsers:  0
          },
        }, { merge: true })
      }
    })
  },

  async updateConvenienceDirectSalesMinimized({state}) {
    // console.log('updateDirectSale0000List01Doc');
    const collection = await db.collection('directSales').get()
    let docContent = []
    let docContent2 = []
    let docContent3 = []
    let docContent4 = []
    let docContent5 = []
    let docContent6 = []
    let directSaleIdList = []
    let directSaleIdList2 = []
    let directSaleIdList3 = []
    let directSaleIdList4 = []
    let directSaleIdList5 = []
    let directSaleIdList6 = []
    collection.docs.forEach(doc => {
      const data = doc.data()
      const docToInsert = {
        id: doc.id,
        name: data.name || '',
        category: data.category || '',
        imageStoragePath: data.imageStoragePaths.length > 0 && data.imageStoragePaths[0] !== '' 
                        ? data.imageStoragePaths[0] 
                        : data.userUploadImages?.find(image => image.deleted == false)
                        ? data.userUploadImages?.find(image => image.deleted == false).imageStoragePath
                        : '',
        location: data.location,
        metadata: data.metadata || '',
        prefecture: data.prefecture || '',
        city: data.city || '',
        otherCityAddress: data.otherCityAddress || '',
      }
      const docMaxLength = 500
      docContent.length < docMaxLength ? docContent.push(docToInsert)
      : docContent2.length < docMaxLength ? docContent2.push(docToInsert)
      : docContent3.length < docMaxLength ? docContent3.push(docToInsert)
      : docContent4.length < docMaxLength ? docContent4.push(docToInsert)
      : docContent5.length < docMaxLength ? docContent5.push(docToInsert)
      : docContent6.push(docToInsert)

      directSaleIdList.length < docMaxLength ? directSaleIdList.push(doc.id)
      : directSaleIdList2.length < docMaxLength ? directSaleIdList2.push(doc.id)
      : directSaleIdList3.length < docMaxLength ? directSaleIdList3.push(doc.id)
      : directSaleIdList4.length < docMaxLength ? directSaleIdList4.push(doc.id)
      : directSaleIdList5.length < docMaxLength ? directSaleIdList5.push(doc.id)
      : directSaleIdList6.push(doc.id)
    })
    await db.collection('convenience').doc('directSalesMinimized').collection('directSales').doc('01').set({
      directSaleIdList,
      directSales: docContent
    })
    await db.collection('convenience').doc('directSalesMinimized').collection('directSales').doc('02').set({
      directSaleIdList: directSaleIdList2,
      directSales: docContent2
    })
    await db.collection('convenience').doc('directSalesMinimized').collection('directSales').doc('03').set({
      directSaleIdList: directSaleIdList3,
      directSales: docContent3
    })
    await db.collection('convenience').doc('directSalesMinimized').collection('directSales').doc('04').set({
      directSaleIdList: directSaleIdList4,
      directSales: docContent4
    })
    await db.collection('convenience').doc('directSalesMinimized').collection('directSales').doc('05').set({
      directSaleIdList: directSaleIdList5,
      directSales: docContent5
    })
    await db.collection('convenience').doc('directSalesMinimized').collection('directSales').doc('06').set({
      directSaleIdList: directSaleIdList6,
      directSales: docContent6
    })
  },

  async log({state}) {
    db.collection('directSales')
      .get()
      .then(response => {
        const routes = response.docs.map(doc => {
          return `/directSales/${doc.id}`
        })
      })
  }
}

async function getLocationFromAddress(context, address) {
  return await context.$axios.$get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
}

const mutations = {
  RESET_STATE_FIREBASENORMALIZATION(state) {
    Object.assign(state, getDefaultState())
  },
}


const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;
