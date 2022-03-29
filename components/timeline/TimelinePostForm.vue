<template lang="pug">
ValidationObserver.post-form(v-slot="{ invalid }")
  FormHeader(
    title="タイムラインに投稿",
    icon="clear",
    buttonName="投稿",
    :rightButtonInvalid="invalid",
    @actionLeft="$emit('close')",
    @actionRight="sendPost"
  )
  .p-3.w-100 
    ImgInputList.mr-3.ml-3(
      :image="image",
      :image2="image2",
      :image3="image3",
      @onChangeImage="onChangeImage",
      @deleteImage="onDeleteImage"
    ) 
    ValidationProvider(rules="required|max:200", v-slot="{ errors }")
      .row.pt-3.mb-0.text-muted.textarea-header
        .col-6 情報詳細(200文字以下)*
          .text-danger {{ errors[0] }}
        .col-4
        .col-2 {{content.length}}/200
      textarea.form-control.m-auto(
        type="text",
        cols="40",
        rows="5",
        name="CONTENT",
        :value="content",
        @input="onInputChange"
      )
</template>

<script>
import { mapGetters } from "vuex";
import PointGetModal from '~/components/directSale/Detail/PointGetModal.vue'

export default {
  props: ["postProp"],
  computed: {
    ...mapGetters({
      timelineId: "timelinePostForm/id",
      content: "timelinePostForm/content",
      image: "timelinePostForm/image",
      image2: "timelinePostForm/image2",
      image3: "timelinePostForm/image3",
    }),
  },
  methods: {
    async initialize() {
      this.$store.commit(`timelinePostForm/RESET_STATE_TIMELINEPOST`);
      // postPropが定義されている＝既存の投稿を編集しようとしている
      // その場合は既存の投稿内容をストアに反映させる
      if (this.postProp && this.postProp.id != "") {
        this.$store.commit(
          `timelinePostForm/STATE_INITIALIZATION_FOR_UPDATE`,
          this.postProp
        );
      }
    },
    onInputChange(e) {
      const input = e.target;
      this.$store.commit(`timelinePostForm/UPDATE_${input.name}`, input.value);
    },
    //イメージが登録されたらそのpath名を確定する。実際に登録するのはsubmitされたとき
    onChangeImage(e) {
      const file = e.target.files[0];
      const name = e.target.name;
      if (!file) return false;
      this.$store.commit(`timelinePostForm/UPDATE_${name}`, file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$store.commit(
          `timelinePostForm/UPDATE_${name}_BLOB`,
          e.target.result
        );
      };
      reader.readAsDataURL(file);
    },
    onDeleteImage(e) {
      const name = e.target.attributes.name.nodeValue;
      this.$store.commit(`timelinePostForm/UPDATE_${name}`, "");
      this.$store.commit(`timelinePostForm/UPDATE_${name}_BLOB`, "");
    },
    async sendPost() {
      await this.$store.dispatch("timelinePostForm/uploadImages");
      this.$emit("close");
      const response = await this.$store.dispatch("point/getPoint", { type: 'postTimeline', infoId: this.timelineId});
      if(response.type === 'success') this.showPointGetModal(response)
    },
    showPointGetModal(response){
      const modalWidth = $(window).width() < 800 ? $(window).width() - 80 : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'
      this.$modal.show(PointGetModal, {
        response, 
        imagePath: "", 
        caption: '投稿ありがとうございます！', 
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
    this.initialize();
  },
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
.textarea-header {
  font-size: 12px;
}
textarea {
  max-height: 150px;
}
</style>