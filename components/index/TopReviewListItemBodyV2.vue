<template lang="pug">
  .wrapper.p-3
    .title
      h4 {{ directsalename[0] ? directsalename[0]['saleName'] : '' }}
    .content {{ review.content }}
    .onwer-info.d-flex.w-100.position-relative(v-if="user.length > 0")
      ImgFirebaseLoader.user-icon(
        :path="user[0].userImageStoragePath",
        objectFit="cover",
        :modalDisabled="true"
      )
      .name {{ user[0].userName }}
    .date {{ getTime(review.createdAt) }}
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
  display: flex;
  flex-direction: column;
  color: white;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    h4 {
      font-size: 1.4rem;
      text-shadow: 0px 2px 2px black;
      margin-bottom: 0;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1.6;
    }
  }
  .content {
    flex-grow: 0;
    flex-shrink: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.6;
  }
  .onwer-info{
    padding: 5px 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    .user-icon{
      width: 30px !important;
      height: 30px !important;
    }
    .name{
      font-size: 1rem;
      margin-left: 5px;
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      line-height: 1.6;
    }
  }
  .date{
    font-size: 0.7rem;
  }
}
</style>

