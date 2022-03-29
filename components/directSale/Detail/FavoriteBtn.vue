<template lang="pug">
  .btn
    .follow-btn.p-0(v-if="!directSaleFavorited" @click="addFavoriteDirectSale") ＋フォロー
    .follow-btn.favorited.p-0(v-if="directSaleFavorited" @click="removeFavoriteDirectSale") フォロー中
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){　
    return{
      directSaleFavorited: false,
    }
  },
  props: ['directSale'],
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
      favoritedDirectSalesIdList: 'currentUser/favoritedDirectSalesIdList',
    }),
  },
  watch: {
    favoritedDirectSalesIdList: {
      immediate: true,
      handler(newList, oldList){
        this.directSaleFavorited = newList.includes(this.directSale.id)
      },
    },
  },
  methods:{
    async addFavoriteDirectSale(){
      if(this.$checkAuthenticated()){
        await this.$store.dispatch('currentUser/addFavoriteDirectSale', this.directSale.id)
      }
    },
    async removeFavoriteDirectSale(){
      if(this.$checkAuthenticated()){
        await this.$store.dispatch('currentUser/removeFavoriteDirectSale', this.directSale.id)
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .follow-btn{
    padding: 1px 0;
    width: 40%;
    max-width: 120px;
    position: absolute;
    right: 16px;
    bottom: 35%;
    text-align: center;
    color: #76C076;
    border: 2px #76C076 solid;
    border-radius: 15px;
    &.favorited{
      background: #76C076;
      color: white;
    }
  }
  @media screen and (max-width:400px) { 
    .follow-btn{
      width: 30%;
    }
  }

</style>
