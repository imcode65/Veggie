<template lang="pug">
  div(style="background: white; display: flex; flex-direction: column; height: 100%;")
    FormHeader.form-header.pt-2.pb-2(
      :title="title",
      icon="clear",
      buttonName="",
      @actionLeft="close",
      @actionRight=""
    )
    .mg-wrapper.pt-2.pb-2(style="flex-grow: 1; flex-shrink: 1;")
      DMMessage(v-if="dmMessages.length !== 0" v-for="(dmMessage, id) in dmMessages" :key="id" :dmMessage="dmMessage" :dmProfile="dmProfile")
    DMMessageForm(:toUserId="toUserId")
    
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  data(){
    return{
      title: '',
      dmMessagesOrdered: []
    }
  },
  props: ['toUserId', 'dmProfile'],
  computed: {
    ...mapGetters({
      dmMessages: 'dm/dmMessages/dmMessages',
      dmDocId: 'dm/dmMessages/dmDocId',
    }),
  },
  methods: {
    async initializeState() {
      this.title = this.dmProfile?.theOtherUser?.name || 'メッセージ'
      const toUserId = this.toUserId ? this.toUserId : ''
      // dmMessagesのdmDocId がdmProfileのidと違う場合のみ、実行する
      // if(this.dmDocId !== this.dmProfile?.id) 
      await this.$store.dispatch("dm/dmMessages/initializeState", toUserId)
      this.adjustStyle()
    },
    adjustStyle(){
      const modalHeight = document.getElementsByClassName('vm--modal')[0].offsetHeight
      const headerHeight = document.getElementsByClassName('form-header')[0].offsetHeight
      const formHeight = document.getElementsByClassName('mg-form')[0].offsetHeight
      const mgWrapper = document.getElementsByClassName('mg-wrapper')[0]
      mgWrapper.style.height = modalHeight - headerHeight - formHeight + 'px'

      mgWrapper.scrollTop = mgWrapper.scrollHeight
      const observer = new MutationObserver(() => {
        mgWrapper.scrollTop = mgWrapper.scrollHeight
      })
      observer.observe(mgWrapper, {childList: true})
    },
    close(){
      // ここでスナップショットを解除しないと、
      // 読んで無いメッセージまで既読となってしまう
      this.$store.dispatch("dm/dmMessages/detachSnapshot")
      this.$emit('close')
    }
  },
  mounted() {
    this.initializeState()
  },
}
</script>

<style lang="scss" scoped>
.mg-wrapper{
  overflow: auto;
}
</style>