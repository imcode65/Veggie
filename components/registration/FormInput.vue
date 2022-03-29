<template lang="pug">
  div.m-auto(style="width:90%")
    ValidationProvider(
      :rules="rules" 
      v-slot="{errors}" 
    )
      label.mb-0.text-muted(
        v-if="label && label!==''"
        style="margin-top: 16px;"
      ) {{label}}
      span.ml-4.text-danger(
        v-if="errors[0]"
      ) {{errors[0]}}
      input.form-control.m-auto(
        :name="name" 
        :value="value" 
        @input="$emit('input',$event)" 
        type="text"
      )         
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
    background-color: #fafafa;
  }
</style>