<template lang="pug">
  .item(v-if="review" @click="moveToDetail(review.directSaleId)") 
    div(style="height: 120px; width: 100%; background: gray; display: flex; align-items: center; overflow: auto; border-radius: 12px")
      ImgFirebaseLoader.img(v-if="review.imageStoragePaths && typeof review.imageStoragePaths === 'object' && review.imageStoragePaths.length > 0" :path="review.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      ImgFirebaseLoader.img(v-else path="" objectFit="cover" :modalDisabled="true")
    div
      .text-overflow
        span.time-font {{ getTime(review.createdAt) }}
      .content.text-overflow
        p.mb-0.content-font {{review.content}}

</template>                               

<script>
import {mapGetters} from 'vuex'
import { getDateTime1FromTimeStamp } from '~/plugins/library/timestampConverter'

export default {
  data(){　
    return{
    }
  },
  props: ['review'],
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
      user: 'userDetail/user'
    }),
  },
  methods: {
    moveToDetail(directSaleId){
      this.$router.push(`/directSales/${directSaleId}`)
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTime1FromTimeStamp(timestamp)
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .item {
    position: relative;
    cursor: pointer;
    padding: 0 1rem;
    width: 100%;
  }
  .time-font {
    font-size: 12px;
  }
  .content-font {
    font-weight: bold;
    font-size: 15px;
  }
  .text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

