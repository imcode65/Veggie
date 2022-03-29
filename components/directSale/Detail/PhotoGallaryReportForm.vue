<template lang="pug">
ValidationObserver.post-form(v-slot="{ invalid }")
  FormHeader(
    title="写真を通報する",
    icon="clear",
    buttonName="通報",
    :rightButtonInvalid="invalid",
    @actionLeft="$emit('close')",
    @actionRight="reportImage"
  )
  .position-relative
    ImgFirebaseLoader(
      :path="postProp.imageStoragePath",
      objectFit="cover",
      style="width: 100%; margin-bottom: 30px"
    )
    span.report-btn.position-absolute(style="left: 0")
      i.material-icons(
        style="color: #dd2e; font-size: calc(100vw - 50px); background-color: #0004",
      ) info
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
    async reportImage() {
      if (this.$checkAuthenticated()) {
        if (this.uid === this.postProp.uid) {
          await this.$store.dispatch(
            "directSales/photoGallaryPostForm/reportPost",
            this.postProp
          );
        }
        this.$emit("close");
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