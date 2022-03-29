<template lang="pug">
  .list-wrapper.mb-1
    .link(@click="moveTo(directSale)")
      .icon 
        ImgFirebaseLoader.m-1(
                :path="imagePath"
                objectFit="contain" 
                :modalDisabled="true"
                )
      .name {{directSale.name}}
      .date {{getTime(directSale.lastDate)}}


</template>

<script>
import {mapGetters} from 'vuex'
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'


export default {
  data() {
    return {
      imagePath: ''
    }
  },
  props: ['directSale'],
  methods:{
    async initialize(){
      this.imagePath = this.directSale.imageStoragePaths[0] !== '' 
                       ? this.directSale.imageStoragePaths[0]
                       : this.directSale.userUploadImages?.find(image => image.deleted == false)
                       ? this.directSale.userUploadImages?.find(image => image.deleted == false).imageStoragePath
                       : ''         
      // this.$store.dispatch('point/initializeVisitedDirectSales')
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
      // visitedDirectSales: 'point/visitedDirectSales',
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
</style>