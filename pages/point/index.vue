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
    div(
      style="display: flex;justify-content: center;"
    )
      img(
        style="width: 80%;"
        src="~assets/image.png"
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
        style="display: flex;justify-content: center;align-items: center;"
      ) 
        img(
          v-if="tab.icon === 'add'"
          src="~assets/add.png"
          style="width: 30px; margin-left: 10px;"
        )
        img(
          v-if="tab.icon === 'history'"
          src="~assets/history.png"
          style="width: 30px; margin-left: 10px;"
        )
        span {{ tab.tabText }}
    .panel(

    )
        //- .float-btn(
        //- :class=""
        //- @click="setActiveTab(tabs[activeTab].goto)"
        //- ) {{ tabs[activeTab].tabBtn }}
        p.pointer
          span P
          | {{ pointTotal }}pt
        div(
          v-if="loading"
          class="alert alert-warning" 
          role="alert"
        ) 更新中 ...
        div(
          style="width: 100%;overflow: auto; margin-top: 16px;"
        )
          table(
            class="table table-striped table-bordered table-hover"
            v-if="activeTab == 0"
            width="100%"
            style="min-width: 1500px;"
          )
            thead(
              class="border-bottom"
            )
              div(class="row")
                div(class="col-1 center") No
                div(class="col-1 center") 申請ID
                div(class="col-2 center") メールアドレス
                div(class="col-2 center") 申請の内容
                div(class="col-1 center") 交換ポイント
                div(
                  class="col-2 center" 
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
                  span ステータス
                div(
                  class="col-1 center" 
                ) キャンセル 
            tbody()
              div(
                v-if="requests.length === 0"
                class="text-center mt-2 mb-2"
              ) 表示するデータがありません
              div(
                v-if="requests.length > 0"
                class="row"
                @click="toggleOpenDescription(id)"
                v-for="(history, id) in requests.slice().sort((a,b) => (activeSort == 'status' ? ((a.status > b.status) ? sortByStatus : -1*sortByStatus) : (a.createdAt.seconds > b.createdAt.seconds ? sortByDate : -1*sortByDate)))"
              )
                div(class="col-1 center") {{id + 1}}
                div(
                  :class="['col-1 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.requestId}}
                div(
                  :class="['col-2 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.email}}
                div(
                  :class="['col-2 center table-box', id == openDescriptionId && openDescription ? 'expand' : '']" 
                  style="word-break: break-all;"
                ) {{history.description}}
                div(class="col-1 center") {{history.amount}}
                div(class="col-2 center") {{history.createdAt ? (new Date(history.createdAt.seconds * 1000)).toLocaleDateString() : "わからない"}}
                div(class="col-2 center") {{statusJP[history.status]}}
                div(class="col-1 center")
                  button(
                    @click="removeRequest(history)"
                  ) X
                //- div(
                //-   class="col-2"
                //- )
                //- div(
                //-   v-if="id == openDescriptionId && openDescription"
                //-   class="col-10"
                //- ) {{history.description}}
        form(
          v-if="activeTab == 1"
          v-on:submit.prevent="onRequest"
        )
          div.row(
            class="mt-2"
          )
            div.col-sm-2()
            div(
              v-if="msg !== ''"
              class="col-sm-8 alert alert-warning" 
              role="alert"
              style="display: flex; justify-content: space-between"
            ) {{msg}}
              div(
                style="cursor: pointer;"
                @click="closeMessage()"
              ) X
          div.row(
            class="mt-2"
          )
            .col-sm-2()
            div.col-sm-3(

            ) 
              label.for-label(
                for="request-id"
              ) 申請ID
            div.col-sm-5(

            )
              input.form-control(
                type="text"
                id="request-id"
                v-model="requestId"
                readonly
              )
          div.row(
            class="mt-2"
          )
            .col-sm-2()
            div.col-sm-3(

            ) 
              label.for-label(
                for="email"
              ) メールアドレス
            div.col-sm-5(

            )
              input.form-control(
                type="email"
                id="email"
                v-model="email"
              )
          div.row(
            class="mt-2"
          )
            .col-sm-2()
            div.col-sm-3(

            ) 
              label.for-label(
                for="email-confirm"
              ) メールアドレス(確認用)
            div.col-sm-5(

            )
              input.form-control(
                type="email"
                id="email-confirm"
                v-model="emailConfirm"
              )
          div.row(
            class="mt-1"
          )
            .col-sm-2
            .col-sm-3
            .col-sm-5
              div(
                v-if="emailMsg !== ''"
                style="background: red; width: 100%; border-radius: 5px; color: white;"
              ) {{emailMsg}}
          div.row(
            class="mt-2"
          )
            .col-sm-2()
            div.col-sm-3() 
              label.for-label(
                for="claim-amount"
              ) 交換ポイント
            div.col-sm-5(

            )
              input.form-control(
                id="claim-amount"
                type="number"
                min="0"
                placeholder="claim-amount"
                v-model="amount"
              )
          div.row(
            class="mt-2"
          )
            .col-sm-2()
            div.col-sm-3(

            ) 
              label.for-label(
                for="description"
              ) 備考欄(任意)
            div.col-sm-5(

            )
              textarea.form-control(
                type="text"
                id="description"
                v-model="description"
              )
          div.row
            div.col-sm-2
            div.col-sm-8
              button.w-100.btn.btn-lg.mt-2(
                style="background: #D9706F;color: white;"
              ) 申請
</template>

<script>
import { mapGetters } from "vuex";
import firebase from '~/plugins/firebase'
import shortid from 'shortid';

export default {
  data() {
    return {
      scrollTop: 0,
      afterLoad: false,
      tabs: [
          {tabText: "申請履歴", tabBtn: "新規申請", goto: 1, icon: "history"},
          {tabText: "新規申請", tabBtn: "履歴を見る", goto: 0, icon: "add"},
      ],
      activeTab: 0,
      loged: false,
      amount: 0,
      requestId: "",
      email: "",
      emailConfirm: "",
      emailMsg: "",
      description: "",
      msg: "",
      uid: "",
      historyRequests: [],
      openDescription: false,
      openDescriptionId: -1,
      sortByDate: 1,
      sortByStatus: 1,
      activeSort: "date", // {date, status}
      statusJP: {
        pending: "申請中",
        complete: "完了（メール確認）",
        failed01: "アドレス相違｜送付不可",
        failed02: "申請は却下されました。"
      }
    };
  },
  head() {
    return {
      title: "Veggie|Point",
    };
  },
  // watch: {
  //   loged() {
  //       if (this.loged) {
  //       }
  //   }
  // },
  computed: {
    ...mapGetters({
      directSales: "directSales/directSalesList/directSales",
      currentLocation: "currentLocation/currentLocation",
      likedDirectSalesIdList: "currentUser/likedDirectSalesIdList",
      user: 'userDetail/user',
      pointTotal: 'point/pointTotal',
      requests: 'point/requests',
      loading: 'point/loading',
    }),
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
    setActiveTab(id) {
        this.activeTab = id;
        this.requestId = shortid.generate();
        // console.log("View requests", this.requests)
    },
    async onRequest() {
      if (this.loading) {
        alert("以前の行動は進行中です。")
        return
      }
      if (this.email === "" && this.emailConfirm === "") {
        this.emailMsg = "メールアドレスを入力して"
        return
      }
      if (this.email !== this.emailConfirm) {
        this.emailMsg = "同じメールアドレスを入力して下さい"
        return
      }
      if (this.requestId !== "" && this.amount !== 0) {
        this.emailMsg = ""
        if (this.amount < 500) {
          this.msg = "500ポイント以上から申請が可能です(1単位OK)"
          return;
        }
        if (this.amount > 100000) {
          this.msg = "10万円まで"
          return;
        }
        if (this.amount > this.pointTotal) {
          this.msg = "500ポイントから交換が可能です"
          return;
        }
        this.msg = "";
        const response = await this.$store.dispatch("point/postRequest", { 
          requestId: this.requestId,
          amount: this.amount,
          description: this.description,
          email: this.email,
        }); 
        if (response.success) {
          this.msg = response.message;
          this.requestId = "";
          this.amount = 0;
          this.description = "";
        } else {
          this.msg = response.message;
        }
      } else {
        this.msg = "すべてのフィールドを確認してください"
      }
      
    },
    closeMessage() {
      this.msg = "";
    },
    async removeRequest(request) {
      this.$store.dispatch('point/deleteRequest', {
        uid: this.user.id, 
        requestId: request.requestId,
      })
    }
  },
  layout: "index",
  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
        if(user){
            await this.$store.dispatch('userDetail/initializeState', user.uid)
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
            await this.$store.dispatch("point/getRequests", { uid: user.uid })
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
};
</script>

<style lang="scss" scoped>
.p-1_5 {
    padding: 1.5rem;
}
.tab-group {
    display: flex;
    justify-content: space-around;
}
.tab-group .tab-item {
    padding: 1rem;
    border-bottom: 2px solid #C9BDAB;
    width: 50%;
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
    position: absolute;
    cursor: pointer;
    right: 0rem;
    top: 0.3rem;
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

.cursor-pointer {
  cursor: pointer;
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