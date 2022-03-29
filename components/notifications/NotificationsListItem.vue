<template lang="pug">
.notificationsWrapper(@click="moveToDetail")
  NotificationsIntro(v-if="notification && !isAdmin", :notification="notification") 
  NotificationsIntroAdmin(v-if="notification && isAdmin", :notification="notification") 
</template>

<script>
export default {
  props: ["notification", "isAdmin"],
  methods: {
    moveToDetail() {
      // this.$router.push(`/timeline/${this.timeline.id}`);
    },
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
.notificationsWrapper {
  width: 100%;
  /*max-width: 360px;*/
  background-color: white;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .notificationsWrapper {
    background-color: white;
  }
}
</style>

