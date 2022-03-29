<template lang="pug">
  div
    slot(name="title")
    .list-wrapper(style="width: 100%;")
      slot(name="content") 
    slot(name="more")
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){　
    return{

    }
  },
  props:['title'],
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  label, .label{
    font-family: Hiragino Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #BE9B69;
    letter-spacing: 2px;
  }
  .list-wrapper {
    overflow-x: auto;
  }
  .list-wrapper::-webkit-scrollbar {    /* Chrome、Safari用 */
    display:none;
  }

  @media screen and (max-width: 1023px) {
    .list-wrapper{
      overflow-y: hidden;
      flex-wrap: nowrap;
      width: 100%;
    }
  }

</style>

