<template lang="pug">
  div
    ValidationProvider(:rules="rules" v-slot="{errors}")
      label.ml-4.mb-0.mt-5.text-muted {{label}}
      span.ml-4.text-danger(v-if="errors[0]") {{errors[0]}}
      select.d-block.selectbt(:name="name" :value="value" @input="$emit('input',$event)")
        option(v-for="(option, id) in options" :key="id") {{option}}
</template>

<script>

export default {
  data(){
    return{
    }
  },
  props: ['rules','errors','label','name', 'value', 'options'],
  methods:{

  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
  .form-control{
    width: 90%;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.54);
  }
  
  .selectbt {
    margin:1rem 0 0 1.5rem;
    font-size: 1rem;
    padding: 4px;

}
</style>