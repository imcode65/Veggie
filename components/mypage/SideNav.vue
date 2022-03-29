<template lang="pug">
.wrapper
  ImgFirebaseLoader.mypage-icon-1(
    :path="currentUser.imageStoragePath"
    objectFit="cover" 
    :modalDisabled="true"
  )

  h4.mb-0 {{ currentUser.name }}

  p.follow.mb-0
    span {{ currentUser.following_users.length }}
    | フォロー中｜
    span {{ currentUser.user_following.length }}
    | フォロワー

  MenuGroup.pt-4
    template(#item)
      MenuItem(
        v-if="currentUser"
        displayText="マイポイント管理"
        @action="goPointpage"
      )
      MenuItem(
        displayText="お気に入りの直売所" 
        @action="goFavoriteDirectSales"
      )
      MenuItem(
        displayText="直売所を登録" 
        @action="goAddDirectSaleStore"
      )
      MenuItem(
        displayText="Veggieお問い合わせ" 
        @action="goAskVeggie"
      )
      MenuItem(
        displayText="利用規約" 
        @action="goTerms"
      )
      MenuItem(
        displayText="個人情報保護方針" 
        @action="goPersonalTerms"
      )
      MenuItem(
        v-if="!production"
        displayText="購入保険料" 
        @action="goPremiumPage"
      )
      MenuItem(
        v-if="currentUser"
        displayText="ログアウト" 
        @action="loginOrLogOut"
      )
      MenuItem(
        v-if="isAdmin"
        displayText="ポイント管理者"
        @action="goPointAdminpage"
      )
      MenuItem(
        v-if="currentUser"
        displayText="退会"
        @action="startWithDrawal"
      )
</template>

<script>
import { mapGetters } from 'vuex'
import { USAGE_TERMS_LINK, PERSONAL_TERMS_LINK } from '@/constants/'
import firebase from '~/plugins/firebase'
import RegistrationModal from '~/components/registration/RegistrationModal.vue'


export default {
  data() {
    return {
      production: process.env.VEGGIE_MODE === "production"
    }
  },
  methods: {
    goFavoriteDirectSales() {
      this.checkSignedInOrMove('/mypage/favorites/')
    },
    goAddDirectSaleStore() {
      this.$parent.hide();
      this.openRegistration()
    },
    goAskVeggie() {
      window.location.replace('https://forms.gle/sFskE9k3WPaCy3qF6')
    },
    goTerms() {
      window.location.replace(USAGE_TERMS_LINK) 
    },
    goPersonalTerms(){
      window.location.replace(PERSONAL_TERMS_LINK) 
    },
    goPremiumPage() {
      this.$router.push("/premium/");
    },
    loginOrLogOut(){
      if(this.loginOrLogoutText === 'ログイン'){
        this.$checkAuthenticated()
      }
      else{
        // console.log(this.loginOrLogoutText);
        this.signOut()
      }
    },
    goPointpage() {
      this.$router.push("/point/");
    },
    goPointAdminpage() {
      this.$router.push("/point/admin/");
    },
    async openRegistration() {
        if(!this.$checkAuthenticated()) return
        await this.$store.dispatch('directSales/directSaleRegistrationByUser/initializeStateForRegister')

        const modalWidth = $(window).width() < 1000 ? $(window).width() - 80 : '1000px'
        const modalHeight = $(window).height() < 1200 ? $(window).height() - 100 : '1200px'

        this.$modal.show(RegistrationModal, {
          "showBusinessHours": true
        }, {
          clickToClose: true,
          width: modalWidth,
          height: modalHeight,
          scrollable: true
        })
    },
    async signOut() {
      await firebase.auth().signOut();
      this.$store.commit('currentUser/RESET_STATE_CURRENT_USER');
      this.$router.push('/');
    },
    async startWithDrawal() {
      if (confirm('退会します。よろしいでしょうか？')) {
        await this.$store.dispatch('timeline/removeTimeLine');
        await this.$store.dispatch('currentUser/removeUserData');
        await firebase.auth().signOut();
        this.$router.push('/');
      }
    }
  },
  computed: {
    ...mapGetters({
      // user: 'userDetail/user',
      currentUser: 'currentUser/currentUser',
      isAdmin: 'currentUser/isAdmin',
      pointTotal: 'point/pointTotal'
    }),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 20px;

  p.follow {
    font-size: 13px;
    color: gray;
    padding: 8px 0;

    span {
      font-weight: bold;
      color: #76C076;
      padding-right: 5px;
    }
  }
}
.mypage-icon-1 {
  height: 80px !important;
  width: 80px !important;
  border-radius: 50%;
  left: 16px;
}
</style>