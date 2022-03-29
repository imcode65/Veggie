<template lang="pug">
  .p-3.border-bottom
    .d-flex
      label.form-label {{dayJpName}}
    .d-flex.flex-column
      .form-check.m-2
        input.form-check-input(type="radio" :name="dayJpName" :id=`dayJpName + 'IsOpenRadioOption'` v-model="businessHourField.inputType" value=0)
        .d-flex
          input.d-block.m-auto.timepicker.timepicker-open(:id="guid" style="width: 30%" placeholder="開店時間" v-model="businessHourField.dayHour.start" @click="changeInputTypeToIsOpen()" :name="dayJpName") 
          input.d-block.m-auto.timepicker.timepicker-close(:id="guid2" style="width: 30%" placeholder="閉店時間"  v-model="businessHourField.dayHour.end" @click="changeInputTypeToIsOpen()" :name="dayJpName") 
      .form-check.m-2
        input.form-check-input(type="radio" :name="dayJpName" :id=`dayJpName + 'Is24RadioOption'` v-model="businessHourField.inputType" value=1 @click="resetHours()")
        label.form-check-label(:for=`dayJpName + 'Is24RadioOption'`) 24時間
      .form-check.m-2
        input.form-check-input(type="radio" :name="dayJpName" :id=`dayJpName + 'IsClosedRadioOption'` v-model="businessHourField.inputType" value=3 @click="resetHours()")
        label.form-check-label(:for=`dayJpName + 'IsClosedRadioOption'`) 休業
</template>

<script>
import {InputHourType} from '~/constants/'

export default {
  data() {
    return{
      guid: '',
      guid2: '',
      businessHourField: {
        dayHour: {
          start: '',
          end: '',
        },
        inputType: InputHourType.is_open
      },
    }
  },
  props: ['dayName', 'dayJpName', 'businessHourFieldProp'],
  watch: {
    businessHourField:{
      handler(val){
        this.$emit('businessHourChanged', val, this.dayName)
      },
      deep: true
    }
  },
  methods:{
    setTimer(){
      $(`#${this.guid}, #${this.guid2}`).timepicker({
          timeFormat: 'G:i',
          minTime: '4:00am',
          maxTime: '11:00pm',
          show2400: true,
          dropdown: true,
          scrollbar: true
      });
      $(`#${this.guid}, #${this.guid2}`).click(() => {
        //この設定がないとモーダルの下に時間が表示されてしまう
        $(".ui-timepicker-container.ui-timepicker-standard").css(
          "z-index", 999
        )
      })
      $(`#${this.guid}`).change((e) => {
        this.businessHourField.dayHour.start = e.target.value
        $(`#${this.guid2}`).timepicker({
          timeFormat: 'G:i',
          minTime: this.businessHourField.dayHour.start,
          maxTime: '11:00pm',
          show2400: true,
          dropdown: true,
          scrollbar: true
        });
      })
      $(`#${this.guid2}`).change((e) => {
        this.businessHourField.dayHour.end = e.target.value
      })
    },
    resetHours(){
      this.businessHourField.dayHour.start = ''
      this.businessHourField.dayHour.end = ''
    },
    changeInputTypeToIsOpen(){
      this.businessHourField.inputType = InputHourType.is_open
    },
  },
  created(){
    this.guid = this.$guidGenerator()
    this.guid2 = this.$guidGenerator()
    this.businessHourField = JSON.parse(JSON.stringify(this.businessHourFieldProp))
  },
  mounted(){
    this.setTimer()
  }
}
</script>

<style lang="scss" scoped>

</style>