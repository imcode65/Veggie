<template lang="pug">
.wrapper
  Logo(ref="logo")
  Loading(ref="loading")
  SwitchBtn.switch-btn.is-mobile(
    v-if="scrollTop < 100",
    @btnClicked="goUser",
    :style="btnStyle"
  )
  .btn.add-btn.badge-pill.mr-4(@click="openRegistration") + みーつけた
  WindowScrollLoadList.scroll-load-list(
    v-if="directSalesOrdered.length != 0",
    :items="directSalesOrdered",
    :numOfItemsPerLoad="10",
  )
    template(#list="list")
      .main
        .content             
          TopList.mt-4
            template(#title)
              TopListTitleWithLogo.title.is-pc(
                title="直売所一覧"
              )
              label.ml-4.mt-3.mb-3.is-mobile 直売所一覧
            template(#content)
              .d-flex.justify-content-around.flex-wrap
                DirectSaleListItem.pc-size.direct-sale-page(
                  ref="store",
                  v-if="list.itemsToShow",
                  v-for="(directSale, id) in filteredDirectStoreList",
                  :key="id"
                  :directSale="directSale"
                )    
</template>

<script>
import { mapGetters } from "vuex";
import RegistrationModal from '~/components/registration/RegistrationModal.vue'

export default {
  data() {
    return {
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
    };
  },
  head() {
    return {
      title: "Veggie|直売所一覧",
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
      topDirectSaleReviewUserList: "top/topDirectSaleReviewList/userList",
      topDirectSaleStoreNameList: "top/topDirectSaleReviewList/directSaleNameList",
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
  },
  methods: {
    async initializeState() {
      // console.log("directSales/initializeState");
      this.$refs.logo.$el.classList.add("d-none");
      const loading = this.$refs.loading;
      loading.startLoading();

      let promises = []
      if (this.recommendedUserList.length === 0) 
        promises.push(await this.$store.dispatch("top/userListRecommended/initializeState"))
      //直売所一覧を取得する
      if (this.directSales.length === 0) 
        promises.push(this.$store.dispatch("directSales/directSalesList/initializeState"))
      if (this.userList.length === 0)
        promises.push(await this.$store.dispatch("userList/initializeState"))
      if (this.topTimelineList.length === 0)
        promises.push(await this.$store.dispatch("top/topTimelineList/initializeState"))

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
      const modalHeight = $(window).height() < 1200 ? $(window).height() - 120 : '1200px'

      this.$modal.show(RegistrationModal, {}, {
        clickToClose: true,
        width: modalWidth,
        height: modalHeight,
        scrollable: true
      })
    }
  },
  layout: "index",
  mounted() {
    this.initializeState();
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1023px) {
  .wrapper {
    background: rgba(190, 155, 105, 0.1);
  }
  .is-pc {
    display: none;
  }
  .switch-btn {
    font-size: 2rem;
    position: fixed;
    right: 5%;
    bottom: 15%;
  }
}
@media screen and (min-width: 1024px) {
  .is-mobile {
    display: none;
  }
  .wrapper {
    background: white;
    .scroll-load-list {
      .main {
        padding-bottom: 20px;
        .content {
          width: 100%;
          .pc-size {
            width: 23%;
            // height: 50%;
            margin: 5px;
          }
        }
      }
    }
  }
}

.add-btn{
  position: sticky;
  top: 120px;
  float: right;
  z-index: 1;
  background-color: #E48F6B;
  color: white;
  font-weight: 500;
}
</style>