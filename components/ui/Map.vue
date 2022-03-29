<template lang="pug">
  div
    .container-fluid.position-relative(ref="map" style="width: 100%; height: 100%;")
    .container-fluid(ref="displayPanel")
</template>

<script>
export default {
  data() {
    return {
      // 現在地情報は取得するのに時間がかかるため
      // ストアで管理する。
      map: undefined,
      // 直売所の位置情報からマップに表示するピンを保存する
      markers: [],
      // 直売所のピンをタップしたときに表示されるウィンドウを保存する
      infoWindows: [],
    }
  },
  props: ['directSales', 'centerLocation'],
  methods: {
    initMap(){
      var myLatlng = new google.maps.LatLng(this.centerLocation.latitude,this.centerLocation.longitude)      
      let map = new google.maps.Map(this.$refs.map, {
        gestureHandling: 'greedy',
        center: myLatlng,
        zoom: 15,
      })
      //現在地に青ドットを表示する
      new google.maps.Marker({
        position: myLatlng,
        map: map,
        // icon: "/camera.png"
        icon: {
          // path: "/camera.png",
          scale:　15,
          fillOpacity: 0.5,
          strokeWeight: 2,
          fillColor: 'blue',
          strokeColor: '#ffffff',
        },
      })
      //マップがタップされたら、直売所ウィンドウは全て閉じる
      map.addListener("click", (mapsMouseEvent) => {
        this.closeInfoWindows()
      })
      //直売所の位置にピンを設置する
      setTimeout(() => {
        this.directSales.forEach(directSale => {
          var latlng = new google.maps.LatLng(directSale.location.latitude,directSale.location.longitude)
          let marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: directSale.realtimeview ? "https://veggie.co.jp/camera_map2.png" : "",
            title: directSale.name,
          });
          this.markers.push(marker)
          let infoWindow = new google.maps.InfoWindow()

          marker.addListener("click", (mapsMouseEvent) => {
            // ピンがタップされたらそこをマップの中心部に持ってきてズームする
          　map.setZoom(16)
            map.setCenter(marker.getPosition())
            // 新しいピンがタップされたら他の直売所ウィンドウは全て閉じる
            this.closeInfoWindows()
            // ピンをクリックしたときに表示されるウィンドウ内の情報を設定
            // nuxt-linkを中で使う方法がわからずとりあえずアンカータグで実装中
            // また直売所の詳細画面はモダルを使って実装したいが難しいため
            // こちらでとりあえずの実装
            let contentString = 
              `
              <div id="content">
                <h5><a id="detail-link" href="/directSales/${directSale.id}">${directSale.name}</a></h5>
                <div>
                  <div id="info-address">${directSale.prefecture}${directSale.city}${directSale.otherCityAddress}</div>
                </div>
              </div>
              `
            infoWindow.setContent(
              contentString
            );
            this.infoWindows.push(infoWindow)
            infoWindow.open(map, marker)
          });
          this.map = map
        });
      }, 1500);
    },
    //直売所のウィンドウを全て閉じる
    closeInfoWindows(){
      this.infoWindows.forEach(window => {
        window.close()
      })
    },
    //現在地から直売所への経路案内を表示する
    async getDirection(destination,mode){
      this.$emit('startLoading')
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      await this.$store.dispatch('currentLocation/updateCurrentLocation')
      var mapOptions = {
        zoom: 14,
        center: { lat: this.centerLocation.latitude, lng: this.centerLocation.longitude }
      }
      this.map = new google.maps.Map(this.$refs.map, mapOptions);
      directionsRenderer.setMap(this.map);
      //画面下部に字で表示する部分
      directionsRenderer.setPanel(
        this.$refs.displayPanel
      );
      await this.calculateAndDisplayRoute(directionsService, directionsRenderer,destination,mode);
      this.$emit('finishLoading')
    },
    //経路案内をマップ上に表示するための関数
    async calculateAndDisplayRoute(directionsService, directionsRenderer, destination, mode) {
      const selectedMode = mode;
      
      directionsService.route(
        {
          origin: { lat: this.centerLocation.latitude, lng: this.centerLocation.longitude },
          destination: { lat: destination.latitude, lng: destination.longitude},
          travelMode: google.maps.TravelMode[selectedMode],
        },
        (response, status) => {
          if (status == "OK") {
            this.$refs.displayPanel.innerHTML = ""
            //パネル表示のために画面の構成を変更する
            directionsRenderer.setDirections(response)
            this.$emit("showRouteAction")
            this.$refs.map.style.height = "50%"
            this.$refs.displayPanel.style.display = "block"
            this.$refs.displayPanel.style.paddingBottom = "100px"
            this.goCenterLocation()
          } else {
            window.alert("Directions request failed due to " + status)
          }
        }
      )
    },
    //マップの中心地を現在地に持ってくる
    async goCenterLocation(){
      await this.$store.dispatch('currentLocation/updateCurrentLocation')
      this.map.setOptions({draggable: true});
      this.map.setCenter({lat: this.centerLocation.latitude, lng: this.centerLocation.longitude});
      this.map.setZoom(16);
    },
    async initializeState(){
      this.initMap()
    },
  },
  layout: 'index',
  mounted(){
    this.initializeState()
  }
}
</script>



<style lang="scss" scoped>
  #display-panel{
    width: 100%;
    height: 50%;
    display: none;
    overflow: scroll;
  }
</style>