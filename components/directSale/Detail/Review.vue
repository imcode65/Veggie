<template lang="pug">
  DetailPostsTemplate(:title="title" :directSale="directSale" :userList="userList" title="みんなの投稿" :posts="reviews.slice().reverse()" :postAllowed="true" @showPostModal="showPostModal")
</template>

<script>
import {mapGetters} from 'vuex'
import DirectSaleReviewPostForm from '~/components/directSale/DirectSaleReviewPostForm'

export default {
  data(){
    return{
    }
  },
  props: ['directSale', 'title'],
  computed: {
    ...mapGetters({ 
      reviews: 'posts/directSaleReviews/reviews',
      userList: 'posts/directSaleReviews/userList',
    }),
  },
  methods:{
    async initializeState(){
      await this.$store.dispatch("userList/initializeState");
      await this.$store.dispatch('posts/directSaleReviews/getReviewsByDirectSaleId', this.$route.params.id)
    },
    showPostModal(post){
      if (this.$checkAuthenticated()) {
        this.$modal.show(DirectSaleReviewPostForm, {postProp: post, directSale: this.directSale}, {
          clickToClose: true,
          width: $(window).width() - 50,
          height: 'auto',
          scrollable: true
        })
      }
    },
    prepareToExit(){
    }
  },
  mounted() {
    this.initializeState()
  },
}
</script>

<style lang="scss" scoped>

</style>

