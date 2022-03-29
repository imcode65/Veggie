<template lang="pug">
  div
    nav.navbar-light(style="box-shadow: 0 0 4px grey;")
      header.d-flex.justify-content-between.m-auto
        .logo(@click="goHome")
          img.main-logo(src="~assets/logo-with-title.png")
        .searchbar-inner(v-if="$route.name === 'index' || $route.name === 'directSales' ")
          i.fa.fa-search
          input(id="search-input" type="text" placeholder="直売所検索" v-model="searchword" @input="changeSearch")
        div(
          style="display: flex; align-items: center; margin-right: 5px;"
        )
          ImgFirebaseLoader.user-icon(
            v-if="user && user.name"
            :path="user.imageStoragePath" 
            objectFit="cover" 
            :modalDisabled="true"
          )
        .user-info(
          style="margin-right: 5px;"
        )
          span(
            style="min-width: 120px; max-width: 200px;overflow: hidden;word-break: break-all;white-space: nowrap;"
          ) {{(user && user.name !== '') ? user.name : "Veggieへようこそ"}}
          span(
            v-if="user && user.name !== ''"
          ) {{point}} pt
        .auth-button(
          @click="loginOrLogOut"
        )
          .text {{ loginOrLogoutText }}
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapGetters, mapActions } from "vuex";

export default {
  data(){
    return{
      loginOrLogoutText: '',
      searchword: "",
    }
  },
  watch: {
    searchword: function(strSearch) {
      this.changeSearchWord(strSearch)
    }
  },
  computed: {
    ...mapGetters({
      user: 'currentUser/currentUser',
      point: 'point/pointTotal'
    })
  },
  methods:{
    ...mapActions({
      changeSearchWord: 'searchDirect/changeSearchWord'
    }),
    //　mypage/index にも同じメソッドがあるのでリファクタが必要そう
    loginOrLogOut(){
      if(this.loginOrLogoutText === '登録・ログイン'){
        this.$checkAuthenticated()
      }
      else{
        this.signOut()
      }
    },
    async signOut() {
      await firebase.auth().signOut();
      this.$store.commit('currentUser/RESET_STATE_CURRENT_USER');
      this.loginOrLogoutText = '登録・ログイン';
      this.$router.push('/');
    },
    goVeggie(){
      window.location.replace('https://note.com/veggiejapan')
    },
    goHome(){
      this.$router.push('/')
    },

    changeSearch: function(event) {
      //scroll to directSaleList
      if (this.$route.name === 'index') {
        document.documentElement.scrollTop = 1750;
      } else {
        document.documentElement.scrollTop = 10;
      }
    },

    gotoFirstPage() {
      this.$router.push(`/`)
    },

    moveToDirectSaleSearch(){
      this.$router.push(`/directSales/search`)
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      if(user){
        // await this.$store.dispatch('userDetail/initializeState', user.uid)
        await this.$store.dispatch('currentUser/initializeState', user)
        this.loginOrLogoutText = 'ログアウト'
      }
      else{
        this.loginOrLogoutText = '登録・ログイン' 
      }
    })
  },
  mounted(){
    if (!this.user) {
      this.$checkAuthenticated()
    }
    // setInterval(() => {
    //   console.log(this.$store.getters)
    // }, 2000)
  },
}
</script>

<style lang="scss" scoped>
  nav{
    width: 100%;
    background: white;
    header{
      height: 54px;
      max-width: 1200px;
      color: #232426;
      .logo{
        height: 100%;
        margin-left: 10px;
        flex-grow: 1;
        cursor: pointer;
        img{
          margin-top: 7px;
          height: 80%;
        }
        .main-logo{
          margin-top: 0px;
          height: 100%;
        }
      }
      div {
        .user-icon {
          width: 2.5rem !important;
          height: 2.5rem !important;
        }
        &.searchbar-inner {
          width: 100%;
          color: #be9b69;
          display: flex;
          align-items: center;
          margin-left: 3rem;

          input::-webkit-input-placeholder {
            opacity: 1;
          }

          input:focus {
            outline: none;
          }

          input {
            margin-left: -12px;
            border-radius: 10px;
            padding: 5px 10px 5px 35px;
            font-size: 16px;
            border: none;
            background-color: #e5e5e5b0;
            width: 90%;
            transition: width .5s ease-in-out;

            &::-webkit-input-placeholder {
              color: grey;
              opacity: 1;
            }
          }

          i {
            position: relative;
            left: 12px;
            font-weight: 400;
          }
        }
      }
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .auth-button {
        width: 240px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .text {
          border-left: 3px solid #E48F6B;
          width: 100%;
          text-align: center;
        }
      }
    }
  }

</style>
