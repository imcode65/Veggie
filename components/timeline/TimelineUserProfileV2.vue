<template lang="pug">
  nuxt-link.link(:to="'/users/'+userId")
    div.row(style="width: 100%;")
      .col-3
        ImgFirebaseLoader.user-icon(
          :path="imageStoragePath",
          objectFit="cover",
          :modalDisabled="true"
        )
      .col-9(style="display: flex; align-items: center;")
        span {{ name }}
    p.row.lightGray.header-line(v-if="createdAt") {{ getTime(createdAt) }}
    p(style="margin-bottom: 0;" v-html="autoLink(content)")
</template>

<script>
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'

export default {
  props: ["timeline", "name", "createdAt", "imageStoragePath", "userId", "watchCount", "content"],
  methods: {
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp)
    },
    autoLink(text) {
      return text
        ? text.replace(
            /(https?:\/\/[^\s\/]*)(\/[^\s]{1,12})?([^\s]*)/g,
            "<a href='$1$2$3' target='_blank' rel='noopener noreferrer'>$1$2...</a>"
          )
        : "";
    },
  }
};
</script>

<style lang="scss" scoped>
.link{
  color: #212529;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.link:hover {
  text-decoration: none;
}
.timeline-image > img {
  width: 100%;
  height: 200px;
}
.header-line {
  padding: 1rem 0 0 0;
  margin: 0;
}
.user-icon {
  height: 3rem !important;
  width: 3rem !important;
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
  position: absolute;
  right: 1rem;
  top: 1rem;
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

