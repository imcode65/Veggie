<template lang="pug">
.icon-wrapper(@click="click")
  ImgFirebaseLoader.user-icon(
    v-if="user.id !== currentUser.id" 
    :path="user.imageStoragePath" 
    objectFit="cover" 
    :modalDisabled="true"
  )
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){　
    return{
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
    }),
  },
  props: ['user'],
  methods: {
    click(){
      // console.log('icon clicked');
      this.$router.push(`./users/${this.user.id}`)
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  .icon-wrapper{
    display: table-cell;
    padding-bottom: 10px;
    .user-icon{
      width: 20vw !important;
      height: 20vw !important;
      margin-left: 2.5vw;
      margin-right: 2.5vw;
    }
    @media screen and (min-width:1024px) { 
      .user-icon{
        width: 6vw;
        height: 6vw;
        margin-left: 0.5vw;
        margin-right: 0.5vw;
        max-width: 70px;
        max-height: 70px;
      }
    }
  }


</style>

