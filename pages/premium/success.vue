<template lang="pug">
.premium-page-wrapper(
    v-if="user"
)
    ProfileImage
    .right(
        style="display: flex; justify-content: end;"
    )
        ProfileInfo
    div(
        style="cursor: pointer"
        @click="goToBack"
    ) Go Back
    div {{ success_msg }}
.container(
    v-else
)
    Loading(ref="loading")
</template>

<script>
import {mapGetters} from 'vuex'
import firebase from '~/plugins/firebase'
const db = firebase.firestore()
// if (process.browser && location.hostname === "localhost") {
//   db.useEmulator("localhost", 8080);
// }

export default {
  data(){
    return{
      loginOrLogoutText: '',
      success_msg: ""
    }
  },
  head() {
    return {
      title: 'premium',
    }
  },
  methods: {
    async initializeState() {
        this.$refs.loading.startLoading();
    },
    goToBack() {
        this.$router.push("/premium/");
    }
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
        this.$refs.loading.finishLoading()
        // setTimeout(() => {
        //   this.displayCheckout = true
        // }, 1500)
      }
      else{
        this.loginOrLogoutText = 'ログイン' 
      }
    })
  },
  mounted(){
    if (!this.user) {
        this.initializeState()
        this.$checkAuthenticated()
    }
    if (localStorage.getItem("veggie_paying") === 'true') {
        this.success_msg = "Success fully paid"
    } else {
        this.success_msg = "Something wrong"
    }
    localStorage.removeItem("veggie_paying")
  },
  beforeRouteLeave(to, from, next) {
    this.$modal.hideAll();
    next();
  },
}
</script>

<style lang="scss" scoped>
</style>