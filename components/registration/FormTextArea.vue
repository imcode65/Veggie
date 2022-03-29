<template lang="pug">
  div(style="width: 90%; margin: auto;")
    ValidationProvider(:rules="rules" v-slot="{errors}")
      label.mb-0.mt-5.text-muted {{label}}
      span.text-danger(v-if="errors[0]") {{errors[0]}}
      textarea.form-control.m-auto(cols="40" rows="5" :name="name" :value="value" @input="$emit('input',$event)" type="text")      
</template>

<script>

export default {
  data(){
    return{
    }
  },
  props: ['rules','errors','label','name', 'value'],
  methods:{

  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
  .form-control{
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.54);
    border-radius: 0;
  }
</style>