<template lang="pug">
  .wrapper(@click="$emit('action')") 
    slot(name="image") 
</template>

<script>
export default {
  methods:{

  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    position: absolute;
    left: 16px;
    bottom: -40px;
  }
  @media screen and (min-width:1024px) { 
    .wrapper{
      background: #f2f3f5;
    }
  }
</style>