<template lang="pug">
  .storeWrapper(style="")
    .content(@click="moveToDetail" style="cursor: pointer;")
      //- ImgFirebaseLoader(:path="imageStoragePath" objectFit="cover" :modalDisabled="true")
      ImgFirebaseLoader(v-if="directSale" :path="directSale.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      NewDirectSaleItem(v-if="directSale" :directSale="directSale")
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
    display:table-cell;
    padding: 0 15px;

    .content{
        background-color: white;
        border-radius: 1.0rem;
        overflow: hidden;
        box-shadow: 1px 0 4px grey;

      img{
        width: 280px;
        height: 140px;
      }
    }
  }
  
  @media screen and (max-width:1023px) { 
    .storeWrapper{
    }
  }
</style>

