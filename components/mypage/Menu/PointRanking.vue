<template lang="pug">
  .wrapper.m-auto
    ModalHeader.shadow-sm.mb-3(icon="clear" title="ポイントランキング" @close="$emit('close')")
    //- ComponentTab(:selected="selected" :tabs="tabs" @changeTab='changeTab').mb-2
    PointRankingListItem(v-if="selected === '全期間' && totalRankedInUsers.length !== 0" v-for="(user, id) in totalRankedInUsers" :user="user" :index="id" :key="id")
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      rankedInUserListOrdered: [],
      tabs: ['月別', '全期間'],
      selected: '全期間'
    }
  },
  props: [''],
  methods:{
    async initialize(){
      await this.$store.dispatch('point/initializeTotalRankedInUsers')
    },
    log(){
      // console.log(this.totalRankedInUsers);
    },
    changeTab(tab){
      this.selected = tab
    },
  },
  computed: {
    ...mapGetters({
      totalRankedInUsers: 'point/totalRankedInUsers',
    })
  },
  watch: {
    totalRankedInUsers: {
      handler(newRankedInUsers){
        const list  = [...newRankedInUsers];
        this.rankedInUserListOrdered = list.sort((a, b) =>
          b.points - a.points 
        );
      },
    },
  },
  mounted(){
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    max-height: 80vh;
    overflow: scroll;
  }
</style>