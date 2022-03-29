<template lang="pug">
  .list-wrapper(@click="moveTo()")

    .ranking.text-center {{index + 1}}位
    .icon 
        ImgFirebaseLoader.m-1.user-icon(
                :path="user.imageStoragePath"
                objectFit="cover" 
                :modalDisabled="true"
              )
    .name {{user.name}}
    .point {{user.points}}pt
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
    }
  },
  props: ['user', 'index'],
  methods:{
    moveTo(){
      this.$router.push(`/users/${this.user.id}`)
    },
  },
  computed: {
    ...mapGetters({
      // totalRankedInUsers: 'pointRanking/totalRankedInUsers',
    })
  },
  watch: {

  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .list-wrapper{
    display: flex;
    // flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .ranking{
      flex: 2
    }
    .icon{
      flex: 2
    }
    .name{
      flex: 6
    }
    .point{
      flex: 2
    }
  }
</style>