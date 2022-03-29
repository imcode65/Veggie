<template lang="pug">
.mypage-wrapper(v-if="user")
  ProfileImage(:user="user")

  .btn
    i.material-icons.icon mail_outline
    p.btn-edit(@click="goEditProfile()") 編集

  ProfileInfo(:user="user")

  b-tabs.mypage.px-2(fill)
    b-tab(title="投稿済み")
      MyTimelines
    b-tab(title="みんなの投稿" lazy)
      MyReviews
    b-tab(title="お気に入りの直売所" lazy)
      FavoriteSales
  .fixed-button(v-if="false") {{ "Pre" }}
.container(v-else)

</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
import DirectSalePostForm from '~/components/directSale/DirectSalePostForm'

const db = firebase.firestore()
// if (process.browser && location.hostname === "localhost") {
//   db.useEmulator("localhost", 8080);
// }

export default {
  data(){
    return{
      loginOrLogoutText: '',
    }
  },
  head() {
    return {
      title: 'mypage',
    }
  },
  methods: {
    async signOut() {
      firebase.auth().signOut()
      this.$store.commit('currentUser/RESET_STATE_CURRENT_USER')
    },
    async withDrawal() {
      if (confirm('退会します。よろしいでしょうか？')) {
        await this.$store.dispatch('timeline/removeTimeLine')
        await this.$store.dispatch('currentUser/removeUserData')
        firebase.auth().signOut()
      }
    },
    goEditProfile(){
      this.checkSignedInOrMove('/mypage/profile')
    },
    checkSignedInOrMove(path) {
      if (this.$checkAuthenticated()) {
        this.$router.push(path)
      }
    },
    showPostModal(){
      if (this.$checkAuthenticated()) {
        this.$modal.show(DirectSalePostForm, {}, {
          clickToClose: true,
          width: $(window).width() - 50,
          height: 'auto',
          scrollable: true
        })
      }
    },
    goAdmin(){
      this.$router.push('/admin')
    },
  },
  layout: 'index',
  computed: {
    ...mapGetters({
      user: 'currentUser/currentUser'
    }),
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      if(user){
        await this.$store.dispatch('currentUser/initializeState', user)
        this.loginOrLogoutText = 'ログアウト'
        //　ユーザ情報取得
        // let userRef = db.collection('users').doc(user.uid)
        // let doc = await userRef.get()
        // const data = doc.data()
        // if(data.name){ 
        //   this.acountName = data.name
        //   this.imageStoragePath = data.imageStoragePath
        // } else{
          // this.acountName = user.displayName
        // }
      }
      else{
        this.loginOrLogoutText = 'ログイン' 
      }
    })
  },
  mounted(){
    if (!this.user) {
      this.$checkAuthenticated()
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$modal.hideAll();
    next();
  },
}
</script>

<style lang="scss" scoped>
.mypage-wrapper {
  position: relative;
}
@media screen and (min-width:1024px) { 
  .mypage-wrapper {
    background-color: #f2f3f5;
    min-height: 75vh;
    position: relative;
  }
}

.btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px 0;

  .material-icons {
    color: gray;
    margin-right: 10px;
  }

  .btn-edit {
    width: 60px;
    border-radius: 20px;
    border: 1px solid #be9b69;
    margin: 0;
    // line-height: 40px;
    color: #be9b69;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>

<style lang="scss">
.nav-tabs {
  margin-bottom: 12px;
}
.mypage .nav-tabs {
  .nav-link {
    padding: 0;
    color: gray;
    font-size: 13px;

    &.active {
      color: #BE9B69;
      border: none;
      border-bottom: 2px solid #BE9B69;
    }
  }
}
.fixed-button {
  position: absolute;
  right: 1rem;
  border-radius: 1000px;
  border: 1px solid gray;
  background-color: #E48F68;
  color: white;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #BE9B69;
    cursor: pointer;
  }
}
</style>