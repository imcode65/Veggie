<template lang="pug">
  .item.flex(v-if="timeline" @click="click(timeline)") 
    div(style="height: 120px; width: 100%; background: gray; display: flex; align-items: center; overflow: auto; border-radius: 12px")
      ImgFirebaseLoader.img(v-if="timeline.imageStoragePaths && typeof timeline.imageStoragePaths === 'object' && timeline.imageStoragePaths.length && timeline.imageStoragePaths.length > 0" :path="timeline.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      ImgFirebaseLoader.img(v-else path="" objectFit="cover" :modalDisabled="true")
    div
      .text-overflow
        span.time-font {{ getTime(timeline.createdAt) }}
      .content.text-overflow
        p.mb-0.content-font {{timeline.content}}
</template>                               

<script>
import { mapGetters } from 'vuex'
import { getDateTime1FromTimeStamp } from '~/plugins/library/timestampConverter'

import TimelineCommentModal from "~/components/timeline/TimelineCommentModal";

export default {
  data(){　
    return{
    }
  },
  props: ['timeline'],
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
      user: 'userDetail/user'
    }),
  },
  methods: {
    async click(timeline){
      // console.log(message + ':' + this.timeline.id)
      this.showCommentModal(timeline)
    },
    showCommentModal(timeline){
      const modalWidth = $(window).width() < 1000 ? $(window).width() - 80 : '1000px'
      const modalHeight = $(window).height() < 1200 ? $(window).height() - 120 : '1200px'
      this.$modal.show(
        TimelineCommentModal,
        {
          'timeline': timeline,
          'modalWidth': modalWidth
        },
        {
          clickToClose: true,
          width: modalWidth,
          height: modalHeight,
          draggable: false,
          scrollable: true,
          styles: {
            "padding-top": "80px",
            "padding-bottom" : "90px",
            "background-color":"rgba(0, 0, 0, 0.1)",
            "border":"none",
          }
        }
      )
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTime1FromTimeStamp(timestamp)
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .item {
    position: relative;
    cursor: pointer;
    padding: 0 1rem;
    width: 100%;
  }
  .time-font {
    font-size: 12px;
  }
  .content-font {
    font-weight: bold;
    font-size: 15px;
  }
  .text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

