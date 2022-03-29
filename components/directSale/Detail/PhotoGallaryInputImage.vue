<template lang="pug">
  .d-block
    .p-1.d-inline-block
      .position-relative.last-image-wrapper
        img.d-inline.imgLoader(src="~assets/noimage.jpg" style=`width:100%; object-fit: cover;`)
        button.show-gallary-btn.position-absolute(@click="$emit('showGallary')")
          i.material-icons.icon(:style="iconStyle1")
          p.btn-label もっと見る
        button.upload-image-btn.position-absolute(@click="showPostModal()")
          i.material-icons.icon(:style="iconStyle2")
          p.btn-label 写真を追加
</template>

<script>
import PhotoGallaryPostForm from "~/components/directSale/Detail/PhotoGallaryPostForm";

export default {
  data(){
    return{
      iconStyle1: {
        backgroundImage: `url('${require("@/assets/image_upload.png")}')`,
      },
      iconStyle2: {
        backgroundImage: `url('${require("@/assets/image_upload.png")}')`,
      },
    }
  },
  props: ['directSale'],
  methods: {
    showPostModal(){
      if (this.$checkAuthenticated()) {
        this.$modal.show(
          PhotoGallaryPostForm,
          { postProp: this.directSale },
          {
            clickToClose: true,
            width: $(window).width() - 50,
            height: "auto",
            scrollable: true,
          }
        )
      }
    }
  }   
}
</script>

<style lang="scss" scoped>
  .last-image-wrapper {
    display: inline-block;
  }
  .show-gallary-btn {
    left: 10px;
    top: 150px;
    background: none;
    border: none;
    .icon {
      background-size: 24px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      width: 36px;
      height: 36px;
      border: 2px solid #ffffff;
      border-radius: 50%;
    }
    .btn-label {
      color: #fff;
    }
  }
  .upload-image-btn {
    right: 10px;
    top: 150px;
    background: none;
    border: none;
    .icon {
      background-size: 24px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      width: 36px;
      height: 36px;
      border: 2px solid #ffffff;
      border-radius: 50%;
    }
    .btn-label {
      color: #fff;
    }
  }
</style>

