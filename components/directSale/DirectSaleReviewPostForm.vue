<template lang="pug">
ValidationObserver.post-form(v-slot="{invalid}")
  FormHeader(title="この直売所に関する投稿" icon="clear" buttonName="投稿" :rightButtonInvalid="invalid" @actionLeft="$emit('close')" @actionRight="sendPost")
  .p-3.w-100 
    ImgInputList(:image="image" :image2="image2" :image3="image3" @onChangeImage="onChangeImage" @deleteImage="onDeleteImage")
    ValidationProvider(rules="required|max:200" v-slot="{errors}")
      .row.pt-3.mb-0.text-muted.textarea-header
        .col-6 情報詳細(200文字以下)*
          .text-danger {{ errors[0] }}
        .col-4
        .col-2 {{content.length}}/200
      textarea.form-control.m-auto(type="text" cols="40" rows="5" name="CONTENT" :value="content" @input="onInputChange")
</template>

<script>
import {mapGetters} from 'vuex'
import firebase from '~/plugins/firebase'
import PointGetModal from '../directSale/Detail/PointGetModal.vue'


export default {
  data(){
    return{
    }
  },
  props: ['postProp', 'directSale'],
  computed: {
    ...mapGetters({
      post: 'posts/directSaleReviewPostForm/post',
      // directSale: 'directSales/directSaleDetail/directSale',
      currentUser: 'currentUser/currentUser',
      content: 'posts/directSaleReviewPostForm/content',
      image: 'posts/directSaleReviewPostForm/image',
      image2: 'posts/directSaleReviewPostForm/image2',
      image3: 'posts/directSaleReviewPostForm/image3',
    }) 
  },
  methods: {
    async initialize(){
      this.$store.commit(`posts/directSaleReviewPostForm/RESET_STATE_DIRECTSALEREVIEWPOST`)
      // postPropが定義されている＝既存の投稿を編集しようとしている
      // その場合は既存の投稿内容をストアに反映させる
      if(this.postProp && this.postProp.id != ''){
        this.$store.commit(`posts/directSaleReviewPostForm/STATE_INITIALIZATION_FOR_UPDATE`, this.postProp)
      }
      this.directSale?.id ? this.$store.commit(`posts/directSaleReviewPostForm/UPDATE_DIRECTSALE_ID`, this.directSale.id)
                  : this.$emit('close')
    },
    onInputChange(e){
      const input = e.target;
      this.$store.commit(`posts/directSaleReviewPostForm/UPDATE_${input.name}`, input.value);
    },
    //イメージが登録されたらそのpath名を確定する。実際に登録するのはsubmitされたとき
    onChangeImage(e) {
      const file = e.target.files[0]
      const name = e.target.name
      if (!file) return false ``
      this.$store.commit(`posts/directSaleReviewPostForm/UPDATE_${name}`, file)
      const reader = new FileReader()
      reader.onload = e => {
        this.$store.commit(`posts/directSaleReviewPostForm/UPDATE_${name}_BLOB`, e.target.result)  
      }
      reader.readAsDataURL(file)
    },
    onDeleteImage(e){
      // console.log('DirectSaleReviewPostForm/onDeleteImage');
      const name = e.target.attributes.name.nodeValue
      this.$store.commit(`posts/directSaleReviewPostForm/UPDATE_${name}`, '')
      this.$store.commit(`posts/directSaleReviewPostForm/UPDATE_${name}_PATH`, '')
      this.$store.commit(`posts/directSaleReviewPostForm/UPDATE_${name}_BLOB`, '') 
    },
    async sendPost(){
      await this.$store.dispatch("posts/directSaleReviewPostForm/uploadImages");
      this.$emit("close");
      const response = await this.$store.dispatch("point/getPoint", { type: 'postComment', infoId: this.directSale.id});
      this.showPointGetModal(response)
    },
    showPointGetModal(response){
      const modalWidth = $(window).width() < 800 ? $(window).width() - 80 : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'


      const imagePath = this.directSale.imageStoragePaths[0] !== '' 
                ? this.directSale.imageStoragePaths[0]
                : this.directSale.userUploadImages?.find(image => image.deleted == false)
                ? this.directSale.userUploadImages?.find(image => image.deleted == false).imageStoragePath
                : '' 

      this.$modal.show(PointGetModal, {
        response, 
        imagePath, 
        caption: this.directSale.name, 
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
    firebase.auth().onAuthStateChanged(async user => {
      if(user){
        this.initialize()
      }
      else{
        //ユーザーがログインしてなかったらページ遷移する。
        this.$router.push('/mypage/');
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.post-form{
  color: #232426;
  font-size: 20px;
  .textarea-header {
    font-size: 12px;
  }
}
</style>