<template lang="pug">
  .checkin-btn-wrapper
    .btn.checkin-btn.p-0(@click="addCheckedInDirectSale")
      .span.checkin  Check in
      .span.point-get ポイントゲット！
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PointGetModal from './PointGetModal.vue'

export default {
  data(){　
    return{
    }
  },
  props: ['directSale'],
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
      uid: 'currentUser/uid',
    }),
  },
  methods:{
    ...mapActions({
      myDirectSales: "directSales/myDirectSales"
    }),
    async addCheckedInDirectSale(){
      if(this.$checkAuthenticated()){
        const userCanCheckIn = await this.$store.dispatch('point/checkIfUserCheckedInToday', this.directSale.id)
        if (userCanCheckIn === false) {
          alert('本日はチェックイン済みです')
          return
        }
        const userIsWithinDistance = await this.$store.dispatch('point/checkIfUserIsWithinDistance', this.directSale)
        if (userIsWithinDistance === false) {
           alert('直売所から100m以内でチェックインしてください。')
           return
        }
        /**
         * Check if the sale is owner's sale
         * var directSales is the list of sales
         * owner is selected sale's owner
         * this.uid is the logged user's id
         * */ 
        let directSales = await this.$store.dispatch('directSales/directSalesList/myDirectSales');
        let owner = directSales.filter(directSale => directSale.id === this.directSale.id)?.[0];
        if (owner && owner.id !== this.uid) {
          const response = await this.$store.dispatch('point/getPointForCheckInDirectSale', this.directSale.id)
          if(response.type === 'success') this.showPointGetModal(response)
        }
      }
    },
    showPointGetModal(response){
      const modalWidth = $(window).width() < 800 ? $(window).width() - 80 : '800px'
      const modalHeight = $(window).height() < 800 ? $(window).height() : '800px'

      const imagePath = this.directSale.imageStoragePaths[0] !== '' 
                ? this.directSale.imageStoragePaths[0]
                : this.directSale.userUploadImages?.find(image => image.deleted == false)
                ? this.directSale.userUploadImages?.find(image => image.deleted == false).imageStoragePath
                : ''    

      this.$modal.show(PointGetModal, {
        response, 
        imagePath, 
        caption: this.directSale.name, 
        showAnimation: true,
      }, {
        clickToClose: true,
        width: modalWidth,
        // width: '80%',
        height: 'auto',
        // height: modalHeight- 150,
        scrollable: true
      })
      setTimeout(() => {
        document.getElementsByClassName('vm--container')[0].style.zIndex = 2000
      }, 100)
    },
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.checkin-btn-wrapper{
  width: 30%;
  text-align: right;
  position: absolute;
  right: 16px;
  top: 140px;
  .checkin-btn{
    width: 100%;
    max-width: 1500px;
    text-align: center;
    color: white;
    border: 2px rgba(217, 112, 111) solid;
    background: rgb(217, 112, 111);
    border-radius: 25px;
    &.checkined{
      color: white;
    }
    .span.checkin {
      font-size: 16px;
    }
    .span.point-get {
      font-size: 10px;
    }
  }
  @media screen and (min-width:800px) { 
    .checkin-btn{
      width: 68%;
    }
    .span.checkin {
      font-size: 23px;
    }
    .span.point-get {
      font-size: 16px;
    }
  }
}
</style>
