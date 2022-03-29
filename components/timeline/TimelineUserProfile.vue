<template lang="pug">
  nuxt-link.link.row(:to="'/users/'+userId")
    .col-2
      ImgFirebaseLoader.user-icon(
        :path="imageStoragePath",
        objectFit="cover",
        :modalDisabled="true"
      )
      //- img.user-icon(v-else, src="https://placeimg.com/196/196/people")
    .col-8
      p.row.header-line {{ name }}
      p.row.lightGray.header-line(v-if="createdAt") {{ getTime(createdAt) }}
    .col-2
      //- div.del-icon(v-if="userId === uid" @click="removeComment(timeline, commentId)")
      //-   div.material-icons.icon.more_horiz more_horiz
</template>

<script>
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'
import { mapGetters } from 'vuex'

export default {
  props: ["name", "createdAt", "imageStoragePath","userId", "commentId", "comment"],
  computed: {
    ...mapGetters({
      user: 'userDetail/user',
      uid: "currentUser/uid",
    }),
  },
  methods: {
    async initializeState(){
      await this.$store.dispatch('userDetail/initializeState', this.comment.userId)
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp)
    },
  },
  mounted(){

  }
};
</script>

<style lang="scss" scoped>
.link{
  color: #212529;
}
.link:hover {
  text-decoration: none;
}
.timeline-image > img {
  width: 100%;
  height: 200px;
}
.header-line {
  padding: 0;
  margin: 0;
}
.user-icon {
  height: 2.5rem !important;
  width: 2.5rem !important;
  border-radius: 50%;
}
.lightGray {
  color: #8e8e8e;
  font-size: 0.8rem;
}
.count {
  font-size: 12px;
  border-radius: 1000px;
  background: #F1EEF1;
  width: fit-content;
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  height: 24px;
  display: flex;
  align-items: center;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
}
.count span {
  // position: absolute;
  // top: 6px;
  // right: 12px;
}
</style>

