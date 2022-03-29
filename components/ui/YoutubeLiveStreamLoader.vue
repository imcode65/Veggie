<template lang="pug">
.player-container
  #liveStream(
    ref="plyrRef"
    data-plyr-provider="youtube",
    :data-plyr-embed-id="youtubeEmbedId",
  )
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ["youtubeEmbedId"],
  computed: {},
  watch: {},
  methods: {
    initialize() {
      const player = new Plyr("#liveStream", {
        ratio: "16:9",
        captions: {active: true, update: true, language: 'auto'},
        autoplay: true,
        muted: true,
      });
      // console.log(player)
      player.on("ready", () => {
        player.play()
      });
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>

<style lang="scss" scoped>
.player-container {
  margin: 0 auto;
  width: 100%;
  height: auto;
}
</style>

