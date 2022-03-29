<template lang="pug">
.wrapper
  Logo(ref="logo")
  Loading(ref="loading")
  SwitchBtn.switch-btn.is-mobile(
    v-if="scrollTop < 100",
    @btnClicked="goUser",
    :style="btnStyle"
  )
  SwitchBtn.switch-btn.is-mobile(v-else, icon="map", @btnClicked="goMap")
  WindowScrollLoadList.scroll-load-list(
    v-if="directSalesOrdered.length != 0",
    :items="directSalesOrdered",
    :numOfItemsPerLoad="10",
  )
    template(#list="list")
      .main
        PCSidebar.sidebar.is-pc.ml-auto.mr-auto
        .content
          Slick.is-pc.mt-4.slider(
            v-if="afterLoad" 
            ref="slick" 
            :paths="['veggie/topImages/topC.jpg','veggie/topImages/topA.jpg','veggie/topImages/topB.jpg']"
            :hidePaging="true"
            :modalDisabled="true"
          )
          TopList.is-pc.position-relative
            template(#title)
              .d-flex.position-relative.m-t-1
                TopListTitleWithLogoV2.title(
                  title="見えベジ"
                )
                a.btn.seeing-btn.seeing-badge-pill.mr-4.position-absolute.is-pc(style="height: 40px; right: -8px" href="https://www.veggiejapan.com/%E8%A6%8B%E3%81%88%E3%81%B9%E3%82%B8%E3%82%AB%E3%83%A0" target="_blank") 見えベジを始める →
              .div.time-back {{currentTime}} 頃の直売所の様子
            template(#content)
              div#topcameralist( style="height: 395px" )
                VueSlickCarousel(
                  :accessibility="false"
                  :focusOnSelect="false",
                  :arrows="true" 
                  :slidesToScroll="3"
                  :infinite="false"
                  :dots="true" 
                  :slidesToShow="3"
                )
                  DirectSaleListItemForSlick.pc-size.index-page.touch-action-none.slider-card(
                    v-if="directSales",
                    v-for="(directSale, id) in cameraFilteredDirectStoreList",
                    :key="id + 5000"
                    :directSale="directSale"
                  )
          TopList.is-pc
            template(#title)
              .d-flex.position-relative.m-t-1
                TopListTitleWithLogoV2.is-pc.title(
                  title="タイムライン"
                )
                .btn.add-btn.badge-pill.mr-4.position-absolute.is-pc(style="height: 40px; right: -8px" @click="openRegistration") + みーつけた
              //- .btn.add-btn.badge-pill.mr-4.is-pc(
              //-   style="transform: translate(0px,0px);top: 200px;"
              //-   @click="openRegistration"
              //- ) + みーつけた
            template(#content)
              .d-flex.justify-content-around.list-wrapper
                TopTimelineListItemV2(
                  v-if="topTimelineList",
                  v-for="(timeline, id) in topTimelineList",
                  :timeline="timeline"
                  :key="id + 0"
                )
            template(#more)
              TopMoreButtonV2.is-pc.more-btn(title="もっとタイムラインを見る" linkTo="/timeline")
          TopList
            template(#title)
              .is-mobile
                HeaderImage
                div(style="display: flex; justify-content: space-between;")
                  label.ml-4.mt-3.mb-3(style="display:inline-block") 見えベジ
                  .div.mt-3.mb-3.mr-4() {{currentTime}} 頃の直売所の様子
                div(style="overflow: auto;width: 100%;")
                  div(style="display: flex;width: fit-content;")
                    DirectSaleListItem.pc-size.index-page(
                      style="width: 240px !important;"
                      v-if="directSales",
                      v-for="(directSale, id) in cameraFilteredDirectStoreList",
                      :key="id + 5000"
                      :directSale="directSale"
                    )
                nuxt-link.label.d-block.ml-4.pt-3.pb-3(to="/users") ユーザー検索
              TopListTitleWithLogoV2.title.is-pc(
                title="ユーザー検索"
              )
            template(#content)
              UserIconListItem(
                v-if="recommendedUserList",
                v-for="(user, id) in recommendedUserList",
                :user="user"
                :key="id + 2000"
              )
            template(#more)
              .is-mobile
                label.ml-4.pt-3.pb-3 みんなの投稿
                .list-wrapper
                  RecentPostListV2(
                    v-if="topDirectSaleReviewList && topDirectSaleReviewUserList && topDirectSaleStoreNameList",
                    v-for="(review, id) in topDirectSaleReviewList",
                    :key="id + 3000"
                    :review="review",
                    :user="topDirectSaleReviewUserList.filter(user => user.id == review.userId)"
                    :directsalename="topDirectSaleStoreNameList.filter(directsalename => directsalename.id == review.directSaleId)"
                  )  
              TopMoreButtonV2.is-pc.more-btn(title="もっとユーザーを見る" linkTo="/users")
          TopList.is-pc.mt-4
            template(#title)
              TopListTitleWithLogoV2.title(
                title="みんなの投稿"
              )
            template(#content)
              .d-flex.justify-content-around
                TopReviewListItemV2(
                  v-if="topDirectSaleReviewList && topDirectSaleReviewUserList && topDirectSaleStoreNameList",
                  v-for="(review, id) in topDirectSaleReviewList",
                  :key="id + 4000"
                  :review="review",
                  :user="topDirectSaleReviewUserList.filter(user => user.id == review.userId)",
                  :directsalename="topDirectSaleStoreNameList.filter(directsalename => directsalename.id == review.directSaleId)"
                )
            template(#more)
          TopList.mt-4.mb-4.position-relative
            template(#title)
              TopListTitleWithLogoV2.title.is-pc(
                title="直売所一覧"
              )
              .mr-4.is-pc(
                style="top: 100px; float: right; position: sticky; color: white; font-weight: 500; z-index: 1; display: flex; margin-top: -4.5rem;"
              )
                div.btn.badge-pill(
                  style="background-color: #E48F6B; margin-right: 1rem; color: white !important;"
                  @click="goMap"
                ) マップから探す
                div.btn.badge-pill(
                  style="background-color: #E48F6B; color: white !important;"
                  @click="openRegistration"
                ) + みーつけた
              label.ml-4.mb-0.pt-3.pb-3.is-mobile 直売所一覧
              .btn.add-btn.badge-pill.mr-4.is-mobile(
                style="float: right; top: 60px; margin-top: -3rem;"
                @click="openRegistration"
              ) + みーつけた
            template(#content)
              .d-flex.justify-content-around.flex-wrap.w-100
                DirectSaleListItem.pc-size.index-page(
                  v-if="directSales",
                  v-for="(directSale, id) in filteredDirectStoreList",
                  :key="id + 5000"
                  :directSale="directSale"
                )
            template(#more)
              TopMoreButtonV2.more-btn(v-if="viewRange < directSales.length"  title="もっと直売所を見る" :handler="viewMore")
              
</template>

<script>
import { mapGetters } from "vuex";
import VueSlickCarousel from 'slick-vuejs'
import 'slick-vuejs/dist/slick-vuejs.css'
// optional style for arrows & dots
import 'slick-vuejs/dist/slick-vuejs-theme.css'

import RegistrationModal from '~/components/registration/RegistrationModal.vue'

let isFirstLaunch = false;
export default {
  components: {
    'VueSlickCarousel': VueSlickCarousel
  },
  data() {
    return {
      currentTime: 0,
      scrollTop: 0,
      //現在地から近い順に並び替えられた直売所リスト
      directSalesOrdered: [],
      btnStyle: {
        // 背景変更用スタイル
        background: `url('${require("@/assets/search_user.png")}')`, // 背景読み込み前なので空白
        backgroundSize: "3.5rem",
        backgroundPosition: "50% 50%",
      },
      afterLoad: false,
      viewRange: 12,
    };
  },
  head() {
    return {
      // title: "食べる」を見よう。Veggie",
    };
  },
  computed: {
    ...mapGetters({
      searchString: "searchDirect/searchString",
      directSales: "directSales/directSalesList/directSales",
      currentLocation: "currentLocation/currentLocation",
      likedDirectSalesIdList: "currentUser/likedDirectSalesIdList",
      userList: "userList/userList",
      recommendedUserList: "top/userListRecommended/userList",
      topTimelineList: "top/topTimelineList/timelines",
      topDirectSaleReviewList: "top/topDirectSaleReviewList/reviews",
      topDirectSaleReviewUserList: "top/topDirectSaleReviewList/userList",
      topDirectSaleStoreNameList: "top/topDirectSaleReviewList/directSaleNameList",
      newDirectSaleStore: "top/newDirectSaleStore/newDirectSaleStoreList",
    }),

    // 検索語による直売所フィルタ
    filteredDirectStoreList() {
      return this.directSales.filter(directSale => {
          return directSale.name.includes(this.searchString) || directSale.city.includes(this.searchString) || directSale.prefecture.includes(this.searchString) || (directSale.description && directSale.description.includes(this.searchString))
        }
      ).sort((a, b) =>
        a.distanceFromCurrentLocation - b.distanceFromCurrentLocation
      ).slice(0, this.viewRange);
    },
    cameraFilteredDirectStoreList() {
      return this.directSales.filter(directSale => {
          // return directSale.name.includes(this.searchString) || directSale.city.includes(this.searchString) || directSale.prefecture.includes(this.searchString) || (directSale.description && directSale.description.includes(this.searchString)) && this.path.includes('directSales') && (directSale.ownerId == '' || currentUserUid === ADMIN_ID || directSale.ownerId === currentUserUid)
          // return true;
          return (directSale.realtimeview) && (directSale.name.includes(this.searchString) || directSale.city.includes(this.searchString) || directSale.prefecture.includes(this.searchString) || (directSale.description && directSale.description.includes(this.searchString)))
      }
      ).sort((a, b) =>
        a.distanceFromCurrentLocation - b.distanceFromCurrentLocation
      ).slice(0, 10);
    },
  },
  methods: {
    currentDateTime() {
      const current = new Date().toTimeString().substr(0, 5);
      this.currentTime = current;
    },
    async initializeState() {
      if(isFirstLaunch) await this.showLogo()
      // console.log("index/initializeState");
      this.$refs.logo.$el.classList.add("d-none");
      const loading = this.$refs.loading;
      loading.startLoading();

      let promises = []
      // おすすめユーザ一覧を取得する
      if (this.recommendedUserList.length === 0) 
        promises.push(await this.$store.dispatch("top/userListRecommended/initializeState"))
      //直売所一覧を取得する
      if (this.directSales.length === 0) 
        promises.push(this.$store.dispatch("directSales/directSalesList/initializeState"))
      if (this.userList.length === 0)
        promises.push(await this.$store.dispatch("userList/initializeState"))
      if (this.topTimelineList.length === 0)
        promises.push(await this.$store.dispatch("top/topTimelineList/initializeState"))
      if (this.topDirectSaleReviewList.length === 0)
        promises.push(this.$store.dispatch("top/topDirectSaleReviewList/initializeState"))
      if (this.newDirectSaleStore.length === 0)
        promises.push(this.$store.dispatch("top/newDirectSaleStore/initializeState"))

      await Promise.all(promises)

      this.setDirectSalesOrdered();
      loading.finishLoading();
      this.afterLoad = true
    },
    //直売所を現在地から近い順に並び替える
    setDirectSalesOrdered() {
      const directSales = [...this.directSales];
      this.directSalesOrdered = directSales.sort((a, b) =>
        a.distanceFromCurrentLocation - b.distanceFromCurrentLocation
      );
    },
    async showLogo() {
      const logo = this.$refs.logo;
      await logo.showLogo();
      isFirstLaunch = false;
    },
    goMap() {
      this.$router.push("/map");
    },
    goUser() {
      this.$router.push("/users/");
    },
    async openRegistration() {
        if(!this.$checkAuthenticated()) return
        await this.$store.dispatch('directSales/directSaleRegistrationByUser/initializeStateForRegister')

        const modalWidth = $(window).width() < 1000 ? $(window).width() - 80 : '1000px'
        const modalHeight = $(window).height() < 1200 ? $(window).height() - 240 : '1000px'

        this.$modal.show(
          RegistrationModal, 
          {
            "showBusinessHours": false
          }, {
            clickToClose: true,
            width: modalWidth,
            height: modalHeight,
            scrollable: true,
            style: {
              margin: "4rem 0"
            }
          }
        )
    },
    viewMore() {
      this.viewRange += 9;
    }
  },
  layout: "index",
  middleware: 'launch',
  beforeRouteEnter: (to, from, next) => {
    if (from.name == null) {
      isFirstLaunch = true;
    }
    next();
  },
  created() {

  },
  mounted() {
    this.initializeState();
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY
    })
    this.currentDateTime();
    setInterval(this.currentDateTime, 60000);
  },
};
</script>


<style lang="scss" scoped>
.slider-card {
  margin: 0;
}
.touch-action-none {
  -ms-touch-action: none !important;
  touch-action: none !important;
}
.is-mobile {
  display: none !important;
}
.is-pc {
  display: inherit !important;
}
.m-t-1 {
  margin-top: 1rem !important;
}
.wrapper {
  background: white;
  &.scroll-load-list {
    .main {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      .sidebar {
        width: 20%;
      }
      .content {
        width: 76%;
        .slider {
          background: black;
        }
        .title {
          margin: 0 0 2rem 0;
        }
        .more-btn {
          margin: 0.5rem 0 1rem 0;
        }
        .pc-size {
          width: 32%;
          // height: 50%;
          margin: 5px;
        }
      }
    }
  }
}
.list-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
}
.list-wrapper::-webkit-scrollbar {
  /* Chrome、Safari用 */
  display: none;
}
.add-btn {
  position: sticky;
  background-color: #E48F6B;
  color: white;
  font-weight: 500;
  z-index: 1;
}
.seeing-badge-pill {
  padding-right: 0.6em;
  padding-left: 0.6em;
}
.time-back {
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  left: 50% ;
  transform: translate(-50%, 0);
  top: 2%;
}
@media screen and (max-width: 1023px) {
  .wrapper {
    // background: rgba(190, 155, 105, 0.1);
    .scroll-load-list {
      .main {
        .content {
          width: 100%;
          .pc-size {
            width: 100%;
            // height: 50%;
            margin: 15px;
          }
        }
      }
    }
  }
  .is-pc {
    display: none !important;
  }
  .is-mobile {
    display: inherit !important;
  }
  .switch-btn {
    font-size: 2rem;
    position: fixed;
    right: 5%;
    bottom: 15%;
  }
}
</style>