<template lang="pug">
  .wrapper.w-100
    .content {{ review.content }}
    .header.d-flex.w-100(style="position: relative;" v-if="user.length > 0")
      ImgFirebaseLoader.user-icon(
        :path="user[0].userImageStoragePath",
        objectFit="cover",
        :modalDisabled="true"
      )
      .name {{ user[0].userName }}
    h5 {{ directsalename[0] ? directsalename[0]["saleName"] : '' }}
</template>

<script>
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'

export default {
  data(){　
    return{
    }
  },
  props: ['review', 'user', 'directsalename'],
  computed: {

  },
  methods:{
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp, {noHour:true})
    },
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  // background-color: white;
  // box-shadow: 1px 0 4px grey;
  // padding: 10px;
  // width: 180px;
  // height: 180px;
  color: white;
  padding: 15px;
  .content {
    font-size: 1rem;
  }
  .header {
    height: 40px;
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    .user-icon {
      // width: 40%;
      width: 30px !important;
      height: 30px !important;
    }
    .name {
      font-size: 0.9rem;
      margin-left: 10px;
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      line-height: 1.6;
    }
  }
  h5 {
    font-size: 0.8rem;
  }
}
</style>

