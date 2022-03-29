<template lang="pug">
.layout
  AppHeader(ref="header").fixed-logo-top.is-mobile
  div.is-mobile(style="height: 100px;")
  PCHeader.is-pc.fixed-top
  .is-pc.pc-breadcrumb-margin-top
  Breadcrumb.is-pc.breadcrumb(v-if="$route.name!=='index'" ref="breadcrumb")
  .main.ml-auto.mr-auto(ref="main")
    PCSidebar(ref="sidebar").sidebar.is-pc.ml-auto.mr-auto
    Nuxt.content(ref="nuxt" style="position:relative")
  PCFooter(ref="pcFooter").is-pc
  AppFooter.is-mobile.fixed-bottom
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapGetters } from 'vuex'
// import ogImage from '~/assets/top.jpg'

export default {
  head () {
    return {
      meta: [
        // {hid: 'og:image', property: 'og:image', content: process.env.baseUrl  + ogImage}
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
      currentLocation: "currentLocation/currentLocation",
    }),
  },
  watch:{
    $route: {
      handler(newRoute, oldRoute){
        newRoute.name === 'index' ? this.$refs.main.classList.add('route-index') 
                                    : this.$refs.main.classList.remove('route-index')
      }
    },
  },
  methods: {
    async initializeState(){
      // console.log('@layouts/index/initializeState');
      // await this.$store.dispatch('other/firebaseNormalization/normalizeDMDoc')
      // await this.$store.dispatch('other/firebaseNormalization/normalizeDMMessage')
      // await this.$store.dispatch('other/firebaseNormalization/normalizeDirectSale')
      // await this.$store.dispatch('other/firebaseNormalization/normalizeDirectSaleRegistrations')
      // await this.$store.dispatch('other/firebaseNormalization/normalizeDirectSaleReview')
      // await this.$store.dispatch('other/firebaseNormalization/normalizeTimeline')
      // await this.$store.dispatch('other/firebaseNormalization/updateUserUploadImageRegistrations')
      // await this.$store.dispatch('other/firebaseNormalization/normalizeReview')
      // await this.$store.dispatch('other/firebaseNormalization/log')
      // await this.$store.dispatch('other/firebaseNormalization/normalizeUser')
      // await this.$store.dispatch('other/firebaseNormalization/updateConvenienceDirectSalesMinimized')
            //現在地が設定されていない場合は取得する
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          if(this.currentUser === '') await this.$store.dispatch('currentUser/initializeState', user)
          //未ログイン時にもタイムラインは表示されるのでリセットする必要あり
          await this.$store.commit('timeline/RESET_STATE_TIMELINE')
          await this.$store.dispatch("notifications/initializeState");
          this.$store.dispatch("point/initializePointTotal");
        }
        else{
          await this.$store.dispatch('notifications/detachSnapshot')
          this.$store.commit('currentUser/RESET_STATE_CURRENT_USER')
          this.$store.commit('timeline/RESET_STATE_TIMELINE')
          this.$store.commit('top/userListRecommended/RESET_STATE_TOP_USERLISTRECOMMEND')
          this.$store.commit('dm/dmProfiles/RESET_STATE_DM_DMPROFILE')
          this.$store.commit('dm/dmMessages/RESET_STATE_DM_MESSAGE')
          this.$store.commit('point/RESET_STATE_POINT')
        }
      })
    },
    adjustStyling(){
      // ページがindexだった場合、mainにroute-indexクラスを付加
      if(this.$route.name === 'index') this.$refs.main.classList.add('route-index') 
    }
  },
  created() {
    this.initializeState()
  },
  mounted() {
    this.$store.dispatch("currentLocation/getLastLocation")
    this.$store.dispatch("currentLocation/updateCurrentLocation")
    this.adjustStyling()
  },
}
</script>

<style lang="scss">
@media screen and (max-width: 1023px) { 
  .is-mobile{
    display: block;
  }
  .is-pc{
    display: none;
  }
}
@media screen and (min-width:1024px) { 
  .is-mobile{
    display: none;
  } 
  .is-pc{
    display: block;
  }
}
</style>
<style lang="scss" scoped>
.layout{
  .pc-breadcrumb-margin-top{
    height: 54px;
  }
  .fixed-logo-top {
    position: fixed;
    top: 0px;
    right: 0;
    left: 0;
    z-index: 1040;
    transition: 2s all ease-out;
  }
  .main{
    position:relative; 
    width: 100%; 
    max-width: 1200px;
    // min-height: 150vh;
    min-height: 100vh;
    // margin-top: 100px;
    display: flex;
    justify-content: space-between;
  }
  @media screen and (max-width: 1023px) { 
    .main{
      .content{
        width: 100%;
        padding-bottom: 60px;
      }
    }
  }
  @media screen and (min-width:1024px) { 
    .main{
      margin-top: 0px;
      // min-heightを指定しないとロードが完了するまでフッターが上に来てしまう
      .sidebar{
        display: block;
        width: 20%;
      }
      .content{
        width: 76%;
      }
      &.route-index{
        .sidebar{
          display: none;
        }
        .content{
          width: 100%;
        }
      }
    }
  }
}
</style>
