<template lang="pug">
  .intro.p-3.w-100(
    style="position: relative; width: 100%;"
  )
    h4(
      v-if="directSale"
      style="word-break: break-all;overflow: hidden;"
    ) {{ directSale.name }}
    slot(name="accessory") 
    .mt-3(style="height: 20px;")
      div(v-if="directSale") {{ directSale.prefecture + directSale.city }}
</template>

<script>
import * as businessHour from '~/plugins/library/businessHour'
import {mapGetters} from 'vuex'
import RegistrationModal from '~/components/registration/RegistrationModal.vue'

export default {
  data(){　
    return{
      path: this.$route.name,
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
      // console.log(this.directSale);
    },
    async openRegistration() {
      if(!this.$checkAuthenticated()) return
      await this.$store.dispatch('directSales/directSaleRegistrationByUser/initializeStateForUpdate', this.directSale.id)

      const modalWidth = $(window).width() < 1000 ? $(window).width() - 80 : '1000px'
      const modalHeight = $(window).height() < 1200 ? $(window).height() - 100 : '1200px'

      this.$modal.show(RegistrationModal, {}, {
        clickToClose: true,
        width: modalWidth,
        height: modalHeight,
        scrollable: true
      })
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.intro{
  color: white;
  .edit-link{
    text-decoration: underline;
    cursor: pointer;
  }
  h4 {
    font-weight: 700;
    font-size: 1.2rem;
  }
  .time-icon {
    position: absolute;
  }
  .time-message {
    margin-left: 30px;
  }
  @media screen and (min-width:1024px) { 
    h4{
        font-size: 1.2rem;
    }
  }
} 
</style>

