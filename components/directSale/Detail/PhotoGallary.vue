<template lang="pug">
.wrapper
  .section
    h6.textbox.title ユーザーからの投稿写真
    ImgListWrapper.images-wrapper(v-if="userUploadImages")
      template(#image)
        .images( v-for="(image, id) in userUploadImages", :key="id")
          ImgFirebaseLoader.image(
            style="margin-left: auto; margin-right: auto;"
            :path="image.imageStoragePath",
            objectFit="cover"
          )
          span.delete-btn.position-absolute(v-if="image.uid === uid")
            i.material-icons(
              style="color: #ccc; font-size: 1.3rem",
              @click="showDeleteModal(image)"
            ) cancel
          span.report-btn.position-absolute
            i.material-icons(
              style="color: #ccc; font-size: 1.3rem",
              @click="showReportModal(image)"
            ) info
    p.textbox(v-else) まだ投稿写真がありません
  .section
    h6.textbox.title 写真を投稿する
    .button-area
      .btn.image-upload-btn(@click="showPostModal()")
        i.material-icons.icon(:style="iconStyle") 
        span.ml-2 写真を投稿する
    .spacer
</template>

<script>
import PhotoGallaryPostForm from "~/components/directSale/Detail/PhotoGallaryPostForm";
import PhotoGallaryDeleteForm from "~/components/directSale/Detail/PhotoGallaryDeleteForm";
import PhotoGallaryReportForm from "~/components/directSale/Detail/PhotoGallaryReportForm";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      iconStyle: {
        // 背景変更用スタイル
        background: `url('${require("@/assets/image_upload.png")}')`, // 背景読み込み前なので空白
        backgroundSize: "24px",
        backgroundPosition: "50% 50%",
        width: "24px",
        height: "24px",
      },
    };
  },
  props: ["directSale"],
  computed: {
    ...mapGetters({
      uid: "currentUser/uid",
    }),
    userUploadImages() {
      return this.directSale.userUploadImages?.filter((img) => !img.deleted);
    },
  },
  methods: {
    modalWidth() {
      return $(window).width() > 768 ? 768 : $(window).width() - 50
    },
    showPostModal() {
      if (this.$checkAuthenticated()) {
        this.$modal.show(
          PhotoGallaryPostForm,
          { postProp: this.directSale },
          {
            clickToClose: true,
            width: this.modalWidth(),
            height: "auto",
            scrollable: true,
          }
        );
      }
    },
    showDeleteModal(image) {
      if (this.$checkAuthenticated()) {
        this.$modal.show(
          PhotoGallaryDeleteForm,
          { postProp: image },
          {
            clickToClose: true,
            width: this.modalWidth(),
            height: "auto",
            scrollable: true,
          }
        );
      }
    },
    showReportModal(image) {
      if (this.$checkAuthenticated()) {
        this.$modal.show(
          PhotoGallaryReportForm,
          { postProp: image },
          {
            clickToClose: true,
            width: this.modalWidth(),
            height: "auto",
            scrollable: true,
          }
        );
      }
    },
    async deleteImage(image) {
      if (this.$checkAuthenticated()) {
        if (this.uid === image.uid) {
          await this.$store.dispatch(
            "directSales/photoGallaryPostForm/deletePost",
            image
          );
        }
      }
    },
    async reportImage(image) {
      if (this.$checkAuthenticated()) {
        await this.$store.dispatch(
          "directSales/photoGallaryPostForm/reportPost",
          image
        );
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  top: 5px;
  color: #be9b69;
}
.wrapper {
  color: #232426;
  .section {
    h6 {
      margin-bottom: 0;
    }
    .textbox {
      padding: 5px 20px;
      &.title {
        font-weight: 400;
        color: #be9b69;
        background: rgba(190, 155, 105, 0.2);
      }
    }
    .image {
      width: calc(33vw - 0.25rem - 5px);
      height: calc(33vw - 0.25rem - 5px);
      padding: 5px;
    }
    .images {
      position: relative;
      margin: 0;
      span {
        font-size: small;
        text-align: center;
        color: #8e8e8e;
      }
      .delete-btn {
        top: 20px;
        right: 20px;
        cursor: pointer;
      }
      .report-btn {
        bottom: 20px;
        right: 20px;
        cursor: pointer;
      }
    }
    .images-wrapper {
      margin: 0;
    }
  }
}
.lightGray {
  color: #8e8e8e;
}
.button-area {
  text-align: center;
  margin: 30px;
  i {
    color: white;
  }
  .image-upload-btn {
    display: inline;
    width: 240px;
    max-width: 80%;
    text-align: center;
    border: 2px #76c076 solid;
    border-radius: 25px;
    background: #76c076;
    color: darkslategray;
  }
  @media screen and (max-width: 400px) {
    .image-upload-btn {
      width: 30%;
    }
  }
}
.spacer {
  height: 15vh;
}
</style>
