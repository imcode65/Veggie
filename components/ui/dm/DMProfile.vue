<template lang="pug">
  .d-flex.justify-content-between.align-items-center.dm-profile.border-bottom(@click="showDMMessageModal")
    .icon
      .m-auto(style="height: 10vw; width: 10vw;")
        ImgFirebaseLoader.user-icon(v-if="dmProfile && dmProfile.theOtherUser" :path="dmProfile.theOtherUser.imageStoragePath" objectFit="cover")
        ImgFirebaseLoader.user-icon(v-else :path="''" objectFit="cover")
    .main 
      div(v-if="dmProfile && dmProfile.theOtherUser") {{dmProfile.theOtherUser.name}}
      .last-mg.font-weight-bold(v-if="dmProfile.lastMessageRead == false && uid !== dmProfile.lastSenderId") {{msgToDisplay}}
      .last-mg.text-muted(v-else) {{ msgToDisplay }}
    .date.mr-4 {{ getDateFromTimestamp(dmProfile.lastSent) }}
</template>

<script>
import {mapGetters} from 'vuex'
import DMMessageModal from '~/components/ui/dm/DMMessageModal'

export default {
  data(){
    return{
      msgToDisplay: '',
    }
  },
  props: ['dmProfile'],
  computed: {
    ...mapGetters({
      uid: 'currentUser/uid',
    }),
  },
  watch: {
    dmProfile: {
      handler(newProfile, oldProfile){
         this.msgToDisplay = this.dmProfile?.lastMessage
      },
    },
  },
  methods: {
    initialize(){
      this.msgToDisplay = this.dmProfile?.lastMessage
      const msgLength = this.dmProfile?.lastMessage?.length
      if(msgLength && msgLength > 30){
        this.msgToDisplay = this.dmProfile.lastMessage.substr(0, 29) + '...'
      }
    },
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
    showDMMessageModal(){
      const modalWidth =
        $(window).width() < 1000 ? `${$(window).width() - 50}px` : "1000px";
      const modalHeight = `${$(window).height() - 240}px`;
      this.$modal.show(
        DMMessageModal, 
        {
          toUserId: this.dmProfile?.theOtherUser?.id,
          dmProfile: this.dmProfile
        },
        {
          clickToClose: true,
          width: modalWidth,
          height: modalHeight,
        }
      )
    },
  },
  mounted() {
    this.initialize()
  },
}
</script>

<style lang="scss" scoped>
.dm-profile{
  background: white;
  cursor: pointer;
  .icon{
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-icon{
      width: 40px !important;
      height: 40px !important;
      object-fit: cover;
    }
  }
  .main{
    width: 50%;
    text-align: left;
    .last-mg{
      overflow: hidden;
    }
  }
  .date{
    width: 25%;
  }
}
</style>