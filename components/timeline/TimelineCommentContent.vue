<template lang="pug">
  div.content
    TimelineUserProfile.profile(v-if="user"
        :name="username"
        :imageStoragePath="imagePath"
        :commentId="commentId"
        :userId="comment.userId"
        :comment="comment"
        :createdAt="comment.date"
    )
    div.count
      i.material-icons.icon remove_red_eye
      span.ml-1 {{ timeline.watch_count }}
    div.del-icon(v-if="comment.userId === uid" @click="removeComment(timeline, commentId)")
      div.material-icons.icon.more_horiz more_horiz
    div.body(v-html="autoLink(comment.contents)")
</template>
<script>

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      slickPaths: [],
      username: '',
      imagePath: '',
    }
  },
  props: ['timeline', 'commentId', 'comment'],
  computed: {
    ...mapGetters({
      user: 'userDetail/user',
      uid: "currentUser/uid",
    }),
  },
  watch: {
  },
  methods: {
    async initializeState(){
      await this.$store.dispatch('userDetail/initializeState', this.comment.userId)
      this.username = this.user.name
      this.imagePath = this.user.imageStoragePath
    },
    async removeComment(timeline, targetId){
      if(confirm("コメントを消去しますか？\nこの操作は取り消せません。")){
        this.$delete(timeline.comments, String(targetId));
        if(timeline.comments && Object.keys(timeline.comments).length == 0){
          this.$set(timeline, 'comments', null);
        }
        this.$store.commit(`timelinePostForm/REMOVE_COMMENT`, {timeline: timeline, targetId: targetId})
        this.$store.dispatch("timelinePostForm/removeComment")
      }
    },
    autoLink(text) {
      return text
        ? text.replace(
            /(https?:\/\/[^\s\/]*)(\/[^\s]{1,12})?([^\s]*)/g,
            "<a href='$1$2$3' target='_blank' rel='noopener noreferrer'>$1$2...</a>"
          )
        : "";
    },
  },
  mounted() {
    this.initializeState();
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: white;
  margin: 5px auto;
  border-radius: 10px;
  width: 95%;
  position: relative;
}

.profile {
  margin: auto 0px;
  padding-top: 10px;
}

.body{
  padding: 10px 10px;
  white-space: pre-wrap;
  word-wrap:break-word;
}

.count {
  position: absolute;
  display: flex;
  align-items: center;
  right: 1rem;
  top: 1rem;
}

.del-icon {
  position: absolute;
  top: 1rem;
  right: 4rem;
}
</style>

