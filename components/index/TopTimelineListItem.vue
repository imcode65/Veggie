<template lang="pug">
.timelineWrapper(@click="moveToDetail")
  .d-flex.flex-column
    .position-relative
      .imgWrapper
        ImgFirebaseLoader(v-if="timeline" :path="imageStoragePath")
      .controlWrapper
          a.text-white(
            style="margin-bottom: 0px; font-size: 0.7rem;"
            v-if="timeline.createdAt"
          ) {{ getTime(timeline.createdAt) }}
          .row
            TimelineLikeBtn.icon.heart(style="font-size: 0.7rem !important; padding: 0.2rem;" :timeline="timeline" iconSize="17px")
            TimelineCommentBtn.icon.comment(style="font-size: 0.7rem !important;" :timeline="timeline" iconSize="17px")
    .main.p-2(v-if="timeline") {{timeline.content}}
    .footer.p-2.d-flex.w-100.align-items-center.justify-content-start
      .user
        ImgFirebaseLoader.user-icon(
          :path="timeline.userImageStoragePath",
          objectFit="cover",
          :modalDisabled="true"
        )
      .name {{timeline.userName}}
</template>

<script>
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'

export default {
  props: ["timeline"],
  computed: {
    imageStoragePath() {
      const path = this.timeline.imageStoragePaths?.find(
        (path) => path != ""
      );
      if (path) return path;

      const img = this.timeline.userImageStoragePath
      if (img) return img;

      return "";
    },
  },
  methods: {
    moveToDetail() {
      this.$router.push(`/users/${this.timeline.userId}`);
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp)
    }
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
.timelineWrapper {
  width: 23%;
  background-color: white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  display: inline-block;
  border-radius: 1rem;

  .imgWrapper{
    flex: 1;
    img{
      width: 100%;
      height: 200px;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
  }
  .controlWrapper{
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: -4px;
    left: 0px;
    padding: 0 8px;
    width: 100%;
    .material-icons {
      font-size: 17px !important;
    }
  }
  .main{
    display: inline-block;
    width: 100%;
    height: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.5;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .footer{
    position: relative;
    .user{
      .user-icon{
        height: 30px;
        width: 30px;
        margin-right: 8px;
      }
      .name {
        font-size: 1em;
      }
    }
  }
}
.heart {
  color: white !important;
}

.comment,
.sharelink {
  color: white !important;
}
</style>

