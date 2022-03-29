<template lang="pug">
    .spinner-border.d-none(ref="loading")
      span.sr-only Loading
</template>

<script>
export default {
  data(){
    return{
      loadingDOM: '',
    }
  },
  methods:{
    startLoading(){
      this.loadingDOM.classList.remove('d-none')
    },
    finishLoading(){
      this.loadingDOM.classList.add('d-none')
      this.$emit('loadingFinished')
    }
  },
  mounted() {
    this.loadingDOM = this.$refs.loading
  },
}
</script>

<style lang="scss" scoped>
  .spinner-border{
    position: absolute;
    left: 50%;
    top: 40vh;
    margin-left: -1rem;
    margin-top: -1rem;
    z-index: 1000;
  }
</style>

