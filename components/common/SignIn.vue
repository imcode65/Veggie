<template lang="pug">
    div(style="background: white;")
      .text-center
        a.position-absolute(v-if="!isHideClear" href="#" @click.prevent="$emit('close')" style="top: 0; right: 0;")
          i.material-icons(style="color: #ccc; font-size: 2rem;") clear
      .p-3 
        .pb-3 続けるにはアカウントの作成が必要です。
        ul.list-unstyled
          li.mb-1
            a.btn.btn-block.position-relative(href="#" @click="signInWithApple" style="height: 40px; color: #ffffff; background-color: #232426;")
              img.position-absolute(src="~/assets/apple.svg" style="top: 5px; left: 10px;")
              | AppleIDではじめる
          li.mb-1
            a.btn.btn-block.position-relative(href="#" @click="signInWithGoogle" style="height: 40px; color: #ffffff; background-color: #4285f4;")
              img.position-absolute(src="~/assets/google.svg" style="top: 5px; left: 7px;")
              | Googleではじめる
        ul.list-unstyled.list-inline.text-center
          li.list-inline-item
            a(:href="usagetermsLink" target="_blank" style="font-size: 0.8rem; color: #d9706f;") 利用規約
          li.list-inline-item
            a(:href="personalTermsLink" target="_blank" style="font-size: 0.8rem; color: #d9706f;") 個人情報保護方針
            .position-relative
</template>

<script>
import firebase from '~/plugins/firebase'
import { USAGE_TERMS_LINK, PERSONAL_TERMS_LINK } from '@/constants/'

export default {
  data(){
    return{
      usagetermsLink: USAGE_TERMS_LINK,
      personalTermsLink: PERSONAL_TERMS_LINK,
    }
  },
  props: {
    isHideClear: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  methods: {
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
      this.$store.commit('currentUser/RESET_STATE_CURRENT_USER')
    },
    signInWithApple() {
      const provider = new firebase.auth.OAuthProvider('apple.com')
      provider.addScope('email')
      provider.addScope('name')
      firebase.auth().signInWithPopup(provider)
      this.$store.commit('currentUser/RESET_STATE_CURRENT_USER')
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$emit('close')
      }
    })
  },
}
</script>

<style scoped>
</style>
