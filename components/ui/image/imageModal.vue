<template lang="pug">
  div(style="padding: 1rem;display: flex; justify-content: center; align-items: center; height: 100%;")
    a.position-absolute(href="#" @click.prevent="$emit('close')" style="top: 20px; right: 20px;")
      i.material-icons(style="color: #ccc; font-size: 2rem;") clear
    img(style="width: 100%; height: 100%; object-fit: contain;" ref="image" src="~assets/noimage.jpg")

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){
    return{

    }
  },
  props: ['url'],
  computed: {
    ...mapGetters({
    }),
  },
  mounted() {
    if(this.url) this.$refs.image.setAttribute('src', this.url)
  },
}
</script>

<style lang="scss" scoped>
// img{
  // width: calc(100vw - 50px);
  // height: calc(100vh - 150px);
//   ;
// }
</style>