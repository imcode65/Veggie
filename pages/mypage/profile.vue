<template lang="pug">     
  FormWrapper.profile-edit(@buttonOnClick="update" buttonName="更新")
    template(#header="header")
      FormHeader.fixed-top(title="プロフィール編集" icon="clear" buttonName="更新" :rightButtonInvalid="header.invalid" @actionLeft="$router.push('/mypage/')" @actionRight="update")
    template(#form-content)
      .div(style="display: flex;")
        ImgInput.text-center.user-icon.m-auto(:imgPath="image.path" :imgBlob="image.blob" name="IMAGE" @onChangeImage="onChangeImage" @deleteImage="onDeleteImage") 
        BackImgInput.text-center.user-icon.m-auto(:imgPath="backImage.path" :imgBlob="backImage.blob" name="BACKIMAGE" @onChangeImage="onChangeImage" @deleteImage="onDeleteImage") 
      FormGroup(title="プロフィール編集")
        template(#input)
          FormInput(rules="required" :errors="{errors}" label="お名前*" name="NAME" :value="name" @input="onInputChange")
          FormInput(:errors="{errors}" label="自己紹介*" name="INTRODUCTION" :value="introduction" @input="onInputChange")
          FormInput(:errors="{errors}" label="リンク*" name="URL" :value="url" @input="onInputChange")
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      errors: '',
    }
  },
  computed: {
    ...mapGetters({
      userIdToUpdate: 'updateUserProfile/userIdToUpdate',
      name: 'updateUserProfile/name',
      url: 'updateUserProfile/url',
      introduction: 'updateUserProfile/introduction',
      image: 'updateUserProfile/image',
      backImage: 'updateUserProfile/backImage',
      imageStoragePath: 'updateUserProfile/imageStoragePath',
    }),
  },
  methods: {
     async update(){
      try{
         await this.$store.dispatch('updateUserProfile/uploadImages', this.$store.state.updateUserProfile)
         await this.$store.dispatch('updateUserProfile/uploadBackImages', this.$store.state.updateUserProfile)
      }
      catch(e){
        alert('画像をアップロードできませんでした。5M以下の画像でお試しください')
      }
      await this.$store.dispatch('updateUserProfile/update', this.$store.state)
          .then((docRef) => {
            // console.log('更新できました。')
            alert('更新できました。')
            if(docRef) {
              // console.log('Document written with ID: ', docRef.id);
            }
            this.$router.push('/mypage/');
          })
          .catch((error) => {
            // console.log(error)
            // console.log('更新に失敗しました。')
            alert('更新に失敗しました。お手数ですが、時間を空けて再度お願いします。')
          })
    },
    //フォームのインプットに入力されたらstoreのstateをアップデートする
    onInputChange(e){
      const input = e.target
      this.$store.commit(`updateUserProfile/UPDATE_${input.name}`, input.value)
    },
    //イメージが登録されたらそのpath名を確定する。実際に登録するのはsubmitされたとき
    async onChangeImage(e) {
      const file = e.target.files[0]
      const name = e.target.name
      if (!file) return false
      this.$store.commit(`updateUserProfile/UPDATE_${name}`, file)
      const reader = new FileReader()
      reader.onload = e => {
        this.$store.commit(`updateUserProfile/UPDATE_${name}_BLOB`, e.target.result)  
      }
      reader.readAsDataURL(file)
    },
    onDeleteImage(e){
      const name = e.target.attributes.name.nodeValue
      this.$store.commit(`updateUserProfile/UPDATE_${name}`, '')
      this.$store.commit(`updateUserProfile/UPDATE_${name}_BLOB`, '')  
    },
    
    async onChangeBackImage(e) {
      const file = e.target.files[0]
      const name = e.target.name
      if (!file) return false
      this.$store.commit(`updateUserProfile/UPDATE_${name}`, file)
      const reader = new FileReader()
      reader.onload = e => {
        this.$store.commit(`updateUserProfile/UPDATE_${name}_BLOB`, e.target.result)  
      }
      reader.readAsDataURL(file)
    },
    onDeleteBackImage(e){
      const name = e.target.attributes.name.nodeValue
      this.$store.commit(`updateUserProfile/UPDATE_${name}`, '')
      this.$store.commit(`updateUserProfile/UPDATE_${name}_BLOB`, '')  
    },

    async initializeState(user){
      await this.$store.dispatch('updateUserProfile/initializeState',user)
    },
  },
  mounted(){
    firebase.auth().onAuthStateChanged(async user => {
      if(user){
         this.initializeState(user)
      }
      else{
        //ユーザーがログインしてなかったらページ遷移する。
      this.$router.push('/mypage/');
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.profile-edit {
  display: block;
  padding-top: 50px;
}
</style>