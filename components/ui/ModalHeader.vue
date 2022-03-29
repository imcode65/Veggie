<template lang="pug">
  .header
    a.position-absolute(href="#" @click.prevent="$emit('close')" style="top: 8px; left: 0;")
      i.material-icons(style="color: #ccc; font-size: 2rem;") {{icon}}
    .title {{title}}

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {

    }
  },
  props: ['title', 'icon'],
  methods:{

  },
  computed: {

  },
  watch: {

  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
    .header {
      position: relative;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      .title {
        
      }
    }
</style>