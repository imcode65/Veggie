<template lang="pug">
.wrapper(ref="wrapper")
  .paging-info.p-2.badge-pill(
    v-if="paths.length > 1 && showPaging",
    :id="guid"
  )
  .my-slick(:id="guid2")
    div(
      v-for="(path, id) in paths" 
    )
      ImgFirebaseLoader(
        v-if="path.startsWith('directSales') || path.startsWith('images') || path.startsWith('users') || path.startsWith('veggie') || path.startsWith('timeline')",
        :showNoImage="true",
        :path="path",
        :modalDisabled="modalDisabled",
        objectFit="cover",
        :key="id"
      )
      ImgUrlLoader.mievegi-image(
        :path="path",
        v-else-if="path.startsWith('http')", 
        objectFit="cover",
        :modalDisabled="true",
        :imgStyle="'width: 100%; object-fit: cover; display: block !important; margin: 0px auto;'",
        :label="new Date().toTimeString().substr(0, 5) + '頃の直売所の様子'",
        :labelStyle="'right: 0; bottom: 0; font-size: 1rem;'",
        :key="id",
        style="width: min(85vw, 618px); margin: 0 auto; display: block;"
      )
      YoutubeLiveStreamLoader(v-else, :youtubeEmbedId="path", :key="id")
    slot(name="noimage")
</template>

<script>
export default {
  data() {
    return {
      guid: "",
      guid2: "",
      showPaging: true,
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
    "link"
  ],
  methods: {
    initialize() {
      this.showPaging = !this.hidePaging;
      this.setSlick();
    },
    setSlick() {
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
  },
  created() {
    if (process.browser) this.guid = this.$guidGenerator();
    if (process.browser) this.guid2 = this.$guidGenerator();
  },
  mounted() {
    this.initialize();
  }
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
  .slick-track {
    & > div {
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
  }
  .my-slick {
    max-height: 500px;
    overflow: hidden;
    margin-bottom: 0px;
  }
</style>

<style lang="css">
.slick-slider {
  -ms-touch-action: auto !important;
  touch-action: auto !important;
}
</style>