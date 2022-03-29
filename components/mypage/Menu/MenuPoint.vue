<template lang="pug">
.wrapper
  .row.pb-2.m-0
    .col-6.text-center.p-0(@click="showPointHistory")
      .score {{pointTotal}}
      .description.text-muted ポイント
    .col-6.text-center.p-0(@click="showVisitedDirectSales")
      .score(v-if="currentUser !== ''") {{currentUser.metadata.numOfVisitedDirectSales}}
      .score(v-else) 0
      //- .score 0
      .description.text-muted 訪問した直売所

  .row.p-0.pb-2.m-0
    button.btn(@click="showRankingModal") ポイントランキング
  //- div.text-center 
  //-   span adsa
    
</template>

<script>
import {mapGetters} from 'vuex'

import PointRanking from './PointRanking.vue'
import PointHistory from './PointHistory.vue'
import VisitedDirectSales from './VisitedDirectSales.vue'
export default {
  props: ['displayText'],
    computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
      pointTotal: 'point/pointTotal'
    }),
  },
  methods:{
    showPointHistory(){
      const modalWidth = $(window).width() < 800 ? $(window).width() : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'

      this.$modal.show(PointHistory, {}, {
        clickToClose: true,
        width: modalWidth,
        // width: '80%',
        height: 'auto',
        // height: modalHeight- 150,
        scrollable: true
      })
      setTimeout(() => {
        document.getElementsByClassName('vm--container')[0].style.zIndex = 2000
      }, 100)
    },
    showVisitedDirectSales(){
      const modalWidth = $(window).width() < 800 ? $(window).width() : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'

      this.$modal.show(VisitedDirectSales, {}, {
        clickToClose: true,
        width: modalWidth,
        // width: '80%',
        height: 'auto',
        // height: modalHeight- 150,
        scrollable: true
      })
      setTimeout(() => {
        document.getElementsByClassName('vm--container')[0].style.zIndex = 2000
      }, 100)
    },
    showRankingModal(){
      // console.log(this.currentUser);
      const modalWidth = $(window).width() < 800 ? $(window).width() : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'

      this.$modal.show(PointRanking, {}, {
        clickToClose: true,
        width: modalWidth,
        // width: '80%',
        height: 'auto',
        // height: modalHeight- 150,
        scrollable: true
      })
      setTimeout(() => {
        document.getElementsByClassName('vm--container')[0].style.zIndex = 2000
      }, 100)
    },
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .row{
    background: white;
    cursor: pointer;
    .score{
      color: #BE9B69;
      font-size: 1.5rem;
    }
    .btn{
      width: 90%;
      background: #E48F6B;
      text-align: center;
      margin: auto;
      color: white;
    }
  }
  @media screen and (min-width:1024px) { 
    .row{
      background: #f2f3f5;
      .btn{
        background: #E48F6B;
      }
    }
  }
</style>