<template lang="pug">
    nav.container-fluid
      .row.pctab
        .col.d-flex.flex-column.align-items-center.justify-content-center(v-for="(tab, id) in tabs" :key="id" :class="{ active: selected === tab}" @click="tabClicked(tab)")
          .row.detail {{tab}}
</template>

<script>
export default {
  // tabsに全てのタブ名をパスする
  props: ['selected', 'tabs'],
  methods:{
    tabClicked(tab){
      this.$emit('changeTab', tab) 
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  nav{
    max-width: 1200px;
    border-bottom: 0.5px solid #DADCE0;
    cursor: pointer;
  }

  .col {
    padding: 20px 0;
    
    
    color: #BE9B69;
    border: 1px solid rgba(190,155,105,0.1);
    &.active {
      color:white;
      border: 1px solid rgba(190,155,105,0.1);
      background-color:rgba(228,143,107,0.5);
    } 
  }

  .detail{
    font-size:0.9rem;
  }


  @media screen and (min-width:1024px) { 
    .pctab {
      // width: 360px;
    }
  }
</style>

