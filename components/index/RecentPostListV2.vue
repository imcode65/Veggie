<template lang="pug">
  .reviewWrapper(@click="goDirectSale" style="cursor: pointer; ")
    .content.position-relative() 
      ImgFirebaseLoader(:path="review.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      RecentPostListItem.position-absolute.bottom-0(v-if="review" :review="review" :user="user" :directsalename="directsalename")
    //- DirectSaleLikeBtn.like-btn(:directSale="directSale" :btnEnabled="true")
 
</template>

<script>
export default {
  props: ["review", "user", "directsalename"],
  methods: {
    goDirectSale() {
      this.$router.push(`/directSales/${this.review.directSaleId}`)
    }
  },
  mounted() { 
  }
};
</script>

<style lang="scss" scoped>
  .reviewWrapper {
    display: table-cell;
    position: relative;
    .content {
      display: flex;
      justify-content: center;
      width: 240px;
      height: 340px;
      overflow: hidden;
      border-radius: 10px;
      margin: 0 10px 5px 10px;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
      img {
        box-shadow: 1px 0 4px grey;
      }
      .bottom-0 {
        bottom: 0%;
      }
    }
  }
</style>

