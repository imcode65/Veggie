<template lang="pug">
ValidationObserver.post-form(v-slot="{ invalid }")
  FormHeader(
    title="写真を削除する",
    icon="clear",
    buttonName="削除",
    :rightButtonInvalid="invalid",
    @actionLeft="$emit('close')",
    @actionRight="deleteImage"
  )
  .position-relative
    ImgFirebaseLoader(
      :path="postProp.imageStoragePath",
      objectFit="cover",
      style="width: 100%; margin-bottom: 30px; height: calc(50vw)"
    )
    span.report-btn.position-absolute(style="left: 50%; transform: translate(-50%);")
      i.material-icons(
        style="color: #f22d; font-size: calc(50vw); background-color: #0004",
      ) cancel
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["postProp"],
  computed: {
    ...mapGetters({
      uid: "currentUser/uid",
      image: "directSales/photoGallaryPostForm/image",
    }),
  },
  methods: {
    async deleteImage() {
      if (this.$checkAuthenticated()) {
        if (this.uid === this.postProp.uid) {
          await this.$store.dispatch(
            "directSales/photoGallaryPostForm/deletePost",
            this.postProp
          );
          this.$emit("close");
          location.reload()
        }
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.post-form {
  color: #232426;
  font-size: 1.3rem;
}
.image-upload {
  position: relative;
}
</style>