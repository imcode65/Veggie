<template lang="pug">
  div
    Loading(ref="loading")
    WindowScrollLoadList(v-if="directSalesOrdered.length!=0" :items="directSalesOrdered" numOfItemsPerLoad=10)
      template(#list="list")
        .d-flex.justify-content-around.flex-wrap
          DirectSaleListItem(ref="store" v-if="list.itemsToShow" v-for="(directSale, id) in list.itemsToShow" :key="id" :directSale="directSale" )
    NotReadyMessage(ref="message" message="お気に入りの直売所が登録されていません。")
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      //現在地から近い順に並び替えられた直売所リスト
      directSalesOrdered: [],
    }
  },
  head() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      directSales: 'directSales/directSalesFavorites/directSales',
      currentLocation: 'currentLocation/currentLocation'
    }),
  },
  methods: {
    async initializeState(){
      const loading = this.$refs.loading
      loading.startLoading()
      //現在地が設定されていない場合は取得する
      if(this.currentLocation.latitude === undefined){
        await this.$store.dispatch('currentLocation/updateCurrentLocation')
      }
      //直売所一覧を取得する
      if(this.$checkAuthenticated()){
        await this.$store.dispatch('directSales/directSalesFavorites/initializeState')
        this.setDirectSalesOrdered()
      }
      if (this.directSalesOrdered.length === 0) this.$refs.message.showMessage()
      loading.finishLoading()
    },
    //直売所を現在地から近い順に並び替える
    setDirectSalesOrdered(){
      // console.log('index/setDirectSalesOrdered')
      const directSales = [...this.directSales]
      this.directSalesOrdered = directSales.sort((a,b) => (a.distanceFromCurrentLocation > b.distanceFromCurrentLocation) ? 1 : -1)
    },
  },
  layout: 'index',
  mounted(){
    this.initializeState()    
  }
}

</script>


<style lang="scss" scoped>

</style>