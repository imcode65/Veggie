<template lang="pug">
  .storeWrapper(@click="moveToDetail" )
    .content.position-relative(style="cursor: pointer; display: flex; justify-content: center; background: gray; height: 340px; overflow: hidden;")
      //- ImgFirebaseLoader(:path="imageStoragePath" objectFit="cover" :modalDisabled="true")
      ImgFirebaseLoader(v-if="directSale" :path="directSale.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      NewDirectSaleItem.position-absolute.bottom-0(v-if="directSale" :directSale="directSale")
        //- template(#accessory)
</template>                               

<script>
import {mapGetters} from 'vuex'

export default {
  data(){　
    return{
    }
  },
  props: ['directSale'],
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
    }),
    imageStoragePath(){
      const path = this.directSale.imageStoragePaths?.find(path => path != "")

      if (path) return path

      const img = this.directSale.userUploadImages?.find(img => img.imageStoragePath != "" && img.deleted == false)

      if (img) return img.imageStoragePath

      return ''
    },
  },
  methods: {
    moveToDetail(){
      //this.$router.push({path: `directSales/${this.directSale.id}`, params: {directSale: this.directSale}})
      this.$router.push(`/directSales/${this.directSale.id}`);
    },
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  .storeWrapper{
    display: table-cell;
    .content{
      border-radius: 10px;
      overflow: hidden;
      margin: 0 10px 5px 10px;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
      img{
        width: 240px;
        height: 340px;
      }
      .bottom-0 {
        bottom: 0;
      }
    }
  }
</style>

