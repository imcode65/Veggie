<template lang="pug">
.wrapper(
    :class="'p-1_5'"
)
  Logo(ref="logo")
  Loading(ref="loading")
  .space.is-mobile(
      style="margin-top: 50px"
  )
  .content(
    v-if="loged"
    style="z-index='1000'"
  )
    .tab-group(
        :clase="''"
        :style="{}"
    )
        .tab-item(
            v-for="(tab, id) in tabs",
            :key="id"
            :class="{'active': id==activeTab}",
            @click="setActiveTab(id)"
        ) {{ tab.tabText }}
    .panel(

    )
        .float-btn(
        :class=""
        @click="activeTab === 0 ? save() : setActiveTab(tabs[activeTab].goto)"
        ) {{ tabs[activeTab].tabBtn }}
        div(
          v-if="loading"
          class="alert alert-warning" 
          role="alert"
        ) 更新中 ...
        input(
          v-model="filterID"
          placeholder="検索する申請IDを挿入します"
          class="mb-2"
        )
        div(
          style="width: 100%;overflow: auto;"
        )
          table(
            class="table table-striped table-bordered table-hover"
            v-if="activeTab == 0"
            width="100%"
            style="min-width: 1500px; overflow: auto;"
          )
            thead(
              class="border-bottom"
            )
              div(
                class="row"
              )
                div(class="col-1 center") No
                div(class="col-2 center") ユーザー名
                div(class="col-1 center") Email
                div(
                  class="col-1" 
                  style="word-break: break-word;display: flex; justify-content: center; align-items: center;"
                ) 申請ID
                div(class="col-2 center") 申請の内容
                div(class="col-1 center") 交換ポイント
                div(
                  class="col-1 center" 
                  @click="toggleSortByDate()"
                ) 
                  img(
                    v-if="sortByDate == '1'"
                    style="width: 20px;height: 20px;"
                    src="~assets/sort-down.png"
                  )
                  img(
                    v-if="sortByDate == '-1'"
                    style="width: 20px;height: 20px;"
                    src="~assets/sort-up.png"
                  )
                  span 申請日付
                div(
                  class="col-2 center"
                  @click="toggleSortByStatus()"
                 center 
                ) 
                  img(
                    v-if="sortByStatus == '1'"
                    style="width: 20px;height: 20px;"
                    src="~assets/sort-down.png"
                  )
                  img(
                    v-if="sortByStatus == '-1'"
                    style="width: 20px;height: 20px;"
                    src="~assets/sort-up.png"
                  )
                  span 選別
                div(
                  class="col-1"
                ) 削除
            tbody()
              div(
                class="row"
                @click="toggleOpenDescription(id)"
                v-for="(history, id) in requests.slice().sort((a,b) => (activeSort == 'status' ? (a.status > b.status ? sortByStatus : -1*sortByStatus) : (a.createdAt.seconds > b.createdAt.seconds ? sortByDate : -1*sortByDate))).filter(request => request.requestId.toLowerCase().indexOf(filterID.toLowerCase()) >= 0 )"
              )
                div(class="col-1 center") {{id + 1}}
                div(
                  :class="['col-2 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.username}}
                div(
                  :class="['col-1 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.email}}
                div(
                  :class="['col-1 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.requestId}}
                div(
                  :class="['col-2 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.description}}
                div(class="col-1 center") {{history.amount}}
                div(class="col-1 center") {{history.createdAt ? (new Date(history.createdAt.seconds * 1000)).toLocaleDateString() : "Not sure"}}
                div(class="col-2 center")
                  .center
                    select(v-model="clonedRequests[history.uid][history.requestId]")
                      option(
                        v-for="(val, id) in ['pending','complete','failed01','failed02']"
                        :value="val"
                      ) {{statusJP[val]}}
                div(class="col-1 center") 
                  button(
                    @click="removeRequest(history)"
                  ) X
        div(
          style="width: 100%;overflow: auto;"
        )
          table(
            class="table table-striped table-bordered table-hover"
            v-if="activeTab == 1"
            width="100%"
            style="min-width: 1500px; overflow: auto;"
          )
            thead()
              div(
                class="row"
              )
                div(class="col-1 center") No
                div(class="col-2 center") ユーザー名
                div(class="col-2 center") Email
                div(class="col-1 center") 申請ID
                div(class="col-3 center") 申請の内容
                div(class="col-1 center") 交換ポイント
                div(
                  class="col-1 center" 
                  @click="toggleSortByDate()"
                ) 
                  span 申請日付
                  img(
                    v-if="sortByDate == '1'"
                    style="width: 20px;height: 20px;"
                    src="~assets/sort-down.png"
                  )
                  img(
                    v-if="sortByDate == '-1'"
                    style="width: 20px;height: 20px;"
                    src="~assets/sort-up.png"
                  )
                div(class="col-1") 削除
            tbody()
              div(
                class="row"
                @click="toggleOpenDescription(id)"
                v-for="(history, id) in finishedRequests.slice().sort((a,b) => (activeSort == 'status' ? ((a.status > b.status) ? sortByStatus : -1*sortByStatus) : (a.createdAt.seconds > b.createdAt.seconds ? sortByDate : -1*sortByDate))).filter(request => request.requestId.toLowerCase().indexOf(filterID.toLowerCase()) >= 0 )"
              )
                div(class="col-1 center") {{id + 1}}
                div(
                  :class="['col-2 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.username}}
                div(
                  :class="['col-2 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.email}}
                div(
                  :class="['col-1 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.requestId}}
                div(
                  :class="['col-3 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{(history.description).length>30 ? history.description.substring(0, 30)+"..." : history.description}}
                div(
                  :class="['col-1 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.amount}}
                div(
                  :class="['col-1 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.createdAt ? (new Date(history.createdAt.seconds * 1000)).toLocaleDateString() : "わからない"}}
                div(class="col-1 center") 
                  button(
                    @click="removeRequest(history)"
                  ) X
</template>

<script>
import { mapGetters } from "vuex";
import firebase from '~/plugins/firebase';

export default {
  data() {
    return {
      scrollTop: 0,
      afterLoad: false,
      tabs: [
          {tabText: "申請一覧", tabBtn: "登録", goto: 1},
          {tabText: "完了リスト", tabBtn: "申請一覧", goto: 0},
      ],
      activeTab: 0,
      loged: false,
      amount: 0,
      requestId: "",
      description: "",
      msg: "",
      uid: "",
      pendingRequests: [],
      statuses: [],
      openDescription: false,
      openDescriptionId: -1,
      filterID: "",
      sortByDate: 1,
      sortByStatus: 1,
      activeSort: "date", // {date, status}
      statusJP: {
        pending: "未処理",
        complete: "完了",
        failed01: "アドレス相違｜送付不可",
        failed02: "申請は却下されました。"
      },
      status: [
        "pending",
        "complete",
        "failed01",
        "failed02"
      ]
    };
  },
  head() {
    return {
      title: "Veggie|Point",
    };
  },
  // watch: {
  //   filterID() {
  //       if (this.filterID !== "") {

  //       }
  //   }
  // },
  computed: {
    ...mapGetters({
      directSales: "directSales/directSalesList/directSales",
      currentLocation: "currentLocation/currentLocation",
      likedDirectSalesIdList: "currentUser/likedDirectSalesIdList",
      user: 'currentUser/currentUser',
      pointTotal: 'point/pointTotal',
      requests: 'point/allrequests',
      finishedRequests: 'point/finishedRequests',
      loading: 'point/loading',
    }),
    clonedRequests() {
      const temp = {}
      this.requests.map(request => {
        if(!(request.uid in temp)) temp[request.uid] = {}
        temp[request.uid][request.requestId] = request.status
        // console.log(request.status);
        return
      })
      // console.log("temp:", this.requests);
      return temp
    }
  },
  methods: {
    toggleSortByDate() {
      this.activeSort = 'date';
      this.sortByDate = this.sortByDate * -1;
    },  
    toggleSortByStatus() {
      this.activeSort = 'status';
      this.sortByStatus = this.sortByStatus * -1;
    },
    toggleOpenDescription(id) {
      if (this.openDescriptionId !== id) {
        this.openDescription = true;
        this.openDescriptionId = id;
      } else {
        this.openDescription = !this.openDescription;
      }
    },
    async initializeState() {
        this.$refs.loading.startLoading();
    },
    async save() {
      if (this.loading) {
        return
      }
      Object.keys(this.clonedRequests).map(uid => {
        Object.keys(this.clonedRequests[uid]).map(async requestId => {
          if(this.clonedRequests[uid][requestId] !== this.status.pending) {
            await this.$store.dispatch("point/changePendingRequests", {
              requestId: requestId,
              status: this.clonedRequests[uid][requestId],
              uid: uid
            }); 
          }
        })
      })
    },
    async setActiveTab(id) {
        this.activeTab = id;
    },
    closeMessage() {
      this.msg = "";
    },
    async removeRequest(request) {
      if (this.loading) {
        return
      }
      this.$store.dispatch('point/deleteRequest', request)
    }
  },
  layout: "index",
  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
        if(user){
            await this.$store.dispatch('currentUser/initializeState', user)
            // this.loged = true
            
            this.$refs.logo.showLogo();
            this.$refs.loading.finishLoading()
            setTimeout(() => {
              this.loged = true
            }, 1000)
            //　ユーザ情報取得
            // let userRef = db.collection('users').doc(user.uid)
            // let doc = await userRef.get()
            // const data = doc.data()
            // if(data.name){ 
            //   this.acountName = data.name
            //   this.imageStoragePath = data.imageStoragePath
            // } else{
            // this.acountName = user.displayName
            // }
            await this.$store.dispatch("point/getPendingRequests", {})
        }
        else{
            this.loged = false
        }
    });
    this.initializeState()
    if (!this.user) {
      this.$checkAuthenticated()
    }
    // async function runSample() {
    //   console.log(requestCreate)
    //   try {
    //     const res = await createGiftCard(requestCreate);
    //   } catch(e) {
    //   }
    // }

    // runSample().catch(console.error)
  },
  created() {
  },
  beforeRouteLeave(to, from, next) {
    this.$modal.hideAll();
    next();
  },
  // watch: {
  //   requests: function (newRequests, oldRequests) {
  //     this.statuses = this.newRequests.map(request=>"Pending")
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.p-1_5 {
    padding: 1.5rem;
}
.tab-group {
    display: flex;
}
.tab-group .tab-item {
    padding: 1rem;
    border-bottom: 2px solid #C9BDAB;
    width: 100%;
    text-align: center;
    cursor: pointer;
}
.tab-group .tab-item.active {
    padding: 1rem;
    border-bottom: 4px solid #D9706F;
}
.panel {
    position: relative;
}
.panel .float-btn {
    cursor: pointer;
    margin-top: 0.3rem;
    margin-left: auto;
    width: fit-content;
    padding: 1rem 0.3rem;
    border-radius: 1rem 0.3rem;
    color: white;
    background: #C9BDAB;
    transition: all 0.8s;
    &:hover, &:active, &:focus {
        background: #D9706F;
    }
}
@media screen and (max-width: 576px) {
    .panel .float-btn {
        right: 0rem;
        top: 1rem;
    }
}

p.pointer {
    font-size: 30px;
    color: #E48F68;
    font-weight: bold;
    border-bottom: 1px solid #BE9B69;
    display: inline-block;
    padding: 4px;

    span {
        display: inline-block;
        width: 40px;
        border-radius: 4px;
        background-color: #E48F68;
        line-height: 40px;
        text-align: center;
        color: white;
        font-weight: normal;
        margin-right: 8px;
    }
}

.table-box {
  white-space: nowrap;
  overflow: hidden;
  &.expand {
    white-space: unset;
    overflow: unset;
  }
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>