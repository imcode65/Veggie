<template lang="pug">
  .wrapper
    .narrow
      Loading(ref="loading")
      Slick.directsale-slick.mt-0(
          v-if="slickPaths.length != 0"
          :paths="slickPaths"
          :slidesToShow="1"
          :autoplay="false"
          :dots="slickPaths.length>1"
          :fade="false"
          :hidePaging="true"
          :speed="1000"
          cssEase="ease-in")
        template(#noimage)
          PhotoGallaryInputImage(:directSale="directSale" @showGallary="showGallary")
      PhotoGallaryInputImage(v-if="directSale && slickPaths.length == 0" :directSale="directSale" @showGallary="showGallary")
      DirectSaleIntro(v-if="directSale" :directSale="directSale")
        template(#accessory)
          DirectSaleLikeBtn.like-btn(:directSale="directSale" :btnEnabled="true")
          FavoriteBtn(:directSale="directSale")
          CheckInButton(v-if="directSale" :directSale="directSale")
      .pt-3.w-100(v-if="directSale")
        ComponentTab(:selected="selected" :tabs="tabs" @changeTab='changeTab')
        Overview(v-if="selected === 'こだわり'" :directSale="directSale")
        keep-alive
          Review(v-if="selected === 'みんなの投稿'" :directSale="directSale")
        keep-alive
          PhotoGallary(v-if="selected === '写真'", :directSale="directSale")
</template>

<script>
import { mapGetters } from "vuex";
import * as businessHour from "~/plugins/library/businessHour";

export default {
  data() {
    return {
      id: this.$route.params.id,
      selected: '',
      tabs: ["最新情報", "こだわり", 'みんなの投稿', "写真"],
      // directSale: {},
    }
  },
  head() {
    return {
      titleTemplate: `直売所詳細|${this.directSale?.name}` 
    }
  },
  computed: {
    ...mapGetters({
      // ds: 'directSales/directSaleDetail/directSale',
      directSale: 'directSales/directSaleDetail/directSale',
      currentLocation: 'currentLocation/currentLocation',
      currentUserUid: 'currentUser/uid'
    }),
    currentTime: () => {
      return businessHour.currentTime();
    },
    slickPaths() {
      const ret = []
      if(this.directSale?.realtimeview?.youtubeEmbedId) ret.push(this.directSale.realtimeview.youtubeEmbedId)
      if(this.directSale?.realtimeview?.imagePath) ret.push(this.directSale.realtimeview.imagePath)
      this.directSale?.imageStoragePaths?.map(p => {if(p !== '') ret.push(p)})
      this.directSale?.userUploadImages?.map(item => { if(!item.deleted && item.imageStoragePath) ret.push(item.imageStoragePath)})

      ret.slice(0,5)
      return ret
    }
  },
  methods: {
    async initializeState() {
      const loading = this.$refs.loading;
      loading.startLoading();
      await this.$store.dispatch('directSales/directSaleDetail/initializeState', this.id)
      loading.finishLoading()
      this.$store.dispatch("directSales/directSaleDetail/increaseWatchCount", this.id)
    },
    changeTab(tab){
      this.selected = tab
    },
    showGallary() {
      this.selected = '写真'
    }
  },
  layout: "index",
  //リセットしないと次の直売所詳細で画像が正しくロードされない
  beforeRouteLeave(to, from, next) {
    // this.$store.dispatch('directSales/directSaleDetail/resetSnapshot')
    this.$store.commit('directSales/directSaleDetail/RESET_STATE_DIRECTSALEDETAIL')
    this.$store.commit('posts/directSaleReviews/RESET_STATE_DIRECTSALEREVIEW')
    if(this.$refs.latestInfo) this.$refs.latestInfo.prepareToExit()
    next()
  },
  mounted() {
    this.selected = "こだわり";
    this.initializeState();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  font-family: "Noto Sans JP", sans-serif;
  max-width: 1200px;
  // margin-left: auto;
  // margin-right: auto;
  .narrow {
    max-width: 600px;
    .top-images {
      .imgLoader {
        width: 80vw;
        height: 56vw;
        max-width: 500px;
        max-height: 350px;
        padding: 0 0.25rem;
      }
    }
    .like-btn {
      position: absolute;
      right: 15px;
      top: 45px;
      
      padding-left: 5px;
      padding-right: 5px;
      margin-left: 0;
      margin-right: 0;
      padding-top: 0px;
      margin-top: 10px;
      padding-bottom: 0;
      border-radius: 1000px;
      background: #F1EEF1;
      font-size: 12px;
      height: 24px;
    }
    .edit-btn {
      position: absolute;
      top: 95px;
      right: 0px;
    }
    @media screen and (max-width: 400px) {
      .like-btn {
        right: 15px;
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .wrapper {
    margin-top: 1.5rem;
  }
}
</style>
