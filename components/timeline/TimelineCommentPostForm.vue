<template lang="pug">
div(:style="footerStyle")
  textarea.commentInput(
    ref="COMMENT"
    v-model="comment"
    placeholder="投稿文を入力"
    @keydown="adjustHeight"
    wrap="soft")
  div(style="width: 10%; display: flex; justify-content: center; align-items: center;")
    i.material-icons.icon.send.commentSend(
      @click="sendPost"
    ) send
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ['timeline', 'modalWidth'],
  data() {
    return {
      comment: '',
      footerDefaultHeight: 52,
      footerHeight: 0,
      scrollHeight: 0,
      row: 1,
    }
  },
  watch: {
    comment() {
      this.resizeFooter()
    },
  },
  computed: {
    ...mapGetters({
      uid: "currentUser/uid",
    }),
    footerStyle: {
      get() {
        // console.log('getter footerStyle: ' + this.footerHeight)
        return {
            // "position": "fixed", /* 要素の位置を固定する */
            "bottom": "0", /* 基準の位置を画面の一番下に指定する */
            "width": "100%", /* 幅を指定する */
            "height": this.footerHeight + "px",
            "box-sizing": "border-box",
            "background-color": "white",
            "text-align": "center",
            "display": "flex",
            "align-items": "center",
            "padding": "1rem"
        }
      },
      set(footerHeight){
        // console.log('setter: ' + this.footerHeight)
        this.footerHeight = footerHeight
      }
    },
  },
  methods: {
    async initialize() {
      this.footerHeight = this.footerDefaultHeight + 58
      // this.scrollHeight = document.getElementsByName('COMMENT')[0].scrollHeight
      // console.log('scrollHeight: ' + this.scrollHeight)
    },
    async sendPost() {
      if(!this.$checkAuthenticated()){
        return
      }
      const comments = this.timeline.comments
      let index = 0;
      if(comments === null){
        this.$set(this.timeline, 'comments', [])
      } else {
        Object.keys(comments).forEach(key => {
          const numKey = Number(key)
          if(index < numKey) index = numKey;
        })
        index = index + 1
      }
      const milliseconds = Date.now()
      const postComment = {
        'userId': this.uid,
        'date': {
          "seconds" : milliseconds / 1000, 
          "nanoseconds": milliseconds * 1000000
        },
        'contents': this.comment,
      }

      this.$set(this.timeline.comments, String(index), postComment)

      this.$store.commit(`timelinePostForm/UPDATE_COMMENT`, {id: this.timeline.id, index: index, comment: postComment})
      this.$store.dispatch("timelinePostForm/sendCommentPost")

      this.comment = ''
    },
    adjustHeight(){
      const textarea = this.$refs.COMMENT
      const resetHeight = new Promise(function(resolve) {
        resolve(textarea.style.height = 'auto')
      });
      resetHeight.then(function(){
        textarea.style.height = textarea.scrollHeight + 'px'
      });
    },
    resizeFooter(){
      // comment.split(/\\n/).length
      // const commentInput = document.getElementsByName('COMMENT')[0];

      const commentInput = this.$refs.COMMENT
      this.footerHeight = this.footerDefaultHeight + commentInput.scrollHeight
    },
    // onInput() {
    //   const commentInput = document.getElementsByName('COMMENT')[0];
    //   commentInput.rows = this.row
    //   commentInput.style.height = 'auto'
    //   if(this.scrollHeight < commentInput.scrollHeight) {
    //     commentInput.rows += 1
    //     this.scrollHeight = commentInput.scrollHeight
    //     this.row = commentInput.rows
    //   } else if(this.scrollHeight > commentInput.scrollHeight) {
    //     commentInput.rows -= 1
    //     this.scrollHeight = commentInput.scrollHeight
    //     this.row = commentInput.rows
    //   } else {
    //   }
    //   commentInput.style.hegiht = commentInput.scrollHeight + 'px'
    // }
  },
  mounted() {
    this.initialize();

  },
};
</script>

<style lang="scss" scoped>

.commentInput {
  border-radius: 10px;
  border-color: transparent;
  background-color: whitesmoke;
  padding: 10px;
  width: 90%;
  resize: none;
}

.commentInput:focus {
  outline: none;
}

.commentSend{
  margin-left: 5px;
}
</style>