<template lang="pug">
    nav.container-fluid.navbar-light.bg-dark.text-white
      span.d-inline {{message}}
      a.text-white(v-if="linkState==='公開'" :href="link") {{link}}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: ['invalid'],
  computed: {
    ...mapGetters({
      adminInformation: 'adminInformation/adminInformation',
      message: 'adminInformation/message',
      link: 'adminInformation/link',
      linkState: 'adminInformation/linkState',
    }),
  },
  methods: {
    async initializeState(){
      await this.$store.dispatch('adminInformation/initializeState')
    },
  },
  mounted() {
    // 管理者からのお知らせを上部に表示したい場合は下記を実行
    // this.initializeState()
  }
}
</script>

<style lang="scss" scoped>
  nav{
    font-size: 1rem;
  }

</style>

