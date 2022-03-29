//直売所の詳細情報を取り扱うのに使用する
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'
import {distanceInKmBetweenEarthCoordinates} from '~/plugins/library/distance'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()

const status = {
  pending: "pending",
  complete: "complete",
  failed01: "failed01",
  failed02: "failed02"
}

const getDefaultState = () => ({
  pointTotal: 0,
  monthlyRankedInUsers: [],
  totalRankedInUsers: [],
  visitedDirectSales: [],
  pointHistory: [],
  requests: []
})

const state = () => ({
  pointTotal: 0,
  monthlyRankedInUsers: [],
  totalRankedInUsers: [],
  visitedDirectSales: [],
  pointHistory: [],
  requests: [],
  allrequests: [],
  loading: false,
})

const mutations = { 
  SET_POINT_TOTAL(state,  point ){
    state.pointTotal = point
  },
  ADD_TOTAL_RANKEDIN_USER(state, { user }){
    state.totalRankedInUsers.push(JSON.parse(JSON.stringify(user)))
  },
  ADD_VISITED_DIRECTSALE(state, { directSale }){
    state.visitedDirectSales.push(JSON.parse(JSON.stringify(directSale)))
  },
  ADD_POINT_HISTORY(state, history){
    state.pointHistory.push(JSON.parse(JSON.stringify(history)))
  },
  RESET_TOTAL_RANKEDIN_USER(state){
    state.totalRankedInUsers.length = 0
  },
  RESET_VISITED_DIRECTSALE(state){
    state.visitedDirectSales.length = 0
  },
  RESET_POINT_HISTORY(state){
    state.pointHistory.length = 0
  },
  RESET_STATE_POINT(state){
    Object.assign(state, getDefaultState())
  },
  ADD_REQUESTS(state, payload) {
    let filtered = payload.filter(request => state.requests.map(({requestId}) => requestId).indexOf(request.requestId) < 0)
    state.requests = [...state.requests, ...filtered]
  },
  ADD_ALL_REQUESTS(state, payload) {
    let filtered = payload.filter(request => state.allrequests.map(({requestId}) => requestId).indexOf(request.requestId) < 0)
    state.allrequests = [...state.allrequests, ...filtered]
  },
  REMOVE_REQUESTS(state, payload) {
    state.requests = state.requests.filter(request => !(request.requestId === payload.requestId))
    state.allrequests = state.allrequests.filter(request => !(request.requestId === payload.requestId))
  },
  UPDATE_REQUESTS(state, payload) {
    state.requests = state.requests.map(request => (request.requestId === payload.requestId && request.uid === payload.uid) ? ({...request, status: payload.status}) : request)
    state.allrequests = state.allrequests.map(request => (request.requestId === payload.requestId && request.uid === payload.uid) ? ({...request, status: payload.status}) : request)
  },
  RESET_REQUESTS(state){
    state.requests = []
  },
  SET_LOADING(state, payload) {
    state.loading = payload.loading;
  }
}

const actions ={
  async initializePointTotal ({commit, rootState}){
    // console.log('point/initilaizePointTotal')
    if (rootState.currentUser && rootState.currentUser.uid) {
      const uid = rootState.currentUser.uid
      db.collection('points').doc(uid).get()
        .then(doc => {
          commit('SET_POINT_TOTAL', (doc && doc.data() && doc.data().points) ? doc.data().points : 0 )
        }).catch(e => {
          // console.log(e.message)
        })
    } else {
      
    }
  },
  async initializeTotalRankedInUsers({commit, state, dispatch}){
    // console.log('point/initializeState')
    commit('RESET_TOTAL_RANKEDIN_USER')
    db.collection('points').limit(20).orderBy('points', 'desc').get()
      .then(res => {
        res.docs.forEach(pointDoc => {
          db.collection('users').doc(pointDoc.id).get()
            .then(userDoc => {
              const user = Object.assign(userDoc.data(), { points: pointDoc.data().points, id: userDoc.id})
              commit('ADD_TOTAL_RANKEDIN_USER', { user })
            })
        })
      })
  },
  async initializeVisitedDirectSales ({commit, state, dispatch, rootState}){
    // console.log('point/initializeVisitedDirectSales')
    commit('RESET_VISITED_DIRECTSALE')
    const uid = rootState.currentUser.uid
    let directSales = []
    const res = await db.collection('users').doc(uid).collection('visitedDirectSales').get()
    let promises = []
    res.docs.forEach(doc => {
      const promise = db.collection('directSales').doc(doc.id).get()
                        .then(directSaleDoc => {
                          const directSale = Object.assign(directSaleDoc.data(), { id: doc.id, lastDate: doc.data().lastDate })
                          directSales.push(JSON.parse(JSON.stringify(directSale)))
                        })
      promises.push(promise)
    })
    await Promise.all(promises)
    // 訪れた日付順に新しい方から並び替え
    const directSalesOrdered = directSales.sort((a, b) =>
      b.lastDate.seconds - a.lastDate.seconds
    );
    directSalesOrdered.forEach(directSale => {
      commit('ADD_VISITED_DIRECTSALE', { directSale })
    })
  },
  async initializePointHistory ({commit, state, rootState}){
    // console.log('point/initializePointHistory');
    commit('RESET_POINT_HISTORY')
    const uid = rootState.currentUser.uid
    db.collection('points').doc(uid).collection('monthly').orderBy('createdAt', 'desc').limit(3).get()
      .then(res => {
        res.docs.forEach(doc => {
          doc.data().rireki.slice().reverse().forEach(rireki => {
            commit('ADD_POINT_HISTORY', rireki)
          })
        })
      })
  },
  async checkIfUserIsWithinDistance({ dispatch }, directSale){
    try{
      const res = await dispatch('currentLocation/updateCurrentLocation', null, {root:true})
      let currentLocation = this.state.currentLocation.currentLocation
      let distance = distanceInKmBetweenEarthCoordinates(directSale.location.latitude,directSale.location.longitude,currentLocation.latitude,currentLocation.longitude)
      distance = distance.toFixed(3)
      if(distance < 0.1){
        return true
      }
      return false
    }
    catch(e){
      // console.log(e);
      alert('データの取得に失敗しました。お手数ですが、時間を開けて再度お試しください。')
      return false
    }
  },
  async checkIfUserCheckedInToday({ commit, state, rootState }, directSaleId){
    try{
      const uid = rootState.currentUser.uid
      const doc = await db.collection('users').doc(uid).collection('visitedDirectSales').doc(directSaleId).get()
      // ドキュメントが存在しない場合は初チェックインだからOK
      if(!doc.exists){
        return true
      }
      const now = new Date()
      const year  = now.getFullYear()
      const m = now.getMonth() + 1
      const date = now.getDate()
      const today = `${year}年${m}月${date}日`
      // console.log('today', today);
      const lastVisited = doc.data().lastDate
      const lastDate = getDateTimeFromTimeStamp(lastVisited, {noHour:true})
      // console.log(lastDate);
      return today !== lastDate
    }
    catch(e){
      // console.log(e);
      alert('データの取得に失敗しました。お手数ですが、時間を開けて再度お試しください。')
    }

  },
  async getPointForCheckInDirectSale({ commit, state, rootState }, directSaleId) {
    try{
      // ユーザのポイント管理ドキュメントが存在している場合、これまでのトータル取得ポイントを取得。
      //　存在していない場合は、トータル取得ポイントを０として新規作成
      const uid = rootState.currentUser.uid
      const pointDoc = await getPointDoc(uid)
      // ユーザーのポイント管理ドキュメント下の
      // monthlyコレクションを取得
      const now = new Date()
      const year  = now.getFullYear()
      const m = now.getMonth() + 1
      const month = (m < 10 ? '0' : '') + m
      // console.log('year-month', `${year}-${month}`);
      const docId = `${year}-${month}`
      const monthlyDoc = await db.collection('points').doc(uid)
                                  .collection('monthly').doc(docId)
                                  .get()
                                  
      // 初回チェックイン時は５００ポイント。そうでない場合は１０ポイント。判断する
      const pointThisTime = await getCheckInDetail(uid, directSaleId)
      updateMonthlyDoc(monthlyDoc,  { directSaleId }, pointThisTime, uid)
      // これまでのトータルのポイントに今回のポイントを加算する
      const total = await updatePointDoc(pointDoc, pointThisTime)
      return { type: 'success', total, point: pointThisTime.amount}
    }
    catch(e){
      // console.log(e);
      alert('チェックインに失敗しました')
    }

  },

  async getPoint( { commit, rootState }, { type, infoId }){
    try{
      const uid = rootState.currentUser.uid
      const pointDoc = await getPointDoc(uid)
      const pointThisTime = {
        amount: 1,
        pointType: type
      }
      const now = new Date()
      const year  = now.getFullYear()
      const m = now.getMonth() + 1
      const month = (m < 10 ? '0' : '') + m
      const docId = `${year}-${month}`
      const monthlyDoc = await db.collection('points').doc(uid)
                                  .collection('monthly').doc(docId)
                                  .get()
      const key = type === "postComment" ? "directSaleId" 
                  : type === "postTimeline" ? "timelineId"
                  : type === "addDirectSaleImage" ? "directSaleId"
                  : type === "addDirectSale" ? "directSaleId"
                  : ""
      const info = {}
      info[key] = infoId
      updateMonthlyDoc(monthlyDoc, info, pointThisTime, uid)
      const total = await updatePointDoc(pointDoc, pointThisTime)

      return { type: 'success', total, point: pointThisTime.amount}
    }
    catch(e){
      // console.log(e);
      alert('ポイント取得に失敗しました。')    
    }
  },

  async postRequest({ commit, state, rootState}, { requestId, amount, description, email }) {
    commit('SET_LOADING', {
      loading: true
    });
    const uid = rootState.currentUser.uid;
    // console.log(rootState.currentUser.currentUser)
    const pointDoc = await getPointDoc(uid);
    let total = pointDoc.data()?.points || 0;
    
    // Should reduce points

    let existing = await db.collection("points").doc(uid).collection("requests").doc(requestId).get();
    if (existing.data()?.requestId === requestId) {
      return ({
        success: false,
        message: "Existing requestId",
      })
    } else {
      // register new request to firebase
      await db.collection("points").doc(uid).collection("requests").doc(requestId).set({
        requestId: requestId,
        amount: amount,
        description: description,
        email: email,
        createdAt: {
          seconds: (new Date()).getTime() / 1000
        },
        status: status.pending
      });
      // calculate the points
      await db.collection("points").doc(uid).update({
        points: state.pointTotal - amount
      });
      commit("SET_POINT_TOTAL", state.pointTotal - amount);
      commit("ADD_REQUESTS", [{
        requestId: requestId,
        amount: amount,
        description: description,
        email: email,
        createdAt: {
          seconds: (new Date()).getTime() / 1000
        },
        status: status.pending
      }]);
      commit('SET_LOADING', {
        loading: false
      });

      return ({
        success: true,
        message: "申請、完了！",
      })
    }
  },

  async getRequests({ commit, state, rootState}, { uid }) {
    commit('SET_LOADING', {
      loading: true
    });
    let registeredRequests = await db.collection("points").doc(uid).collection("requests").get();
    let results = [];
    let temp;
    for (let i = 0; i < registeredRequests.docs.length; i ++) {
      let id = registeredRequests.docs[i].id;
      temp = await (await db.collection("points").doc(uid).collection("requests").doc(id).get()).data();
      results.push(temp);
    }
    commit("ADD_REQUESTS", results);
    commit('SET_LOADING', {
      loading: false
    });
    return results
  },
  
  async getPendingRequests({ commit, state, rootState}) {
    commit('SET_LOADING', {
      loading: true
    });
    commit("RESET_REQUESTS");
    let users = {} ;
    let loadedPosts = {};
    db.collection('users').get().then(async (results) => {
      results.forEach((doc) => {
        users[doc.id] = doc.data();
      });
      let points = await db.collection("points").get();
      points.docs.forEach(async (uid) => {
        // console.log(uid.id);
        let registeredRequests1 = uid.data();
        // console.log("uid.data:", registeredRequests1);
        let registeredRequests = await db.collection("points").doc(uid.id).collection("requests").get();
        registeredRequests.docs.forEach(async (rid) => {
          let results1 = [];
          let temp;
          temp = await (await db.collection("points").doc(uid.id).collection("requests").doc(rid.id).get()).data();
          // if(temp.status === status.pending){
            temp.uid = uid.id
            temp.username = users[uid.id].name
            results1.push(temp);
            commit("ADD_ALL_REQUESTS", results1);
          // }
        })
      })
      
      commit('SET_LOADING', {
        loading: false
      });
    }); 
    return []
  },

  async changePendingRequests({ commit, state, rootState}, { requestId, uid, status }) {
    commit('SET_LOADING', {
      loading: true
    });
    await db.collection("points").doc(uid).collection("requests").doc(requestId).update({
      status: status
    });
    
    commit("UPDATE_REQUESTS", {
      requestId,
      uid,
      status
    });

    commit('SET_LOADING', {
      loading: false
    });
    return []
  },

  async deleteRequest({commit, state, rootState}, { uid, requestId }) {
    commit('SET_LOADING', {
      loading: true
    });
    try {
      let existing = await db.collection("points").doc(uid).collection("requests").doc(requestId).get();
      // console.log(existing.data().status)
      // console.log(status.pending)
      // console.log(existing.data().status === status.pending)
      // console.log(existing.data().status == status.pending)
      if (existing.data().status === status.pending) {
        await db.collection("points").doc(uid).collection("requests").doc(requestId).delete();
        let currentPoint = (await db.collection("points").doc(uid).get()).data().points;
        (await db.collection("points").doc(uid).get()).ref.set({
          points: parseInt(currentPoint) + parseInt(existing.data().amount)
        });
        commit('SET_POINT_TOTAL', parseInt(currentPoint) + parseInt(existing.data().amount));
      } else {
        await db.collection("points").doc(uid).collection("requests").doc(requestId).delete();
      }

      // db.collection('points').doc(uid).get()
      // .then(doc => {
      //   // console.log(doc)
      //   commit('SET_POINT_TOTAL', doc.data().points )
      // })
      commit("REMOVE_REQUESTS", {
        uid: uid,
        requestId: requestId
      })
    } catch(e) {
      // console.log(e)
    }
    commit('SET_LOADING', {
      loading: false
    });
  }
}

async function getPointDoc(uid){
  const pointDoc = await db.collection('points').doc(uid).get()
  if(!pointDoc.exists){
    await pointDoc.ref.set({
        points: 0
      })
      .then(res => {
        // console.log(`successfully set points[${uid}]`);
      })
      .catch(e => {
        // console.log(e);
      })
  }
  return pointDoc
}

async function getCheckInDetail(uid, directSaleId){
  const doc = await db.collection('users').doc(uid)
                      .collection('visitedDirectSales').doc(directSaleId)
                      .get()
                      .catch(e => {
                        // console.log(e);
                      })
  let point = {
    amount: 0.5,
    pointType: 'firstVisit'
  }
  const now = new Date()
  // ドキュメントが存在する場合、２回目以降の訪問。onePointフィールドを取得し、更新する
  let onePoint = []
  if(doc.exists){
    point = {
      amount: 0.5,
      type: 'secondVisit'
    }
    onePoint = doc.data().onePoint
  }

  const newOnePoint = {
    date: now,
    info: {
      directSaleId
    },
    point: point.amount,
    pointType: point.type
  }

  onePoint.push(newOnePoint)
  
  doc.ref.set({
      directSaleId,
      lastDate: now,
      onePoint
    })
    .then(res => {
      // console.log(`successfully set users[${uid}].visitedDirectSales[${directSaleId}]`);
    })
    .catch(e => {
      // console.log(e);
    })
  return point
}

async function updateMonthlyDoc(monthlyDoc, info , pointThisTime, uid){
  const now = new Date()
  if(!monthlyDoc.exists){
    await monthlyDoc.ref.set({
        createdAt: now,
        rireki: [],
        total: pointThisTime.amount
      }, {merge: true})
      .then(res => {
        // console.log('monthlyDoc successfully created');
      })
      .catch(e => {
        // console.log(e);
      })
    }

  // monthlyの今月分の履歴にこのチェックインを追加
  let rireki = []
  let monthlyTotal = pointThisTime.amount
  if(monthlyDoc.exists){
    rireki = monthlyDoc.data().rireki
    monthlyTotal = monthlyDoc.data().total + pointThisTime.amount
  }

  rireki.push({
      date: now,
      info,
      point: pointThisTime.amount,
      pointType: pointThisTime.pointType
  })

  // console.log(rireki);
  monthlyDoc.ref.set({
      rireki,
      total: monthlyTotal
    }, {merge: true})
    .then(res => {
      // console.log(`successfully add ${rireki[rireki.length-1]} to points[${uid}].collection[monthly][${year}-${month}].rireki[]`);
    })
    .catch(e => {
      // console.log(e);
    })
}

async function updatePointDoc(pointDoc, pointThisTime){
  let total = pointDoc.data()?.points
  total = total ? total : 0
  total += pointThisTime.amount
  // console.log('all time total: ', total);
  pointDoc.ref.set({
      points: total 
    })
    .then(res => {
      // console.log(`successfully set points[${uid}]`);
    })
    .catch(e => {
      // console.log(e);
    })
  return total
}

const getters = {
  pointTotal: state => state.pointTotal,
  monthlyRankedInUsers: state => state.monthlyRankedInUsers,
  totalRankedInUsers: state => state.totalRankedInUsers,
  visitedDirectSales: state => state.visitedDirectSales,
  pointHistory: state => state.pointHistory,
  requests: state => state.requests,
  allrequests: state => state.allrequests,
  finishedRequests: state => state.allrequests.filter(request => request.status !== status.pending),
  loading: state => state.loading,
}

const myModule = {
  state,
  mutations,
  actions,
  getters
}

export default myModule;