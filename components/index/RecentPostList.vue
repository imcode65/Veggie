<template lang="pug">
  .reviewWrapper(@click="goDirectSale")
    .content(style="cursor: pointer; margin:0 0 0 15px;") 
      ImgFirebaseLoader(:path="review.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      RecentPostListItem(v-if="review" :review="review" :user="user" :directsalename="directsalename")
    //- DirectSaleLikeBtn.like-btn(:directSale="directSale" :btnEnabled="true")
 
</template>

<script>
export default {
  props: ["review", "user", "directsalename"],
  methods: {
    goDirectSale(){
      // console.log(`/directSales/${this.review.directSaleId}`);
      this.$router.push(`/directSales/${this.review.directSaleId}`)
    }
  },
  mounted(){ 
  }
};
</script>

<style lang="scss" scoped>
  .reviewWrapper{
    display: table-cell;
    position: relative;
    width: 100%;
    .content{
      img{
        width: 180px;
        height: 170px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        box-shadow: 1px 0 4px grey;
      }
    }
  }
</style>

