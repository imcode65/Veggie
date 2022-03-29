<template lang="pug">
  .overview
    .section
      h6.textbox.title こだわり
      div.textbox {{directSale.description}}
    .section
      h6.textbox.title 店舗情報
      .textbox.pt-1.pb-1
        i.material-icons.icon room
        span.ml-2.address(@click="goToMapAndShowDirection") {{directSale.prefecture + directSale.city + directSale.otherCityAddress}}(経路案内)
        select.d-inline.ml-4.mt-2(v-model="directionMode")
          option(value="DRIVING") 車
          option(value="WALKING") 徒歩
      .textbox.pt-1.pb-1
        i.material-icons.icon access_time
        span.ml-2 
          span.text-success(v-if="directSale && checkIfOpen()") 営業中
            .d-inline.lightGray(v-if="getTodayHour().close_at===''") ・営業終了：0:00
            .d-inline.lightGray(v-else) ・営業終了：{{ getTodayHour().dayHour.end }}
          span.text-danger(v-if="directSale && !checkIfOpen()")  {{ getAbsentMessage() }}
      .textbox.pt-1.pb-1(v-if="directSale && directSale.url")
        i.material-icons.icon(v-if="directSale && directSale.url") insert_link
        a.ml-2(v-if="directSale && directSale.url" :href="directSale.url") {{ directSale.url }}
      .textbox.pt-1.pb-1
        i.material-icons.icon qr_code
        span.ml-2 QRコード
        .pt-2#qrcode(ref="qrcode")
      .textbox.pt-1.owner(v-if="!(directSale && directSale.ownerName)")
        a.ml-2(:href="`https://docs.google.com/forms/d/e/1FAIpQLScSEUFHuVNUGvOz2OMFtGT-nCPBy1cfRF8nNcPk6oDPlw4dAA/viewform?usp=sf_link&entry.566404314=${directSale.name}`") この直売所の運営者ですか？
      .section(v-else)
        h6.textbox.title 管理者
        nuxt-link.link.row(:to="'/users/' + directSale.ownerId")
          .col-2.col-lg-1
            ImgFirebaseLoader.user-icon(
              :path="directSale.ownerImage",
              objectFit="cover",
              :modalDisabled="true"
            )
          .col-10
            span.row.header-line {{ directSale.ownerName.length > 18 ? directSale.ownerName.substr(0,16) + '...' : directSale.ownerName }}

</template>

<script>
import * as businessHour from '~/plugins/library/businessHour'

export default {
  data(){
    return{
      directionMode: 'DRIVING'
    }
  },
  props: ['directSale'],
  computed: {
    currentTime: () => {
      return businessHour.currentTime()
    },
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
    generateQR(){
      var typeNumber = 0
      var errorCorrectionLevel = 'M'
      var qr = qrcode(typeNumber, errorCorrectionLevel)
      qr.addData(window.location.href);
      qr.make()
      this.$refs.qrcode.innerHTML = qr.createImgTag()
      this.$refs.qrcode.childNodes[0].style.width = '150px'
      this.$refs.qrcode.childNodes[0].style.height = '150px'
    },
    goToMapAndShowDirection(event){
      this.$store.commit(`betweenPagesActions/SET_MODE`, this.directionMode)
      this.$store.commit(`betweenPagesActions/SET_TARGET_LOCATION`, this.directSale.location)
      this.$store.commit(`betweenPagesActions/SET_SHOW_ROUTE`, true);
      this.$router.push('/map')
    }
  },
  mounted() {
    this.generateQR()
  },
}
</script>

<style lang="scss" scoped>
.link{
  color: #212529;
  padding-left: 20px;
  width: 100%;
}
.link:hover {
  text-decoration: none;
}
.header-line {
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  padding: 0;
  margin: 1.3rem 0 0 0;
}
.user-icon {
  margin: 1rem 0 1rem 0;
  height: 2.5rem !important;
  width: 2.5rem !important;
  border-radius: 50%;
}
.icon {
  position: relative;
  top: 5px;
  color: #BE9B69; 
}
.overview{
  color: #232426;
  .section{
    h4{
      margin-bottom: 0;
    }
    .owner{
      margin-bottom: 1rem;
    }
    .textbox{
      padding: 10px 20px;
      &.title{
        padding: 5px 20px;
        font-weight: 400;
        color: #BE9B69;
        background: rgba(190, 155, 105, 0.2);
      }
      .address{
        cursor: pointer;
      }
      @media screen and (min-width:1023px) { 
        #qrcode{
          margin-left: -20px;
        }
      }
      @media screen and (max-width:1023px) { 
        #qrcode{
          text-align: center;
        }
      }
    } 
  }
}
.lightGray{
  color: #8E8E8E;
}

</style>
