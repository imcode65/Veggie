<template lang="pug">
  .list-group.mb-4
    slot(name="item")
</template>

<script>
export default {
  props: ['menuItemProps'],
  methods:{
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>

</style>