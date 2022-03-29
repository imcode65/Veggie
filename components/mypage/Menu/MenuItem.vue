<template lang="pug">
  .item(@click="$emit('action')") 
    slot(name="image") 
    p {{displayText}}
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
.item p {
  color: #BE9B69;
  padding: 0.75rem 0;
  margin: 0;
  font-size: 14px;
}
</style>