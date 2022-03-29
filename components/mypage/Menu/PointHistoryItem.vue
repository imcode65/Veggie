<template lang="pug">
  .wrapper(@click="$emit('action')") 
    slot(name="image") 
    div {{displayText}}
</template>

<script>
export default {
  props: ['displayText'],
  methods:{

  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
  }
</style>