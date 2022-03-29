// 直売所登録や編集に必要なデータを取り扱う
import {InputHourType} from '~/constants/'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()



const getDefaultState = () => ({
  directSaleId: null,
  fields: {
    directSale: {
      name: '',
      nameKana: '',
      postalCode: '',
      prefecture: '',
      city: '',
      otherCityAddress: '',
      location: {},
      description: '',
      category: 'その他',
      isCashless: '不可',
      businessHours: {
        monday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
        tuesday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
        wednesday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
        thursday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
        friday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
        saturday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
        sunday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
        publicHoliday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_closed
        },
      },
      url: '',
      isPublic: '公開',
    },
    registeredUser: {
      firstName: '',
      firstNameKana: '',
      lastName: '',
      lastNameKana: '',
      phoneNumber: '',
    },
    image: {
      file: '',
      path: '',
      blob: undefined
    },
    image2: {
      file: '',
      path: '',
      blob: undefined
    },
    image3: {
      file: '',
      path: '',
      blob: undefined
    },
  }
})

const state = () => ({
  directSaleId: null,
  fields: {
    directSale: {
      name: '',
      nameKana: '',
      postalCode: '',
      prefecture: '',
      city: '',
      otherCityAddress: '',
      location: {},
      description: '',
      category: 'その他',
      isCashless: '不可',
      businessHours: {
        monday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        tuesday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        wednesday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        thursday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        friday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        saturday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        sunday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        publicHoliday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
      },
      url: '',
      isPublic: '公開',
    },
    registeredUser: {
      firstName: '',
      firstNameKana: '',
      lastName: '',
      lastNameKana: '',
      phoneNumber: '',
    },
    image: {
      file: '',
      path: '',
      blob: undefined
    },
    image2: {
      file: '',
      path: '',
      blob: undefined
    },
    image3: {
      file: '',
      path: '',
      blob: undefined
    },
  }   
})

const mutations = {
  UPDATE_LASTNAME(state, payload){
    state.fields.registeredUser.lastName = payload
  },
  UPDATE_FIRSTNAME(state, payload){
    state.fields.registeredUser.firstName = payload
  },
  UPDATE_LASTNAMEKANA(state, payload){
    state.fields.registeredUser.lastNameKana = payload
  },
  UPDATE_FIRSTNAMEKANA(state, payload){
    state.fields.registeredUser.firstNameKana = payload
  },
  UPDATE_PHONENUMBER(state, payload){
    state.fields.registeredUser.phoneNumber = payload
  },
  UPDATE_DIRECTSALE_NAME(state, payload){
    state.fields.directSale.name = payload
  },
  UPDATE_DIRECTSALE_KANA(state, payload){
    state.fields.directSale.nameKana = payload
  },
  UPDATE_DIRECTSALE_CATEGORY(state, payload){
    state.fields.directSale.category = payload
  },
  UPDATE_IMAGE(state, payload){
    // payload が　''の時はイメージを削除するとき。パスを''にする
    const path = payload === '' ? '' : `directSales/users/${firebase.auth().currentUser.uid}/images/${new Date().getTime()}.jpeg`
    state.fields.image.file = payload
    state.fields.image.path = path
  },
  UPDATE_IMAGE_BLOB(state, blob){
    state.fields.image.blob = blob
  },
  UPDATE_IMAGE_2(state, payload){
    const path = payload === '' ? '' : `directSales/users/${firebase.auth().currentUser.uid}/images/${new Date().getTime()}.jpeg`
    state.fields.image2.file = payload
    state.fields.image2.path = path
  },
  UPDATE_IMAGE_2_BLOB(state, blob){
    state.fields.image2.blob = blob
  },
  UPDATE_IMAGE_3(state, payload){
    const path = payload === '' ? '' : `directSales/users/${firebase.auth().currentUser.uid}/images/${new Date().getTime()}.jpeg`
    state.fields.image3.file = payload
    state.fields.image3.path = path
  },
  UPDATE_IMAGE_3_BLOB(state, blob){
    state.fields.image3.blob = blob
  },
  UPDATE_DIRECTSALE_DESCRIPTION(state, payload){
    state.fields.directSale.description = payload
  },
  UPDATE_DIRECTSALE_CATEGORY(state, payload){
    state.fields.directSale.category = payload
  },
  UPDATE_DIRECTSALE_IS_CASHLESS(state, payload){
    state.fields.directSale.isCashless = payload
  },
  UPDATE_DIRECTSALE_POSTALCODE(state, payload){
    state.fields.directSale.postalCode = payload
  },
  UPDATE_DIRECTSALE_PREFECTURE(state, payload){
    state.fields.directSale.prefecture = payload
  },
  UPDATE_DIRECTSALE_CITY(state, payload){
    state.fields.directSale.city = payload
  },
  UPDATE_DIRECTSALE_OTHERCITYADDRESS(state, payload){
    state.fields.directSale.otherCityAddress = payload
  },
  UPDATE_DIRECTSALE_LOCATION(state, payload){
    state.fields.directSale.location = payload
  },
  UPDATE_BUSINESS_HOURS(state, payload){
    // console.log('@store/directSales/directSaleRegistrationByUser/UPDATE_BUSINESS_HOURS')
    state.fields.directSale.businessHours = payload
  },
  UPDATE_URL(state, payload){
    state.fields.directSale.url = payload
  },
  UPDATE_DIRECTSALE_IS_PUBLIC(state, payload){
    state.fields.directSale.isPublic = payload
  },
  STATE_INITIALIZATON(state, data){    
    // console.log('@store/directSales/directSaleRegistrationByUser/STATE_INITIALIZATION')
    state.directSaleId = data.id
    const ds = {
      businessHours: data.businessHours,
      name: data.name,
      nameKana: data.nameKana,
      postalCode: data.postalCode,
      prefecture: data.prefecture,
      city: data.city,
      otherCityAddress: data.otherCityAddress,
      location: data.location,
      description: data.description,
      category: data.category || '',
      isCashless: data.isCashless || '',
      url: data.url,
    }
    state.fields.directSale = ds
    
    let ret = [];
    data?.imageStoragePaths?.map(p => { if(p !== '') ret.push(p)});
    data?.userUploadImages?.map(item => { if(!item.deleted && item.imageStoragePath) ret.push(item.imageStoragePath)});
    state.fields.image.path = ret[0] || ''
    state.fields.image2.path = ret[1] || ''
    state.fields.image3.path= ret[2] || ''
  },
  RESET_STATE_DIRECTSALEREGISTRATION(state){
    Object.assign(state, getDefaultState())
  }
}

const actions ={
  async registerDirectSaleWithTrigger({commit, dispatch, state, rootState}) {
    // console.log('directSaleRegistrationByUser/registerDirectSaleWithTrigger');
    const { serverTimestamp } = firebase.firestore.FieldValue
    let directSale = JSON.parse(JSON.stringify(state.fields.directSale))
    // console.log(directSale)
    Object.assign(directSale, { 
      imageStoragePaths: [
        state.fields.image.path,
        state.fields.image2.path,
        state.fields.image3.path,
      ],
      phoneNumber: state.fields.registeredUser.phoneNumber,
      ownerRef: db.collection('users').doc(rootState.currentUser.uid),
      updatedAt: serverTimestamp()
    })
    let registeredUser = state.fields.registeredUser
    let registrationRef = db.collection('directSaleRegistrations')
    return await registrationRef.doc(db.collection('directSales').doc().id).set({
      directSale: directSale,
      registeredUser: registeredUser,
      location: rootState.currentLocation.currentLocation,
      ownerRef: db.collection('users').doc(firebase.auth().currentUser.uid),
    })
  },
  // Deprecated
  async registerInfo({commit, dispatch, state, rootState}){
    const { serverTimestamp } = firebase.firestore.FieldValue
    let directSale = JSON.parse(JSON.stringify(state.fields.directSale))
    Object.assign(directSale, { 
      imageStoragePaths: [
        state.fields.image.path,
        state.fields.image2.path,
        state.fields.image3.path,
      ],
      phoneNumber: state.fields.registeredUser.phoneNumber,
      ownerRef: db.collection('users').doc(rootState.currentUser.uid),
      updatedAt: serverTimestamp()
    })
    let registeredUser = state.fields.registeredUser
    let registrationRef = db.collection('directSaleRegistrations')

    return await registrationRef.doc(db.collection('directSales').doc().id).set({
      directSale: directSale,
      registeredUser: registeredUser,
      location: rootState.currentLocation.currentLocation,  
      ownerRef: db.collection('users').doc(firebase.auth().currentUser.uid),
    })
  },
  // Not use
  async updateDirectSaleWithTrigger({commit, dispatch, state, rootState}){
    // console.log('directSaleRegistrationByUser/updateDirectSaleWithTrigger');
    const { serverTimestamp } = firebase.firestore.FieldValue
    let directSale = JSON.parse(JSON.stringify(state.fields.directSale))
    Object.assign(directSale, { 
      businessHours: state.fields.directSale.businessHours,
      name: state.fields.directSale.name,
      nameKana: state.fields.directSale.nameKana,
      postalCode: state.fields.directSale.postalCode,
      prefecture: state.fields.directSale.prefecture,
      city: state.fields.directSale.city,
      otherCityAddress: state.fields.directSale.otherCityAddress,
      location: state.fields.directSale.location,
      description: state.fields.directSale.description,
      category: state.fields.directSale.category,
      isCashless: state.fields.directSale.isCashless,
      url: state.fields.directSale.url,
      imageStoragePaths: [state.fields.image.path, state.fields.image2.path, state.fields.image3.path],
      updatedAt: serverTimestamp(),
      ownerRef: db.collection('users').doc(rootState.currentUser.uid),
    })
    let directSaleRegistrationRef = db.collection('directSaleRegistrations').doc(state.directSaleId)

    return await directSaleRegistrationRef.update({
      directSale: directSale,
      imageStoragePaths: [
        state.fields.image.path,
        state.fields.image2.path,
        state.fields.image3.path,
      ],
      location: rootState.currentLocation.currentLocation,  
      registerdUser: state.fields.registeredUser,
      ownerRef: db.collection('users').doc(firebase.auth().currentUser.uid),
      updatedAt: serverTimestamp()
    })
  },
  async updateInfo({commit, dispatch, state}){
    // console.log('directSaleRegistrationByUser/updateInfo');
    const { serverTimestamp } = firebase.firestore.FieldValue
    let directSale = JSON.parse(JSON.stringify(state.fields.directSale))
    Object.assign(directSale, {
      imageStoragePaths: [
        state.fields.image.path,
        state.fields.image2.path,
        state.fields.image3.path,
      ],
      updatedAt: serverTimestamp()
    })
    let directSaleRef = db.collection('directSales').doc(state.directSaleId)
    return await directSaleRef.update({
      businessHours: state.fields.directSale.businessHours,
      name: state.fields.directSale.name || "",
      nameKana: state.fields.directSale.nameKana || "",
      postalCode: state.fields.directSale.postalCode,
      prefecture: state.fields.directSale.prefecture,
      city: state.fields.directSale.city || "",
      otherCityAddress: state.fields.directSale.otherCityAddress,
      location: state.fields.directSale.location,
      description: state.fields.directSale.description || "",
      category: state.fields.directSale.category,
      isCashless: state.fields.directSale.isCashless,
      url: state.fields.directSale.url,
      imageStoragePaths: [state.fields.image.path, state.fields.image2.path, state.fields.image3.path],
      // ownerRef: state.fields.directSale.ownerRef,
    })
    
  },
  async uploadImages({commit, state}){
    const file = state.fields.image.file
    const file2 = state.fields.image2.file
    const file3 = state.fields.image3.file
    if (file) {
      const imageRef = firebase.storage().ref().child(state.fields.image.path)    
      await imageRef.put(file)  
    }
    if (file2) {
      const imageRef = firebase.storage().ref().child(state.fields.image2.path)
      await imageRef.put(file2)
    }
    if (file3) {
      const imageRef = firebase.storage().ref().child(state.fields.image3.path)
      await imageRef.put(file3)
    }
  },
  async initializeStateForRegister({commit}){
    commit('RESET_STATE_DIRECTSALEREGISTRATION')
  },
  async initializeStateForUpdate({commit,state}, directSaleId){
    // console.log("directSaleId: ", directSaleId)
    let salesRef = db.collection('directSales').doc(directSaleId)
    await salesRef.get()
    .then(response => {   
      //ユーザーが直売所を登録していなかったら、直売所情報を取得する必要なし  
      if(response.empty){
        return false
      }
      let data = response.data()
      Object.assign(data, {id: response.id})
      commit('STATE_INITIALIZATON', data)
    })
    .catch((error) => {
      // console.log(error)
      // alert('データを取得できませんでした。お手数ですが、時間を空けて再度お願いします。')
      // this.$router.push('/mypage/')
    })
  },
}

const getters = {
  directSaleId: state => state.directSaleId,
  directSale: state => state.fields.directSale,
  lastName: state => state.fields.registeredUser.lastName,
  firstName: state => state.fields.registeredUser.firstName,
  lastNameKana: state => state.fields.registeredUser.lastNameKana,
  firstNameKana: state => state.fields.registeredUser.firstNameKana,
  phoneNumber: state => state.fields.registeredUser.phoneNumber,
  directSalesName: state => state.fields.directSale.name,
  directSalesKana: state => state.fields.directSale.nameKana,
  category: state => state.fields.directSale.category,
  description: state => state.fields.directSale.description,
  isCashless: state => state.fields.directSale.isCashless,
  businessHours: state => state.fields.directSale.businessHours,
  url: state => state.fields.directSale.url,
  isPublic: state => state.fields.directSale.isPublic,
  postalCode: state => state.fields.directSale.postalCode,
  prefecture: state => state.fields.directSale.prefecture,
  city: state => state.fields.directSale.city,
  otherCityAddress: state => state.fields.directSale.otherCityAddress,
  address: state => state.fields.directSale.prefecture + state.fields.directSale.city + state.fields.directSale.otherCityAddress,
  location: state => state.fields.directSale.location,
  image: state => state.fields.image,
  image2: state => state.fields.image2,
  image3: state => state.fields.image3,
  fields: state => state.fields,
}

const directSaleRegistrationByUserModule = {
  state,
  mutations,
  actions,
  getters
}

export default directSaleRegistrationByUserModule;