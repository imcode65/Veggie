<template lang="pug">
no-ssr
  ValidationObserver(v-slot="{invalid}")
    slot(name="header" :invalid="invalid")
    form.form-content.mypage.pt-4.ml-auto.mr-auto.pb-4(@submit.prevent="$emit('next')" onkeydown="return event.key != 'Enter';")
      slot(name="form-content")     
      .btn-gr(v-if="buttonName && buttonName!==''")
        button.btn.btn-lg.vg-color(:disabled="invalid" @click="$emit('buttonOnClick')") {{buttonName}}
</template>
<script>
export default{
  props: ['buttonName', 'eventName']
}
</script>
<style lang="scss" scoped>

  .form-content {
    overflow: auto;
    button{
      background-color: #BE9B69;
      color: white;
    }
  }
  .btn-gr {
    width: 90%;
    margin: auto;
    text-align: right;
  }

</style>  