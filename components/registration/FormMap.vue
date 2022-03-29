<template lang="pug">
.d-flex.justify-content-center.mt-5(
  v-if="isPermissionAllowed"
)
  div(style="position:relative; width: 90%; height: 300px;")
    .container-fluid#map(ref="map")
    //- .update-button.btn.btn-lg(v-if="showMapButton" @click="initMap") 住所から位置を更新する
.d-flex.justify-content-center.mt-5(
  v-else
) Geolocation is not supported by this browser or you didn't allow the permission to get the location.

</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'

const prefectures = [
  "北海道",
  "青森",
  "秋田",
  "岩手",
  "山形",
  "宮城",
  "福島",
  "栃木",
  "群馬",
  "茨城",
  "埼玉",
  "東京",
  "千葉",
  "神奈川",
  "新潟",
  "石川",
  "富山",
  "長野",
  "福井",
  "岐阜",
  "山梨",
  "愛知",
  "静岡",
  "兵庫",
  "京都",
  "滋賀",
  "大阪",
  "奈良",
  "三重",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "香川",
  "愛媛",
  "徳島",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄"
]

export default {
  data() {
    return {
      showMapButton: true,
      isPermissionAllowed: true,
    }
  },
  computed: {
    ...mapGetters({
      directSaleId: 'directSales/directSaleRegistrationByUser/directSaleId',
      prefecture: 'directSales/directSaleRegistrationByUser/prefecture',
      city: 'directSales/directSaleRegistrationByUser/city',
      otherCityAddress: 'directSales/directSaleRegistrationByUser/otherCityAddress',
      address: 'directSales/directSaleRegistrationByUser/address',
      location: 'directSales/directSaleRegistrationByUser/location',
      userCurrentLocation: 'currentLocation/currentLocation'
    }),
  },
  // watch: {
  //   address:{
  //     handler(){
  //       this.showMapButton = true
  //     },
  //   }
  // },
  methods: {
    async initMap(){
      // this.showMapButton = false
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.initMapWithLocation,this.showGeoError);
      } else {
        this.isPermissionAllowed = false
      }
    },
    showGeoError(error) {
      this.isPermissionAllowed = false
      switch(error.code) {
        case error.PERMISSION_DENIED:
          // console.log("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          // console.log("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          // console.log("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          // console.log("An unknown error occurred.")
          break;
      }
    },
    async initMapWithLocation(currentPosition) {
      const coord = {
        lat: this.location.latitude ? this.location.latitude : this.userCurrentLocation.latitude,
        lng: this.location.longitude ? this.location.longitude : this.userCurrentLocation.longitude
      }
      if (!this.directSaleId) {
        this.getPositionInfomation(coord.lat, coord.lng);
      }
      const map = new google.maps.Map(this.$refs.map, {
        center: coord,
        zoom: 19
      });
      const myMarker = new google.maps.Marker({
        draggable: true,
        position: coord,
        map,
      });
      const context = this
      google.maps.event.addListener(myMarker, 'dragend', function(evt){
        context.updateLocation(evt.latLng.lat(), evt.latLng.lng())
        map.setCenter(myMarker.getPosition())
        context.getPositionInfomation(evt.latLng.lat(), evt.latLng.lng());
      })
    },
    updateLocation(latitude, longitude){
      // console.log(`new location at: ${latitude}, ${longitude}`);
      this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_DIRECTSALE_LOCATION`, { latitude, longitude })
    },
    getPositionInfomation(lat, lng) {
      // console.log(lat, lng)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(res => {
          if (res.status === "OK") {
            let geoinfos = res.results[0];
            let { address_components, formatted_address } = geoinfos;
            // console.log(geoinfos)
            if (formatted_address !== "") {
              
              let prefecture = "";
              let city = "";
              let street = "";
              let zipcode = "";
              let country = "";
              for (let address_component of address_components) {
                // console.log(address_component)
                if (address_component.types[0] === "postal_code") {
                  zipcode = address_component.long_name.replaceAll("、","").replaceAll("　"," ").replaceAll("〒", "")
                } else if (address_component.types[0] === "administrative_area_level_1") {
                  prefecture = address_component.long_name.replaceAll("、","").replaceAll("　"," ").replaceAll("〒", "")
                } else if (address_component.types[0] === "locality") {
                  city = address_component.long_name.replaceAll("、","").replaceAll("　"," ").replaceAll("〒", "")
                } else if (address_component.types[0] === 'country') {
                  country = address_component.long_name.replaceAll("、","").replaceAll("　"," ").replaceAll("〒", "")
                }
              }
              street = formatted_address.replaceAll(country, "").replaceAll(city, "").replaceAll(prefecture, "").replaceAll(zipcode, "").replaceAll(",","").replaceAll("、","").replaceAll("　"," ").replaceAll("〒", "")

              // console.log(street, city, prefecture, zipcode)
              if (street !== "") {
                this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_DIRECTSALE_OTHERCITYADDRESS`, street)
              }
              if (city !== "") {
                this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_DIRECTSALE_CITY`, city)
              }
              if (prefecture !== "") {
                this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_DIRECTSALE_PREFECTURE`, prefecture)
              }
              if (zipcode !== "") {
                this.$store.commit(`directSales/directSaleRegistrationByUser/UPDATE_DIRECTSALE_POSTALCODE`, zipcode)
              }

              // // let country = address_components[5].long_name;
            } else {
              alert("マーカーの位置を再設定してください。");
            }
          } else {
            // console.log(res)
          }
        }).catch(e => {
          // console.log(e.message)
        })
    }
  },
  mounted(){ 
    this.initMap()
  }
}
</script>



<style lang="scss" scoped>
  #map{
    width: 100%;
    height: 100%;
  }
  .update-button{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -25%;
    width: 50%;
    border: solid 1px black;
  }
</style>