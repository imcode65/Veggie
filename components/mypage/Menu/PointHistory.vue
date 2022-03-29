<template lang="pug">
  .wrapper.m-auto
    ModalHeader.shadow-sm(icon="clear" title="ポイント履歴" @close="$emit('close')")
    .description.p-3
      .line 直売所チェックイン: +0.5ポイント
      .line みんなの投稿（直売所）に投稿: +1ポイント
    .list-wrapper.mb-1(v-if="pointHistory.length !== 0" v-for="(history, id) in pointHistory" :key="id")
      .link
        .icon 
        .type.p-1 {{getPointTypeDisplay(history.pointType)}}
        .point.p-1 {{history.point}}pt
        .date.p-1 {{getTime(history.date)}}

</template>

<script>
import {mapGetters} from 'vuex'
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'
import { PointType } from '~/constants/'

export default {
  data() {
    return {

    }
  },
  props: [],
  computed: {
    ...mapGetters({
      pointHistory: 'point/pointHistory',
    })
  },
  methods:{
    async initialize(){
      await this.$store.dispatch('point/initializePointHistory')
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp)
    },
    getPointTypeDisplay(pointType){
      return PointType[pointType]
    }
    // log(){
    // console.log(this.pointHistory);
      
    // },
  },
  mounted(){
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
  .description{
    color: #be9b69
  }
  .wrapper{
    min-height: 50vh;
    max-height: 80vh;
    overflow: scroll;
    .link{
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #212529;
      cursor: pointer;
      text-decoration: none;
      height: 50px;
      .type{
        width: 25%;
        font-size: 0.8rem;
      }
      .name{
        width: 45%;
      }
      .date{
        width: 25%;
        font-size: 0.8rem;
      }
    }
  }
</style>