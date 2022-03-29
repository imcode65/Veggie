<template lang="pug">     
div(style="background: white;")
  FormWrapper(@buttonOnClick="register" buttonName="登録")
    template(#header="header")
      FormHeader.form-header(title="直売所登録" icon="clear" buttonName="登録" :rightButtonInvalid="header.invalid" @actionLeft="$emit('close')" @actionRight="register")
    template(#form-content) 
      FormGroup(v-if="directSaleId == ''" title="登録者様情報")
        template(#input)
          FormInput(rules="required" :errors="{errors}" label="姓（全角）*" name="LASTNAME" :value="lastName" @input="onInputChange")
          FormInput(rules="required" :errors="{errors}" label="名（全角）*" name="FIRSTNAME" :value="firstName" @input="onInputChange")
          FormInput(rules="required" :errors="{errors}" label="姓カナ（全角）*" name="LASTNAMEKANA" :value="lastNameKana" @input="onInputChange")
          FormInput(rules="required" :errors="{errors}" label="名カナ（全角）*" name="FIRSTNAMEKANA" :value="firstNameKana" @input="onInputChange")
          FormInput(rules="required|numeric" :errors="{errors}" label="電話番号 *" name="PHONENUMBER" :value="phoneNumber" @input="onInputChange")
      FormGroup(title="直売所情報")
        template(#input)
          FormInput(rules="required" :errors="{errors}" label="直売所名*" name="DIRECTSALE_NAME" :value="directSalesName" @input="onInputChange")
          FormInput(:errors="{errors}" label="直売所名カナ（全角）" name="DIRECTSALE_KANA" :value="directSalesKana" @input="onInputChange")
        FormMap(slot="map")
      FormGroup(title="直売所の位置情報")
        template(#input)
          FormInput(
            rules1="numeric|max:8|min:7" 
            :errors="{errors}" label="郵便番号（半角）" name="DIRECTSALE_POSTALCODE" :value="postalCode" @input="onInputChange")
          FormInput(rules="required" :errors="{errors}" label="都道府県*" name="DIRECTSALE_PREFECTURE" :value="prefecture" @input="onInputChange")
          FormInput(rules="required" :errors="{errors}" label="市区町村*" name="DIRECTSALE_CITY" :value="city" @input="onInputChange")
          FormInput(:errors="{errors}" label="市区町村以降の住所" name="DIRECTSALE_OTHERCITYADDRESS" :value="otherCityAddress" @input="onInputChange")
      FormGroup(title="掲載する直売所の写真" bgColor="gray")
        template(#description) 直売所の見た目がわかったり、雰囲気がわかる写真がおすすめです。<br>実際に足を運ぶ方が探すときの視覚情報にもなります。
      FormGroup(bgColor="gray")
        template(#input)
          ImgInputList.mr-3.ml-3(:image="image" :image2="image2" :image3="image3" @onChangeImage="onChangeImage" @deleteImage="onDeleteImage") 
      FormGroup(title="より詳細な情報")
        template(#input)
          FormBusinessHour(v-if="showBusinessHours").text-muted
          FormTextArea(:errors="{errors}" label="紹介文(200文字以下)" name="DIRECTSALE_DESCRIPTION" :value="description" @input="onInputChange")
          FormInput(rules="max:400" :errors="{errors}" label="URL" name="URL" :value="url" @input="onInputChange")
          //- FormSelect(rules="required" :errors="{errors}" label="直売所の種類" name="DIRECTSALE_CATEGORY" :value="category" :options="['その他','有人直売所','無人直売所','地産地消飲食店','道の駅','JA','自販機']" @input="onInputChange")
          //- FormSelect(:errors="{errors}" label="キャッシュレス対応" name="DIRECTSALE_IS_CASHLESS" :value="isCashless" :options="['可','不可']" @input="onInputChange")
</template>

<script>
import {mapGetters} from 'vuex'
import {API_KEY} from '~/constants/'
import PointGetModal from '~/components/directSale/Detail/PointGetModal.vue'


export default {
  data(){
    return{
      errors: '',
    }
  },
  computed: {
    ...mapGetters({
      directSaleId: 'directSales/directSaleRegistrationByUser/directSaleId',
      directSale: 'directSales/directSaleRegistrationByUser/directSale',
      lastName: 'directSales/directSaleRegistrationByUser/lastName',
      firstName: 'directSales/directSaleRegistrationByUser/firstName',
      lastNameKana: 'directSales/directSaleRegistrationByUser/lastNameKana',
      firstNameKana: 'directSales/directSaleRegistrationByUser/firstNameKana',
      phoneNumber: 'directSales/directSaleRegistrationByUser/phoneNumber',
      directSalesName: 'directSales/directSaleRegistrationByUser/directSalesName',
      directSalesKana: 'directSales/directSaleRegistrationByUser/directSalesKana',
      category: 'directSales/directSaleRegistrationByUser/category',
      postalCode: 'directSales/directSaleRegistrationByUser/postalCode',
      prefecture: 'directSales/directSaleRegistrationByUser/prefecture',
      city: 'directSales/directSaleRegistrationByUser/city',
      otherCityAddress: 'directSales/directSaleRegistrationByUser/otherCityAddress',
      location: 'directSales/directSaleRegistrationByUser/location',
      image: 'directSales/directSaleRegistrationByUser/image',
      image2: 'directSales/directSaleRegistrationByUser/image2',
      image3: 'directSales/directSaleRegistrationByUser/image3',
      businessHours: 'directSales/directSaleRegistrationByUser/businessHours',
      description: 'directSales/directSaleRegistrationByUser/description',
      category: 'directSales/directSaleRegistrationByUser/category',
      isCashless: 'directSales/directSaleRegistrationByUser/isCashless',
      url: 'directSales/directSaleRegistrationByUser/url',
      isPublic: 'directSales/directSaleRegistrationByUser/isPublic',
    }),
    address:  function(){
      return this.prefecture + this.city + this.otherCityAddress
    },
  },
  props: [
    "showBusinessHours"
  ],
  methods: {
    //フォームのインプットに入力されたらstoreのstateをアップデートする
    onInputChange(e){
      const input = e.target
      this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_${input.name}`, input.value)
    },
    //イメージが登録されたらそのpath名を確定する。実際に登録するのはsubmitされたとき
    async onChangeImage(e) {
      const file = e.target.files[0]
      const name = e.target.name
      if (!file) return false
      this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_${name}`, file)
      const reader = new FileReader()
      reader.onload = e => {
        this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_${name}_BLOB`, e.target.result)  
      }
      reader.readAsDataURL(file)
    },
    onDeleteImage(e){
      const name = e.target.attributes.name.nodeValue
      this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_${name}`, '')
      this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_${name}_BLOB`, '')  
    },
    async getLocationFromAddress(){
      await this.$axios.$get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=${API_KEY}`)
     .then(response =>{
        let coord = {}
        coord.latitude = response.results[0].geometry.location.lat
        coord.longitude = response.results[0].geometry.location.lng
        this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_DIRECTSALE_LOCATION`,coord)
      }) 
    },
    async register(){
      try{
        if(this.directSale.location.latitude === undefined){
          await this.getLocationFromAddress()
        }
        await this.$store.dispatch('directSales/directSaleRegistrationByUser/uploadImages')
      }
      catch(e){
        alert('画像をアップロードできませんでした。')
      }
      try{
        let creating = !this.directSaleId;
        creating ? await this.$store.dispatch('directSales/directSaleRegistrationByUser/registerDirectSaleWithTrigger')
                                : await this.$store.dispatch('directSales/directSaleRegistrationByUser/updateInfo')
        // It was updating, should update the detail info of direct sale
        if (!creating) {
          await this.$store.dispatch('directSales/directSaleDetail/initializeState', this.directSaleId)
        }
        this.$emit('close')

        const response = await this.$store.dispatch("point/getPoint", { type: 'addDirectSale', infoId: this.directSaleId});
        this.showPointGetModal(response)

        alert('更新できました。')    
        // location.reload()
      }
      catch(e){
        // console.log(e);
        alert('更新に失敗しました。お手数ですが、時間を空けて再度お願いします。')
      }
    },
    showPointGetModal(response){
      const modalWidth = $(window).width() < 800 ? $(window).width() - 80 : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'

      this.$modal.show(PointGetModal, {
        response, 
        imagePath: "", 
        caption: "直売所登録ありがとうございます", 
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
    adjustStyle(){
      const modalHeight = document.getElementsByClassName('vm--modal')[0].offsetHeight
      const headerHeight = document.getElementsByClassName('form-header')[0].offsetHeight
      const content = document.getElementsByClassName('form-content')[0]
      content.style.height = modalHeight - headerHeight + 'px'
    },
    async initializeState(){
      // console.log("initialize")
      // console.log(this.directSaleId)
      // await this.$store.dispatch('directSales/directSaleRegistrationByUser/initializeStateForUpdate')
      // console.log(this.image.path)
      // console.log(this.image2.path)
      // console.log(this.image3.path)
      setTimeout(() => {
        this.adjustStyle()
      }, 1500)
    },
  },
  mounted(){
    this.initializeState()
  }
}
</script>

<style lang="scss" scoped>
.form-content-wrapper {
    padding-bottom: 50px;
}
.mb--1 {
  margin-bottom: -1rem;
}

</style>