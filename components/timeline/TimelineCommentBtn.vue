<template lang="pug">
  .btn.col.d-flex.align-items-center
    i.material-icons.icon.comment(@click="click('コメント')" :style="{fontSize: iconSize}") chat_bubble_outline
    span.ml-2(@click="click('コメント')") {{numOfComments}}
    TimelineCommentModal(
      v-if="isShow"
      :timeline="timeline"
      @close="closeModal"
    )
</template>

<script>
import TimelineCommentModal from "~/components/timeline/TimelineCommentModal";

export default {
  components: {
    TimelineCommentModal
  },
  data() {
    return {
      numOfComments: 0,
      isShow: false,
      scrollLoadListScrollTop: 0,
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
  },
  watch: {
  },
  methods: {
    initialize(){
      this.numOfComments = this.timeline.comments === null ? 0 : Object.keys(this.timeline.comments).length
    },
    closeModal(){
      this.isShow = false;
    },
    showCommentModal(){
      const modalHeight = `${$(window).height() - 240}px`;
      this.$modal.show(
        TimelineCommentModal,
        {
          'timeline': this.timeline,
          'modalWidth': $(window).width() < 850 ?  $(window).width() - 100 : 750
        },
        {
          clickToClose: true,
          width: $(window).width() < 850 ?  $(window).width() - 100 : 750,
          height: modalHeight,
          draggable: false,
          styles: {
            "overflow":"auto",
          }
        }
      )
    },
    async click(message){
      // console.log(message + ':' + this.timeline.id)
      this.showCommentModal()
    },
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
.modal-open {
  overflow: hidden;
}
</style>

