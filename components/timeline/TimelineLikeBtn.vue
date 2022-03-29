<template lang="pug">
  .btn.col.d-flex.align-items-center(
    @click="click('イイネ')"
  )
    i.material-icons(
      v-if="!timelineLiked"
      :style="{fontSize: iconSize}"
    ) favorite_border
    i.material-icons(
      v-else
      :style="{fontSize: iconSize}"
    ) favorite
    span.ml-2 {{ numOfLikedUsers }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      timelineLiked: false,
      numOfLikedUsers: 0,
    }
  },
  props: {
    timeline: {
      type: Object
    },
    iconSize: {
      type: String,
      default: '24px'
    }
  },
  computed: {
    ...mapGetters({
      likedTimelineIdList: 'currentUser/likedTimelineIdList',
    }),
  },
  watch: {
    likedTimelineIdList: {
      immediate: true,
      handler(newList, oldList){
        if(this.timeline) this.timelineLiked = newList.includes(this.timeline.id)
      }
    }
  },
  methods: {
    initialize(){
      // console.log(this.timeline.meta.numOfLikedUsers)
      this.numOfLikedUsers = this.timeline.meta.numOfLikedUsers
    },
    async click(message){
      // console.log(message)
      if(!this.$checkAuthenticated()){
        return
      }
      if(this.timelineLiked){
        await this.$store.dispatch('currentUser/likeTimelineCancel', this.timeline.id)
        this.numOfLikedUsers--
        return
      }
      await this.$store.dispatch('currentUser/likeTimeline', this.timeline.id)
      this.numOfLikedUsers++
    }
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
.heart {
  color: #e48f82;
}

</style>

