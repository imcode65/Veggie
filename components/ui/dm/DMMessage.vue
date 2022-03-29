<template lang="pug">
.d-flex.flex-direction-column
  .section.mt-3(v-if="dmMessage.senderId!=currentUserId")
    .d-flex.align-items-center
      .icon.ml-2
        ImgFirebaseLoader.user-icon(v-if="dmProfile && dmProfile.theOtherUser" :path="dmProfile.theOtherUser.imageStoragePath" objectFit="cover")
      .mg-wrapper.other.d-flex.flex-column
        .mg.mg-other.p-2 {{dmMessage.text}}
        .date.text-muted(v-if="dmMessage") {{getDateFromTimestamp(dmMessage.date)}}
  .section.mt-3.mr-4(v-else)
    .mg-wrapper.d-flex.flex-column.justify-content-end(style="float:right;")
      .mg.mg-mine.p-2 {{dmMessage.text}}
      .date.text-muted(v-if="dmMessage") {{getDateFromTimestamp(dmMessage.date)}}

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){
    return{

    }
  },
  props: ['dmMessage', 'dmProfile'],
  computed: {
    ...mapGetters({
      currentUserId: 'currentUser/uid',
    }),
  },
  methods: {
    getDateFromTimestamp(timestamp){
      var date = new Date(timestamp.seconds * 1000);
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var formattedTime = year + '年' + month + '月' + day + '日' + hours + ':' + minutes.substr(-2)

      return formattedTime
    },
    checkIfMessageIsFromOtherUser(){
      return this.dmMessage.senderId !== this.currentUser.uid
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
  .section{
    width: 100%;
    white-space: pre-wrap;
    font-size: 1.5rem;
    .icon{
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .user-icon{
        object-fit: cover;
        width: 40px !important;
        height: 40px !important;
      }
    }
    .mg-wrapper{
      max-width: 70%;
      &.other{
        position: relative; 
        left: 20px;       
      }
      .mg{
        border-radius: 12px;
      }
      .mg-other{
        position: relative;
        display: inline-block;   
        background-color: #f2f3f5;
      }
      .mg-mine{
        position: relative;
        color: white;
        background-color: #BE9B69;
      }
      .date{
        max-width: 80%;
      }
    }
  }
  @media screen and (max-width:768px) { 
    .section{
      font-size: 1rem;
    }
  }
</style>