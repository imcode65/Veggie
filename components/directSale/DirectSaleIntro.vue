<template lang="pug">
  .intro.p-3.w-100.position-relative
    .title(@click="moveToDetail")
      h4(
        v-if="directSale && directSale.name" 
      ) {{ directSale.name }}
      img(
        v-if="directSale && directSale.realtimeview" 
        class="left-hand-cursor"
        src="~assets/camera.png"
        @click="gotoViewVeggie"
      )
      div.count.float-right
        i.material-icons.icon remove_red_eye
        span.ml-1 {{ directSale.watch_count }}
    slot(name="accessory") 
    .mt-3
      .lightGray
        div(v-if="directSale") {{directSale.prefecture + directSale.city}}
        div(v-if="directSale && directSale.distanceFromCurrentLocation") 現在地から{{directSale.distanceFromCurrentLocation}}km
        div(v-if="directSale") {{directSale.category}}
        div(v-if="directSale" style="display: flex;align-items: center;")
          i.time-icon.material-icons.icon access_time
          .time-message.d-inline.text-success(v-if="checkIfOpen()") 営業中
            .d-inline.lightGray(v-if="getTodayHour().close_at===''") ・営業終了：0:00
            .d-inline.lightGray(v-else) ・営業終了：{{getTodayHour().dayHour.end}}
          .time-message.d-inline(v-if="!checkIfOpen()") {{ getAbsentMessage() }}
        div.edit-link(
          v-if="path.includes('directSales') && (directSale.ownerId == '' || currentUserUid === ADMIN_ID || directSale.ownerId === currentUserUid)" 
          @click="openRegistration"
        ) 直売所情報を編集する
</template>

<script>
import * as businessHour from '~/plugins/library/businessHour'
import {mapGetters} from 'vuex'
import RegistrationModal from '~/components/registration/RegistrationModal.vue'

export default {
  data(){　
    return{
      path: this.$route.name,
      ADMIN_ID: process.env.ADMIN_ID,
    }
  },
  props: ['directSale'],
  computed: {
    currentTime: () => {
      return businessHour.currentTime()
    },
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
      currentUserUid: 'currentUser/uid'
    }),
  },
  methods:{
    checkIfOpen(){
      return businessHour.checkIfOpen(this.directSale)
    },
    getTodayHour(){
      return businessHour.getTodayHour(this.directSale)
    },
    getAbsentMessage(){
      return businessHour.getAbsentMessage(this.directSale)
    },
    log() {
    },
    async openRegistration() {
      if(!this.$checkAuthenticated()) return
      await this.$store.dispatch('directSales/directSaleRegistrationByUser/initializeStateForUpdate', this.directSale.id)

      const modalWidth = $(window).width() < 1000 ? $(window).width() - 80 : '1000px'
      const modalHeight = $(window).height() < 1200 ? $(window).height() - 120 : '1200px'

      this.$modal.show(RegistrationModal, {
        "showBusinessHours": true
      }, {
        clickToClose: true,
        width: modalWidth,
        height: modalHeight,
        scrollable: true
      })
    },
    gotoViewVeggie() {
      window.open("https://www.veggiejapan.com/%E8%A6%8B%E3%81%88%E3%81%B9%E3%82%B8");
    },
    moveToDetail() {
      this.$router.push(`/directSales/${this.directSale.id}`);
    },
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.intro{
  font-size: 0.8rem;
  .edit-link{
    text-decoration: underline;
    cursor: pointer;
  }
  .title {
    display: flex; 
    align-items: center; 
    width: 100%; 
    padding-bottom: 0.5rem;
    justify-content: space-between;
    height: 36px;
    h4 {
      flex-grow: 1;
      flex-shrink: 1;
      font-weight: bold;
      font-size: 1.1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      &.impress {
        animation: text-effect 1.5s infinite;
      }
    }
    img {
      flex-grow: 0;
      flex-shrink: 0;
      border-radius: 1000px; 
      // border: 1px solid #E48F6B; 
      background: white; 
      margin-right: 22px;
      width: 24px;
      height: 24px;
      animation: camera-effect 2.5s infinite;
      box-shadow: 0px 0px 10px 5px blue;
    }
    .count {
      flex-grow: 0;
      flex-shrink: 0;
      font-size: 12px;
      border-radius: 1000px;
      background: #F1EEF1;
      position: relative;
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      align-items: center;
    }
  }
  .time-icon {
    position: absolute;
    font-size: 1rem;
  }
  .time-message {
    margin-left: 20px;
  }
  @media screen and (min-width:1024px) { 
    h4{
        font-size: 1.2rem;
    }
  }
  .lightGray{
    color: #8E8E8E;
  }
} 

@keyframes camera-effect {
  75% {
    width: 40px;
    height: 40px;
    margin-right: 14px;
    background: radial-gradient(white, blue); 
  }
  // 80% {
  //   width: 16px;
  //   height: 16px;
  //   margin-right: 16px;
  // }
}
@keyframes text-effect {
  50% {
    color: blue;
  }
}
</style>

