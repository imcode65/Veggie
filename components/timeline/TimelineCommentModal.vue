<template lang="pug">
div.modal-main(
  @touchstart="touchStart"
  @touchmove="touchMove"
  @touchend="touchEnd"
)
  div.modal-wrapper(style="align-items: center;")
    div.modal-title {{"投稿"}}
    i.material-icons.icon.close-icon.mr-2(@click="clickClose") close
  div(style="flex-grow: 1; flex-shrink: 1; overflow: auto;")

    div.timeline-content-back
      TimelineContentV2.timeline-content(
        v-if="timeline" 
        :timeline="timeline"
      )
    div.comment-content(
      v-if="timeline.comments !== null"
      style="overflow: auto;"
    )
      TimelineCommentContent(
        v-for="(comment, index) in sortDesc(timeline.comments)" 
        :key="comment.value.date.nanoseconds" 
        :timeline="timeline"
        :commentId="comment.key"
        :comment="comment.value"
      )
    div.comment-content(
      v-if="timeline.comments === null || (timeline.comments && Object.keys(timeline.comments).length <= 0)"
      style="text-align: center;"
    ) {{'コメントはまだありません'}}
  TimelineCommentPostForm.post-form(
    :timeline="timeline"
    :modalWidth="modalWidth"
  )
</template>

<script>

export default {
  props: ['timeline','modalWidth'],
  data() {
    return {
      startY: 0
    }
  },
  methods: {
    sortDesc(comments) {
      let array = Object.keys(comments).map((k)=>({key: k, value: comments[k]}))
      return array.sort((a, b) => b.value.date.nanoseconds - a.value.date.nanoseconds)
    },
    touchStart(e){
      this.startY = e.touches[0].pageY;
    },
    touchMove(e){
      let threathord = $(window).height()/2;
      let moveY = e.touches[0].pageY - this.startY;
      if(threathord < moveY){
        this.$emit('close')
        return;
      }
    },
    touchEnd(e){
    },
    clickClose(){
      this.$emit('close')
    }
  },
  mounted() {
    console.log(this.timeline)
  },
}
</script>

<style lang="scss" scoped>

.modal-wrapper {
  display: flex;
  background-color: white;
}

.modal-main {
  background-color: #f1f1f1;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.modal-title {
  text-align: center;
  vertical-align: middle;
  line-height: 40px;
  width: 100%;
}

.close-icon {
  width: 24dp;
  margin-right: 0px;
}

.timeline-content-back {
  background-color: white;
  padding: 1rem;
}

.timeline-content {
  margin-top: 10px;
  padding: 0 1rem 0 1rem;
  background-color: white;
}

.comment-content {
  background-color: #f1f1f1;
//  box-shadow: 0 3px 2px 1px #636363;
  min-height: 70px;
}


</style>

