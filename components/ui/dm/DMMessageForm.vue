<template lang="pug">
div
  ValidationObserver.p-2.mg-form(v-slot="{invalid}")
    ValidationProvider.textarea-wrapper(rules="required" v-slot="{errors}" style="block")
      textarea.textarea.form-control.m-auto( rows="1" :value="message" @input="onInputChange" type="text")
    i.material-icons.icon.float-right(@click="sendDM" :disabled="invalid") send
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      sending: false
    }
  },
  props: ['toUserId'],
  computed: {
    ...mapGetters({
      message: 'dm/dmForm/message',
    }),
  },
  methods: {
    onInputChange(e) {
      const input = e.target
      this.$store.commit(`dm/dmForm/UPDATE_MESSAGE`, input.value)
    },
    async sendDM() {
      if (this.sending) return
      this.sending = true;
      await this.$store.dispatch('dm/dmForm/sendDM', this.toUserId)
      this.sending = false;
    }
  },
}
</script>

<style lang="scss" scoped>
.mg-form{
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 3px solid #f2f3f5;
  .textarea-wrapper{
    width: 80%;
    textarea{
      width: 100%;
      background-color: #f2f3f5;
      border-radius: 10px;
    }
  }
  .icon{
    cursor: pointer;
    color: #BE9B69;
  }
}
</style>