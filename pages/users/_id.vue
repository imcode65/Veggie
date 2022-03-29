<template lang="pug">
  .wrapper
    .image-wrapper.pcfloat(v-if="user")
      ImgFirebaseLoader.user-icon(:path="user.imageStoragePath" objectFit="cover") 
    UserIntroDetail(v-if="user" :user="user")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  head() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'userDetail/user'
    }),
  },
  methods: {
    async initializeState () {
      await this.$store.dispatch('userDetail/initializeState', this.id)
      this.title = this.user.name

      this.$store.dispatch("userDetail/increaseWatchCount", this.id)
    },
  },
  layout: 'index',
  //リセットしないと次のユーザ詳細で古いデータが表示される
  beforeRouteLeave (to, from, next) {
    this.$store.commit('userDetail/RESET_STATE_USERDETAIL')
    next()
  },
  mounted () {
    this.initializeState()
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    font-family: 'Noto Sans JP', sans-serif;
    max-width: 1200px;
    margin-left:auto;
    margin-right:auto;
    .image-wrapper {
      margin-top: 30px;
      text-align: center;
      .user-icon {
        width: 32vw !important;
        height: 32vw !important;
        max-width: 250px;
        max-height: 250px;
      }
    }
  } 
  .pcfloat {
    clear:left;
  }
  
  @media screen and (min-width:1024px) { 
    .pcfloat{
      float:left;
      width:30%;
    }
  }
</style>

