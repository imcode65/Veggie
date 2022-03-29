<template lang="pug">
  .d-block(style="overflow-x: scroll; white-space: nowrap; width: 100%;")
    .image-list(style="display: flex; ")
      slot(name="image")
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    async initializeState(){
    }
  },
  mounted() {
    this.initializeState()
  }
}
</script>

<style lang="scss" scoped>
  // .d-block::-webkit-scrollbar {    /* Chrome、Safari用 */
  //   // display:none;
  // }
</style>

