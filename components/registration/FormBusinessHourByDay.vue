<template lang="pug">
  .d-flex.justify-content-around.flex-wrap(style="border-bottom: 1px solid #A7A7A7;")
    .w-50.text-center.font16.daystxt {{dayName}}
    .w-50.text-center.font16.daystxt
      label(v-if="businessHourByDay && businessHourByDay.inputType == 1") 24時間
      label(v-if="businessHourByDay && businessHourByDay.inputType == 3") 休業
      label(v-if="businessHourByDay && businessHourByDay.inputType == 0") {{businessHourByDay.dayHour.start}} ~ {{businessHourByDay.dayHour.end}}
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props: ['dayName', 'businessHourByDay'],
}
</script>


<style lang="scss" scoped>
.font16{
font-size: 1rem;
   
}

.daystxt{
padding: 6px 0;
    top: 50%;
    transform: translateY(10%);
}
</style>
