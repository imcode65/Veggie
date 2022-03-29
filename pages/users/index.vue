<template lang="pug">
  .wrapper
    Logo(ref="logo")
    Loading(ref="loading")
    WindowScrollLoadList(v-if="userList.length!=0" :items="userList" :numOfItemsPerLoad="10")
      template(#list="list")
        .d-flex.justify-content-around.flex-wrap
          UserListItem(ref="store" v-if="list.itemsToShow" v-for="(user, id) in list.itemsToShow" :user="user" :key="id" )
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{

    }
  },
  head() {
    return {
      title: 'ユーザー一覧',
    }
  },
  computed: {
    ...mapGetters({
      userList: 'userList/userList',
    }),
  },
  methods: {
    async initializeState(){
      // console.log('index/initializeState');
      this.$refs.logo.$el.classList.add('d-none')
      //ユーザ一覧を取得する
      if(this.userList.length === 0) await this.$store.dispatch('userList/initializeState')
    },
  },
  layout: 'index',
  mounted(){
    // console.log('index/initializeState');
    this.initializeState()
  }
}

</script>


<style lang="scss" scoped>
@media screen and (max-width: 1023px) {
  .wrapper {
    background: rgba(190, 155, 105, 0.1);
  }
}
</style>