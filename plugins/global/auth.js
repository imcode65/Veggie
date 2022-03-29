import SignIn from '~/components/common/SignIn.vue'
import firebase from '~/plugins/firebase'

const checkAuthenticated = function () {
  if (!firebase.auth().currentUser) {
    this.$modal.show(SignIn, {}, {
      width: 348,
      height: 'auto',
      scrollable: true
    })
    return false
  }
  return true
}

export default ({}, inject) => {
  inject('checkAuthenticated', checkAuthenticated)
}