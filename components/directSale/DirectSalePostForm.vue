<template lang="pug">
ValidationObserver.post-form(v-slot="{invalid}")
  FormHeader(title="最新情報の投稿" icon="clear" buttonName="投稿" :rightButtonInvalid="invalid" @actionLeft="$emit('close')" @actionRight="sendPost")
  .p-3.w-100 
    .pt-2(v-if="directSaleName" style="font-size: 1rem;") {{directSaleName}}
    ImgInputList(:image="image" :image2="image2" :image3="image3" @onChangeImage="onChangeImage" @deleteImage="onDeleteImage")
    ValidationProvider(rules="required|max:200" v-slot="{errors}")
      div.pt-3.mb-0.text-muted(style="font-size: 1rem;") 情報詳細(200文字以下)*
        .text-danger {{errors[0]}}
      textarea.form-control.m-auto(type="text" cols="40" rows="5" name="DESCRIPTION" :value="description" @input="onInputChange")
</template>

<script>
import {mapGetters} from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data(){
    return{
    }
  },
  props: ['postProp', 'kind'],
  computed: {
    ...mapGetters({
      post: 'posts/directSalePostForm/post',
      directSale: 'posts/directSalePostForm/directSale',
      directSaleId: 'posts/directSalePostForm/directSaleId',
      directSaleName: 'posts/directSalePostForm/directSaleName',
      description: 'posts/directSalePostForm/description',
      image: 'posts/directSalePostForm/image',
      image2: 'posts/directSalePostForm/image2',
      image3: 'posts/directSalePostForm/image3',
    }) 
  },
  methods: {
    async initialize(){
      this.$store.commit(`posts/directSalePostForm/RESET_STATE_DIRECTSALEPOST`)
      // postPropが定義されている＝既存の投稿を編集しようとしている
      // その場合は既存の投稿内容をストアに反映させる
      if(this.postProp && this.postProp.id != ''){
        this.$store.commit(`posts/directSalePostForm/STATE_INITIALIZATION`, this.postProp);
      }
      // ログインユーザの情報から直売所情報を取得し、ストアに保持する
      try{
        await this.$store.dispatch('posts/directSalePostForm/getDirectSale', firebase.auth().currentUser.uid)
      }
      catch(error){
        alert('データを取得できませんでした。お手数ですが、時間を空けて再度お願いします。')
        this.$emit('close')
      }
      this.$store.commit(`posts/directSalePostForm/UPDATE_DIRECTSALE_ID`, this.directSale.id)
      this.$store.commit(`posts/directSalePostForm/UPDATE_DIRECTSALE_NAME`, this.directSale.name)
    },
    onInputChange(e){
      const input = e.target;
      this.$store.commit(`posts/directSalePostForm/UPDATE_${input.name}`, input.value);
    },
    //イメージが登録されたらそのpath名を確定する。実際に登録するのはsubmitされたとき
    onChangeImage(e) {
      const file = e.target.files[0]
      const name = e.target.name
      if (!file) return false
      this.$store.commit(`posts/directSalePostForm/UPDATE_${name}`, file)
      const reader = new FileReader()
      reader.onload = e => {
        this.$store.commit(`posts/directSalePostForm/UPDATE_${name}_BLOB`, e.target.result)  
      }
      reader.readAsDataURL(file)
    },
    onDeleteImage(e){
      const name = e.target.attributes.name.nodeValue
      this.$store.commit(`posts/directSalePostForm/UPDATE_${name}`, '')
      this.$store.commit(`posts/directSalePostForm/UPDATE_${name}_BLOB`, '')  
    },
    async sendPost(){
     try{
        await this.$store.dispatch('posts/directSalePostForm/uploadImages', this.post)
      }
      catch(e){
        alert('画像をアップロードできませんでした。5M以下の画像でお試しください')
      }

      await this.$store.dispatch('posts/directSalePostForm/sendPost', this.post)
      .then((docRef)=>{
        if(docRef) {
          // console.log('Post written with ID: ', docRef.id)
        }
        this.$emit('close')
      })
      .catch((error) => {
        console.error("Error posting: ", error);
      })
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
}
</style>