<template lang="pug">
.mypage.w-100(v-if="timeline")
  TimelineUserProfile.pt-3.pb-2(
    v-if="timeline",
    :name="timeline.userName",
    :imageStoragePath="timeline.userImageStoragePath",
    :userId="timeline.userId",
    :createdAt="timeline.createdAt"
    :watchCount="timeline.watch_count"
  )
  div(v-if="timeline.videoUrls.length > 0 && timeline.videoUrls[0] != null")
    video(
      ref="videoRef",
      width="100%",
      src="",
      controls,
      v-on:mouseover="VideoController(true)",
      v-on:mouseleave="VideoController(false)",
      muted="muted",
    )
  Slick.timeline-slick(
    v-else-if="slickPaths.length != 0",
    :paths="slickPaths",
    :autoplay="false",
    :dots="slickPaths.length > 1",
    :fade="false",
    :speed="200",
    cssEase="ease-in",
    :hidePaging="true"
  )
  div(style="margin: 0.5rem 1rem 0rem 1rem")
    p(v-html="autoLink(timeline.content)")
  div(v-if="timeline.urls.length > 0")
    div(v-for="(url, id) in timeline.urls" :key="id")
      a.no-decoration(:href="url", target="_blank", rel="noopener noreferrer")
        link-prevue(:url="url", cardWidth="100%", :showButton="false")
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      url: "",
      slickPaths: [],
    }
  },
  props: ['timeline'],
  computed: {
  },
  watch: {
    
  },
  methods: {
    initialize(){
      if(this.timeline?.imageStoragePaths[0]) 
       this.slickPaths.push(this.timeline?.imageStoragePaths[0])
      if(this.timeline?.imageStoragePaths[1]) 
       this.slickPaths.push(this.timeline?.imageStoragePaths[1])
      if(this.timeline?.imageStoragePaths[2]) 
       this.slickPaths.push(this.timeline?.imageStoragePaths[2])
    },
    autoLink(text) {
      return text
        ? text.replace(
            /(https?:\/\/[^\s\/]*)(\/[^\s]{1,12})?([^\s]*)/g,
            "<a href='$1$2$3' target='_blank' rel='noopener noreferrer'>$1$2...</a>"
          )
        : "";
    },
    setVideoPath() {
      var storage = firebase.storage();
      // console.log(this.timeline);
      var storageRef = storage.ref(
        this.timeline.videoUrls.length > 0 &&
          this.timeline.videoUrls[0] != null
          ? this.timeline.videoUrls[0].path
          : ""
      );
      storageRef
        .getDownloadURL()
        .then((url) => {
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            var blob = xhr.response;
          };
          xhr.open("GET", url);
          // this.$refs[this.guid].setAttribute('src', url)
          this.$refs.videoRef.src = url;
        })
        .catch((error) => {
          // console.log(error);
        });
    },
    VideoController(isHovering) {
      if (isHovering == true) {
        this.$refs.videoRef.play();
        this.$refs.videoRef.muted = false;
      } else if (isHovering == false) {
        this.$refs.videoRef.pause();
        this.$refs.videoRef.muted = true;
      }
    },
  },
  mounted() {
    this.initialize()
    this.setVideoPath()
  }
}
</script>

<style lang="scss" scoped>
.timeline-image > img {
  width: 100%;
  height: 200px;
}

.timeline-slick{
  width: 80vw;
  height: 70vw;
  width: 100%;
  height: 100%;
  padding: 0 0.25rem;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .timeline-image > img {
    width: 100%;
    height: 300px;
  }
}

</style>

