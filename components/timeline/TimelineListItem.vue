<template lang="pug">
.timelineWrapper
  TimelineIntroV2(v-if="timeline", :timeline="timeline") 
</template>

<script>
export default {
  props: ["timeline"],
};
</script>

<style lang="scss" scoped>
  $veggieColor: #be9b69;
  .timelineWrapper {
    width: calc(100vw - 24px);
    /*max-width: 360px;*/
    background-color: white;
    overflow: hidden;
    margin: 12px;
  }

  @media screen and (min-width:1024px) { 
    .timelineWrapper {
      max-width: 600px;
      background-color: white;
    }
  }
</style>

