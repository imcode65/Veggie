<template lang="pug">
div(style="position: relative;")
  Loading(ref="loading")
  Map.map(
    ref="map" 
    v-if="directSales.length!=0 && currentLocation.latitude" 
    :directSales="directSales" 
    :centerLocation="currentLocation" 
    @startLoading="startLoading" 
    @finishLoading="finishLoading"
  )
  SwitchBtn.to-current-location(
    icon="near_me"
    @btnClicked="goCenterLocation" 
    style="background: #E48F6B;"
  )
  SwitchBtn.is-mobile.to-list(
    ref="listBtn" 
    icon="list"  
    @btnClicked="goList"
  )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  head() {
    return {
      title: 'map',
    }
  },
  computed: {
    ...mapGetters({
      directSales: 'directSales/directSalesList/directSales',
      currentLocation: 'currentLocation/currentLocation',
      showRoute: 'betweenPagesActions/showRoute',
      targetLocation: 'betweenPagesActions/targetLocation',
      mode: 'betweenPagesActions/mode',
    }),
  },
  methods: {
    adjustStyling(){
      //mapの高さ調節でvhを使用している
      //iphoneでのvh問題を解決するために必要
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      //画面サイズが変わったときの対応
      window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })

      //画面サイズが変わったときの対応
      window.addEventListener('resize', () => {
        if(this.$refs.header && this.$refs.header.$el) mt = this.$refs.header.$el.clientHeight - 10
        document.documentElement.style.setProperty('--mt', `${mt}px`)
      })
    },
    async initializeState(){
      this.startLoading()
      if(this.currentLocation.latitude === undefined) {
        await this.$store.dispatch('currentLocation/updateCurrentLocation')
      }
      // if(this.directSales.length == 0){
      await this.$store.dispatch('directSales/directSalesList/initializeState')
      // }
      this.finishLoading();
      if(this.showRoute) {
        this.$refs.map.getDirection(this.targetLocation,this.mode)
        this.$store.commit('betweenPagesActions/RESET_STATE_BETWEENPAGEACTION')
      }
    },
    startLoading(){
      const loading = this.$refs.loading
      loading.startLoading()
    },
    finishLoading(){
      const loading = this.$refs.loading
      loading.finishLoading()
    },
    goList(){
      this.$router.push('/')
    },
    goCenterLocation(){
      this.$refs.map.goCenterLocation()
    }
  },
  layout: 'index',
  mounted() {
    this.initializeState()
  }
}
</script>

<style lang="scss" scoped>
.map{
  position: fixed;
  width: 100%;
  height: calc((var(--vh, 1vh) * 100) - 97px);
  // margin-top: 50px;
}
.to-current-location{
  position: fixed; 
  right: 17%; 
  top: 63%; 
}
.to-list{
  position: fixed; 
  right: 17%; 
  top: 75%;
}
@media screen and (min-width:1024px) { 
  .is-mobile{
    display: none;
  } 
  .map{
    position: relative;
    width: 95%;
    margin-top: 25px;
  }
  .to-current-location{
    top: 25%;
  }
}
</style>