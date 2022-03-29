<template lang="pug">
  .wrapper.p-3
    h4 {{directsalename[0] ? directsalename[0]['saleName'] : ''}}
    .header.d-flex.w-100.align-items-center(style="position: relative;")
      .date {{getTime(review.createdAt)}}
      .user(v-if="user.length > 0")
        ImgFirebaseLoader.user-icon(
          :path="user[0].userImageStoragePath",
          objectFit="cover",
          :modalDisabled="true"
        )
        .name {{user[0].userName}}
    .content {{review.content}}
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
.wrapper{

  h4 {
    font-size: 1.1rem;
  }
  .header{
    height: 40px;
    overflow: hidden;
    .date{
      font-size: 0.7rem;
      width: 45%;
    }
    .user{
      width: 50%;
      display: flex;
      justify-content: space-around;
      .user-icon{
        // width: 40%;
        width: 30px;
        height: 30px;
      }
      .name{
        width: 50%;
        font-size: 0.7rem;
        height: 30px;
      }
    }
  }
  .content{
    height: 80px;
    overflow: hidden;
  }
}
</style>

