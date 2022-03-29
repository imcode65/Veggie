<template lang="pug">
  div
    nav
      footer.d-flex.justify-content-center(
        style="width: 100%"
      )
        AppStoreLinkBtn.appstore-btn
        .sns-btn-group
          a.btn(href="https://www.facebook.com/veggie2020")
            img(src="~/assets/facebook.png")
          a.btn(href="https://twitter.com/veggie2020")
            img(src="~/assets/twitter.png")
          a.btn(href="https://www.instagram.com/veggie_sns/")
            img(src="~/assets/instagram.png")
        .row.d-flex.flex-column(style="margin-right: 100px;")
          PCFooterMenu(
            :class="{ active: $route.name === 'directSales' }"
            displayText="すべての直売所を見る" 
            @action="goDirectSales"
          )
          PCFooterMenu(
            :class="{ active: $route.name === 'map' }"
            displayText="マップからさがす" 
            @action="goMap"
          )
          PCFooterMenu(
            :class="{ active: $route.name === 'user' }"
            displayText="すべてのユーザーを見る" 
            @action="goUsers"
          )
        .row.d-flex.flex-column(style="margin-right: 100px;")
          PCFooterMenu(
            :class="{ active: $route.name === 'timeline' }"
            displayText="すべての投稿を見る" 
            @action="goTimelines"
          )
          PCFooterMenu(
            :class="{ active: $route.name === 'notifications' }"
            displayText="お知らせ" 
            @action="goNotifications"
          )
          PCFooterMenu(
            :class="{ active: $route.name === 'mypage' }"
            displayText="マイページ" 
            @action="goMypage"
          )
        .row.d-flex.flex-column
          PCFooterMenu(
            displayText="運営会社" 
            @action="goVeggie"
          )
          PCFooterMenu(
            displayText="利用規約" 
            @action="goTerms"
          )
          PCFooterMenu(
            displayText="個人情報保護方針" 
            @action="goPersonalTerms"
          )
</template>

<script>
import {USAGE_TERMS_LINK, PERSONAL_TERMS_LINK} from '@/constants/'


export default {
  data(){
    return{
    }
  },
  methods:{
    goHome(){
      this.$router.push('/')
    },
    goDirectSales(){
      this.$router.push('/directSales/')
    },
    goFavoriteDirectSales(){
      this.$router.push('/mypage/favorites/')
    },
    goMap(){
      this.$router.push('/map/');
    },
    goUsers(){
      this.$router.push('/users/');
    },
    goTimelines(){
      this.$router.push('/timeline/');
    },
    goNotifications(){
      this.$router.push('/notifications/');
    },
    goMypage(){
      this.$router.push('/mypage/');
    },
    goVeggie(){
      window.location.replace('https://www.veggiejapan.com/') 
    },
    goTerms(){
      window.location.replace(USAGE_TERMS_LINK) 
    },
    goPersonalTerms(){
      window.location.replace(PERSONAL_TERMS_LINK) 
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
  nav{
    width: 100%;
    margin: auto;
    background: rgba(190, 155, 105, 0.2);
    footer{
      position: relative;
      width: 100vw;
      max-width: 1200px;
      margin: auto;
      .appstore-btn{
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
      .sns-btn-group{
        position: absolute;
        bottom: 10px;
        left: 20px;
        display: flex;
        .btn{
          img{
            width: 40px;
            height: auto;
            object-fit: contain;
          }
        }
      }
      .active{
        color: #E48F6B;
      }
    }
  }

</style>

