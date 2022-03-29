<template lang="pug">
ValidationObserver.post-form(v-slot="{ invalid }")
  FormHeader(
    title="写真を投稿する",
    icon="clear",
    buttonName="投稿",
    :rightButtonInvalid="invalid",
    @actionLeft="$emit('close')",
    @actionRight="sendPost"
  )
  .container
    ImgInput.photo-gallary(
      :imgPath="null",
      :imgBlob="image.blob",
      name="IMAGE",
      @onChangeImage="onChangeImage($event)",
      @deleteImage="onDeleteImage($event)"
    )

</template>

<script>
import { mapGetters } from "vuex";
import PointGetModal from '~/components/directSale/Detail/PointGetModal.vue'


export default {
  props: ["postProp"],
  computed: {
    ...mapGetters({
      image: "directSales/photoGallaryPostForm/image",
    }),
  },
  methods: {
    //イメージが登録されたらそのpath名を確定する。実際に登録するのはsubmitされたとき
    onChangeImage(e) {
      // console.log('onChangeImage start')
      const file = e.target.files[0];
      const name = e.target.name;
      if (!file) return false;
      this.$store.commit(`directSales/photoGallaryPostForm/UPDATE_${name}`, file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$store.commit(
          `directSales/photoGallaryPostForm/UPDATE_${name}_BLOB`,
          e.target.result
        );
      };
      reader.readAsDataURL(file);
    },
    onDeleteImage(e) {
      const name = e.target.attributes.name.nodeValue;
      this.$store.commit(`directSales/photoGallaryPostForm/UPDATE_${name}`, "");
      this.$store.commit(`directSales/photoGallaryPostForm/UPDATE_${name}_BLOB`, "");
      setTimeout(() => {
          location.reload()
      }, 3000)
    },
    async sendPost() {
      this.$store.commit(`directSales/photoGallaryPostForm/UPDATE_DIRECT_SALE_ID`, this.postProp.id);
      await this.$store.dispatch("directSales/photoGallaryPostForm/uploadImages");
      await this.$store.dispatch("directSales/photoGallaryPostForm/sendPost");
      this.$emit("close");

      const response = await this.$store.dispatch("point/getPoint", { type: 'addDirectSaleImage', infoId: this.postProp.id});
      this.showPointGetModal(response)
      setTimeout(() => {
          location.reload()
      }, 3000)
    },
    showPointGetModal(response){
      const modalWidth = $(window).width() < 800 ? $(window).width() - 80 : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'  

      this.$modal.show(PointGetModal, {
        response, 
        imagePath: "", 
        caption: "画像投稿ありがとうございます！", 
        showAnimation: false,
      }, {
        clickToClose: true,
        width: modalWidth,
        // width: '80%',
        height: 'auto',
        // height: modalHeight- 150,
        scrollable: true
      })
      setTimeout(() => {
        document.getElementsByClassName('vm--container')[0].style.zIndex = 2000
      }, 100)
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.post-form {
  color: #232426;
  font-size: 1.3rem;
}

</style>