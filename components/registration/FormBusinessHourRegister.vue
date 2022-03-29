<template lang="pug">
    div.popup
      .text-center
        a.position-absolute(href="#" @click.prevent="$emit('close')" style="top: 0; right: 0;")
          i.material-icons(style="color: #ccc; font-size: 2rem;") clear
      .p-3
      .m-auto.center-block(style="width: 200px")
      FormBusinessHourRegisterByDay(dayName="monday" dayJpName="月曜日" :businessHourFieldProp="businessHourFields.monday" @businessHourChanged="onBusinessHourFieldChanged")
      FormBusinessHourRegisterByDay(dayName="tuesday" dayJpName="火曜日" :businessHourFieldProp="businessHourFields.tuesday" @businessHourChanged="onBusinessHourFieldChanged")
      FormBusinessHourRegisterByDay(dayName="wednesday" dayJpName="水曜日" :businessHourFieldProp="businessHourFields.wednesday" @businessHourChanged="onBusinessHourFieldChanged")
      FormBusinessHourRegisterByDay(dayName="thursday" dayJpName="木曜日" :businessHourFieldProp="businessHourFields.thursday" @businessHourChanged="onBusinessHourFieldChanged")
      FormBusinessHourRegisterByDay(dayName="friday" dayJpName="金曜日" :businessHourFieldProp="businessHourFields.friday" @businessHourChanged="onBusinessHourFieldChanged")
      FormBusinessHourRegisterByDay(dayName="saturday" dayJpName="土曜日" :businessHourFieldProp="businessHourFields.saturday" @businessHourChanged="onBusinessHourFieldChanged")
      FormBusinessHourRegisterByDay(dayName="sunday" dayJpName="日曜日" :businessHourFieldProp="businessHourFields.sunday" @businessHourChanged="onBusinessHourFieldChanged")
      FormBusinessHourRegisterByDay(dayName="publicHoliday" dayJpName="祝日" 　:businessHourFieldProp="businessHourFields.publicHoliday" @businessHourChanged="onBusinessHourFieldChanged")
      .p-3.float-right
        button.btn.btn-lg.vg-color(@click="registerHours") 登録
</template>

<script>
import {mapGetters} from 'vuex'
import {InputHourType} from '~/constants/'

export default {
  data(){
    return{
      // フォームに入力されたデータはここに格納する
      businessHourFields: {
        monday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        tuesday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        wednesday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        thursday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        friday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        saturday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        sunday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
        publicHoliday: {
          dayHour: {
            start: '',
            end: '',
          },
          inputType: InputHourType.is_open
        },
      }
    }
  },
  props: ['businessHoursProp'],
  computed: {
    ...mapGetters({
      businessHours: 'directSales/directSaleRegistrationByUser/businessHours',
    }),
  },
  created() {
    this.businessHourFields = JSON.parse(JSON.stringify(this.businessHoursProp))
  },
  methods: {
    onBusinessHourFieldChanged(businessHourField, dayName){
      // console.log('onBusinessHourFieldChanged');
      this.businessHourFields[dayName] = businessHourField
    },
    updateBusinessHour(){
      // console.log('updateBusinessHour');
      this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_BUSINESS_HOURS`, this.businessHourFields);
    },
    //正しいフォーマットで入力されているか
    checkHoursInput(){
      let passed = true
      Object.keys(this.businessHourFields).forEach(day => {
        const regex = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$')
        // if((this.businessHourFields[day].inputType == InputHourType.is_open) && ((!regex.test(this.businessHourFields[day].dayHour.start)) || (!regex.test(this.businessHourFields[day].dayHour.end)))){
        if((this.businessHourFields[day].inputType == InputHourType.is_open) && (!regex.test(this.businessHourFields[day].dayHour.start)|| !regex.test(this.businessHourFields[day].dayHour.end))){
          // console.log('check failed')
          passed = false
        }
      })
      return passed
    },
    registerHours(){
      // if(!this.checkHoursInput()){
      //   return
      // }
      this.updateBusinessHour()
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss" scoped>
.timepicker-wrapper {
  z-index: 999;
}
.ui-corner-all{
  font-size: 1rem;
}
  .vg-color{
    color: white;
    background: #BE9B69;
    border: none;
  }
  .error{
    color: red;
  }
  
  .popup{
  max-width:1000px;
  margin:0 auto;
  }
</style>