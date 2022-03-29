<template lang="pug">
    .message.d-none(ref="message") {{message}}
</template>

<script>
export default {
  data(){
    return{
      messageDOM: '',
    }
  },
  props: ['message'],
  methods:{
    showMessage(){
      this.messageDOM.classList.remove('d-none')
    },
  },
  mounted() {
    this.messageDOM = this.$refs.message
  },
}
</script>

<style lang="scss" scoped>
  .message{
    padding-top: 40vh;
    text-align: center;
  }
</style>
