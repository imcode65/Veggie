<template lang="pug">
.wrapper
  ImgFirebaseLoader.user-bk(
    :path="user.backgroundImagePath"
    objectFit="cover" 
    :modalDisabled="true"
  )
  ImgFirebaseLoader.mypage-icon(
    :path="user.imageStoragePath"
    objectFit="cover" 
    :modalDisabled="true"
  )
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  methods: {
    
  },
  props: ['user'],
  // computed: {
  //   ...mapGetters({
  //     user: 'userDetail/user'
  //   }),
  // },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>