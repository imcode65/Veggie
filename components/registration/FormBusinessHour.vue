<template lang="pug">
  div.m-auto(style="max-width:600px; width: 90%;")
    FormLabel.veggiec(label="営業時間")
    .font-weight-bold.text-center.edit(style="position:relative;")  編集する
      i.material-icons.icon.d-inline(style="position:absolute; top: 0; padding-left: 5px;" @click="showHourModal") mode_edit
    FormBusinessHourByDay(v-if="businessHours" dayName="月曜日", :businessHourByDay="businessHours.monday")
    FormBusinessHourByDay(v-if="businessHours" dayName="火曜日", :businessHourByDay="businessHours.tuesday")
    FormBusinessHourByDay(v-if="businessHours" dayName="水曜日", :businessHourByDay="businessHours.wednesday")
    FormBusinessHourByDay(v-if="businessHours" dayName="木曜日", :businessHourByDay="businessHours.thursday")
    FormBusinessHourByDay(v-if="businessHours" dayName="金曜日", :businessHourByDay="businessHours.friday")
    FormBusinessHourByDay(v-if="businessHours" dayName="土曜日", :businessHourByDay="businessHours.saturday")
    FormBusinessHourByDay(v-if="businessHours" dayName="日曜日", :businessHourByDay="businessHours.sunday")
    FormBusinessHourByDay(v-if="businessHours" dayName="祝日", :businessHourByDay="businessHours.publicHoliday")
</template>

<script>
import {mapGetters} from 'vuex'
import FormBusinessHourRegister from '~/components/registration/FormBusinessHourRegister'

export default {
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters({
      businessHours: 'directSales/directSaleRegistrationByUser/businessHours',
    })
  },
  methods:{
    showHourModal(){
      const modalWidth = $(window).width() < 1000 ? $(window).width() - 100 : '900px'
      const modalHeight = $(window).height() < 1200 ? $(window).height() - 120 : '1080px'
      
      this.$modal.show(
        FormBusinessHourRegister, 
        {businessHoursProp: this.businessHours}, 
        {
          clickToClose: true,
          width: modalWidth,
          height: modalHeight,
          // scrollable: true
        }
      )
      // heightを上記にてauto以外に設定してしまうとscrollable: true
      // が効かなくなってしまうので手動で設定する
      setTimeout(() => {
        document.getElementsByClassName('vm--modal')[1].style.overflow = 'scroll'
      }, 100)
    }
  }
}
</script>

<style scoped>
.veggiec{
color: #BE9B69;
    font-weight: bold;
    font-size: 1rem;
}

.edit{
font-size: 1rem;
margin: 1.5rem auto;
}

</style>
