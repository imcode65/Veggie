<template lang="pug">
  div
    Loading(ref="loading")
    WindowScrollLoadList(v-if="myTimelines && typeof myTimelines === 'object' && myTimelines.length != 0" :items="myTimelines" numOfItemsPerLoad=10)
      template(#list="list")
        .grid-sales
          TimelineItem(ref="store" v-if="list.itemsToShow" v-for="(timeline, id) in list.itemsToShow" :timeline="timeline" :key="id")
    //- NotReadyMessage(ref="message" message="タイムラインがありません")
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      //現在地から近い順に並び替えられた直売所リスト
      refMine: [],
    }
  },
  head() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      myTimelines: 'timeline/myTimelines',
    }),
  },
  methods: {
    async initializeState(){
      const loading = this.$refs.loading
      loading.startLoading()
      
      let promises = []
      promises.push(this.$store.dispatch("timeline/fetchMyTimelines"))
      await Promise.all(promises)

      loading.finishLoading()
    },
  },
  mounted(){
    this.initializeState()    
  }
}

</script>


<style lang="scss" scoped>
.grid-sales {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-gap: 2px;
}
@media screen and (max-width: 1023px) {
  .grid-sales {
    grid-template-columns: 25% 25% 25% 25%;
  }
}
@media screen and (max-width: 768px) {
  .grid-sales {
    grid-template-columns: 32% 32% 32%;
  }
}
@media screen and (max-width: 576px) {
  .grid-sales {
    grid-template-columns: 50% 50%;
  }
}
@media screen and (max-width: 368px) {
  .grid-sales {
    grid-template-columns: 100%;
  }
}
</style>