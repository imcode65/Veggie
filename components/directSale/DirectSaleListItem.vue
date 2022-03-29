<template lang="pug">
.storeWrapper(style="position: relative")
  .content(@click="moveToDetail", style="cursor: pointer; display: flex; flex-direction: column; justify-content: center; background-color: gray; height: 350px; border-radius: 12px") 
    YoutubeLiveStreamLoader(
      v-if="directSale && directSale.realtimeview && directSale.realtimeview.youtubeEmbedId",
      :youtubeEmbedId="directSale.realtimeview.youtubeEmbedId",
    )
    ImgUrlLoader(
      v-else-if="directSale && directSale.realtimeview && directSale.realtimeview.imagePath",
      :path="directSale.realtimeview.imagePath",
      objectFit="cover",
      :modalDisabled="true"
    )
    ImgFirebaseLoader(
      v-else-if="directSale",
      :path="imageStoragePath",
      objectFit="cover",
      :modalDisabled="true"
    )
    DirectSaleIntro(v-if="directSale", :directSale="directSale")
      template(#accessory)
  div.watch_count(style="position: absolute; bottom: 65px; right: 15px; width: 50px; display: flex; justify-content: space-evenly; align-items: center; padding: 0.375rem 0.75rem; color: white;")
    i.material-icons.icon remove_red_eye
    span.ml-1 {{ directSale.watch_count }}
  DirectSaleLikeBtn.like-btn(:directSale="directSale", :btnEnabled="true")
  DirectSaleReviewIcon(:directSale="directSale")
</template>                               

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  props: ["directSale"],
  computed: {
    ...mapGetters({
      currentUser: "currentUser/currentUser",
    }),
    imageStoragePath() {
      // const path = this.directSale.imageStoragePaths?.find(
      //   (path) => path != ""
      // );
      // if (path) return path;

      // const img = this.directSale.userUploadImages?.find(
      //   (img) => img.imageStoragePath && !img.deleted
      // );
      // if (img) {
      //   return img.imageStoragePath;
      // }
      let ret = [];
      this.directSale?.imageStoragePaths?.map(p => { if(p !== '') ret.push(p)});
      this.directSale?.userUploadImages?.map(item => { if(!item.deleted && item.imageStoragePath) ret.push(item.imageStoragePath)});
      
      return ret.length > 0 ? ret[0] : "";
    },
  },
  methods: {
    moveToDetail() {
      //this.$router.push({path: `directSales/${this.directSale.id}`, params: {directSale: this.directSale}})

      this.$router.push(`/directSales/${this.directSale.id}`);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.storeWrapper {
  position: relative;
  background-color: white;
  width: 30%;
  max-width: 456px;
  margin: 10px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 1px 0 4px grey;
  .content {
    margin-bottom: 32px;
  }
}
.like-btn {
  position: absolute;
  bottom: 10px;
  right: 20px;
  width: 50px !important;
}
@media screen and (max-width: 1023px) {
  .storeWrapper {
    width: 90%;
  }
}
.watch_count .material-icons {
  font-size: 1rem !important;
}
</style>

