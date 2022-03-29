<template lang="pug">
  .wrapper.m-auto
    ModalHeader.shadow-sm(icon="clear" title="訪問した直売所" @close="$emit('close')")  
    VisitedDirectSaleItem(v-if="visitedDirectSales.length !== 0" v-for="(directSale, id) in visitedDirectSales" :directSale="directSale" :key="id")  
</template>

<script>
import {mapGetters} from 'vuex'
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'


export default {
  data() {
    return {
    }
  },
  props: [''],
  methods:{
    async initialize(){
      this.$store.dispatch('point/initializeVisitedDirectSales')
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp)
    },
    moveTo(directSale){
      this.$router.push(`/directSales/${directSale.id}`)
    },
  },
  computed: {
    ...mapGetters({
      visitedDirectSales: 'point/visitedDirectSales',
    })
  },
  watch: {

  },
  mounted(){
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    min-height: 50vh;
    max-height: 80vh;
    overflow: scroll;
    .link{
      display: flex;
      // flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #212529;
      cursor: pointer;
      text-decoration: none;
      .icon{
        height: 50px;
        width: 25%;
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