<template lang="pug">
  div
    Loading(ref="loading")
    //- WindowScrollLoadList(v-if="myReviews.length!=0" :items="myReviews" numOfItemsPerLoad=10)
    WindowScrollLoadList(:items="myReviews" numOfItemsPerLoad=10)
      template(#list="list")
        .grid-sales
          ReviewItem(ref="store" v-if="list.itemsToShow" v-for="(review, id) in list.itemsToShow" :review="review" :key="id")
    //- NotReadyMessage(ref="message" message="タイムラインがありません")
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      //現在地から近い順に並び替えられた直売所リスト
      // directSalesOrdered: [],
      refMine: [],
    }
  },
  head() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      myReviews: 'directSales/allReviews/myReviews',
    }),
  },
  methods: {
    async initializeState(){
      const loading = this.$refs.loading
      loading.startLoading()
      
      await this.$store.dispatch("directSales/allReviews/initializeState")

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