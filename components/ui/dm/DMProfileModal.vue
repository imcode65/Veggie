<template lang="pug">
  div.dm-profile-modal
    FormHeader.form-header.pt-2.pb-2.border-bottom(
      title="メッセージ",
      icon="clear",
      buttonName="",
      @actionLeft="$emit('close')",
      @actionRight=""
    )
    .profile-wrapper
      DMProfile(v-for="(dmProfile, id) in dmProfiles" :key="id" :dmProfile="dmProfile")
    
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapGetters } from 'vuex'


export default {
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters({
      dmProfiles: 'dm/dmProfiles/dmProfiles',
    }),
  },
  methods: {
    adjustStyle(){
      const modalHeight = document.getElementsByClassName('vm--modal')[0].offsetHeight
      const headerHeight = document.getElementsByClassName('form-header')[0].offsetHeight
      const profileWrapper = document.getElementsByClassName('profile-wrapper')[0]
      profileWrapper.style.height = modalHeight - headerHeight + 'px'
    },
  },
  mounted() {
    this.adjustStyle()
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        if(this.currentUser === '') await this.$store.dispatch('currentUser/initializeState', user)
        // if(this.dmProfiles.length === 0) await this.$store.dispatch("dm/dmProfiles/initializeState")
        await this.$store.dispatch("dm/dmProfiles/initializeState")
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.dm-profile-modal{
  background-color: #f2f3f5;
  .form-header{
    border-bottom: 1px solid #f2f3f5;
  }
  .profile-wrapper{
    overflow: auto;
  }
}
</style>