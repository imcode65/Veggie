<template lang="pug">
.timelineWrapper(@click="moveToDetail")
  .d-flex.flex-column.position-relative.w-100(style="height: 350px;")
    .imgWrapper(style="display: flex; flex-direction: column; justify-content: center; background-color: gray; height: 350px;")
      ImgFirebaseLoader(v-if="timeline" :path="imageStoragePath")
    .content-wrapper.position-absolute.w-100.h-100
      .user-info.text-center.pt-5
        ImgFirebaseLoader.user-icon(
          :path="timeline.userImageStoragePath",
          objectFit="cover",
          :modalDisabled="true"
        )
        .name.p-2.text-center.mx-auto {{ timeline.userName }}
      .timeline-info
        .main.p-2(v-if="timeline && timeline.content") {{ timeline.content }}
        .controlWrapper
          a.text-white(
            style="margin-bottom: 0px; font-size: 0.7rem;"
            v-if="timeline.createdAt"
          ) {{ getTime(timeline.createdAt) }}
          .row
            TimelineLikeBtn.icon.heart(style="font-size: 0.7rem !important; padding: 0.2rem;" :timeline="timeline" iconSize="17px")
            TimelineCommentBtn.icon.comment(style="font-size: 0.7rem !important;" :timeline="timeline" iconSize="17px")
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
  width: 32%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  display: inline-block;
  border-radius: 1rem;
  overflow: hidden;

  .imgWrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    img {
      width: auto;
      height: 350px;
      border-radius: 1rem;
    }
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .user-info {
      flex-shrink: 1;
      flex-grow: 1;
      flex-direction: column;
      color: white;
      text-shadow: 0px 2px 2px black;
      margin-bottom: 0;
      .user-icon {
        width: 3rem !important;
        height: 3rem !important;
      }
      .name {
        font-size: 1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        line-height: 2;
      }
    }
    .timeline-info {
      flex-shrink: 0;
      flex-grow: 0;
      width: 100%;
      .controlWrapper{
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
        .heart {
          color: white;
        }
        .comment {
          color: white;
        }
      }
    }
  }
  .main {
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
    color: white;
    line-height: 1.7;
  }
}
</style>

