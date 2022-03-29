<template lang="pug">
.wrapper(ref="wrapper")
  .paging-info.p-2.badge-pill(
    v-if="paths.length > 1 && showPaging",
    :id="guid"
  )
  .my-slick(:id="guid2")
    div(class="left-handler" @click="leftSlideHandler()")
      i.time-icon.material-icons.icon arrow_left
    div(class="right-handler" @click="rightSlideHandler()")
      i.time-icon.material-icons.icon arrow_right
    ImgFirebaseLoader(
      v-if="paths[currentShowId] && (paths[currentShowId].startsWith('directSales') || paths[currentShowId].startsWith('images') || paths[currentShowId].startsWith('users') || paths[currentShowId].startsWith('veggie') || paths[currentShowId].startsWith('timeline'))",
      :showNoImage="false",
      :path="paths[currentShowId]",
      :modalDisabled="modalDisabled",
      objectFit="cover",
    )
    ImgUrlLoader.mievegi-image(
      :path="paths[currentShowId]",
      v-else-if="paths[currentShowId] && paths[currentShowId].startsWith('http')", 
      objectFit="cover",
      :modalDisabled="true",
      :imgStyle="'width: 100%; object-fit: cover; display: block !important; margin: 0px auto;'",
      :label="new Date().toLocaleTimeString() + '頃の直売所の様子'",
      :labelStyle="'left: calc(100% - 11.5rem); bottom: 0; font-size: 1rem; position: relative !important;'",
      style="width: min(85vw, 618px); margin: 0 auto; display: block; position: unset;"
    )
    YoutubeLiveStreamLoader(v-else-if="paths[currentShowId]", :youtubeEmbedId="paths[currentShowId]")
    slot(v-else name="noimage")
  div(style="display: flex;justify-content: center;")
    div(
      style="margin: 10px; width: 5px; height: 5px; border-radius: 1000px; border: 1px solid gray;"
      :style="id === currentShowId ? 'background: gray;' : ''" 
      v-for="(path,id) in [...paths, 0]" 
      :key="id"
    )

</template>

<script>
export default {
  data() {
    return {
      guid: "",
      guid2: "",
      showPaging: true,
      currentShowId: 0,
    };
  },
  props: [
    "paths",
    "hidePaging",
    "autoplay",
    "dots",
    "fade",
    "speed",
    "cssEase",
    "slidesToShow",
    "centerMode",
    "modalDisabled",
  ],
  methods: {
    initialize() {
      this.showPaging = !this.hidePaging;
      this.setSlick();
    },
    setSlick() {
      return
      var $status = $(`#${this.guid}`);
      var $slickElement = $(`#${this.guid2}`);

      $slickElement.on(
        "init reInit afterChange",
        function (event, slick, currentSlide, nextSlide) {
          let i = (currentSlide ? currentSlide : 0) + 1;
          $status.text(i + "/" + slick.slideCount);
        }
      );
      // this.autoplay = false
      $slickElement.slick({
        // lazyLoad: 'ondemand',
        slidesToShow: this.slidesToShow !== undefined ? this.slidesToShow : 1,
        autoplay: this.autoplay !== undefined ? this.autoplay : false,
        dots: this.dots !== undefined ? this.dots : true,
        centerMode: this.centerMode !== undefined ? this.centerMode : false,
        infinite: false,
        speed: this.speed !== undefined ? this.speed : 1000,
        fade: this.fade !== undefined ? this.fade : true,
        cssEase: this.cssEase !== undefined ? this.cssEase : "linear",
      });
      setTimeout(() => {
        this.$refs.wrapper.classList.add("position-relative");
      }, 100);
    },
    leftSlideHandler() {
      // console.log("Left")
      if (this.paths) {
        if (this.currentShowId === 0) {
          this.currentShowId = this.paths.length;
        } else {
          this.currentShowId --;
        }
      }
    },
    rightSlideHandler() {
      // console.log("Right")
      if (this.paths) {
        // console.log(this.paths)
        if (this.paths.length > this.currentShowId) {
          this.currentShowId ++;
        } else {
          this.currentShowId = 0;
        }
      }
    },
  },
  created() {
    if (process.browser) this.guid = this.$guidGenerator();
    if (process.browser) this.guid2 = this.$guidGenerator();
  },
  mounted() {
    this.initialize();
  },
};
</script>

<style lang="scss" scoped>
  .paging-info {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    background: #be9b69;
    z-index: 1;
  }
  .my-slick {
    height: 470px;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    & > .left-handler {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 100;
      border: 1px solid white;
      border-radius: 1000px;
      width: 26px;
      height: 26px;
    }
    & > .right-handler {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 100;
      border: 1px solid white;
      border-radius: 1000px;
      width: 26px;
      height: 26px;
    }
  }
  @media screen and (max-width: 620px) { 
    .my-slick {
      height: 75vw;
    }
  }
</style>