<template lang="pug">
.wrapper(style="margin-top: 1rem;")
  h4.mb-0 {{ user.name }}
  p.mb-0 {{ user.introduction }}

  p.follow.mb-0
    span {{ user.following_users ? user.following_users.length : 0 }}
    | フォロー中｜
    span {{ user.user_following ? user.user_following.length : 0 }}
    | フォロワー
  
  p.pointer
    span P
    | {{ pointTotal }}pt

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    
  },
  props: ["user"],
  computed: {
    ...mapGetters({
      // user: 'userDetail/user',
      // currentUser: 'currentUser/currentUser',
      pointTotal: 'point/pointTotal'
    }),
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 20px;
  min-height: 125px;
  p.follow {
    font-size: 13px;
    color: gray;
    padding: 4px 0;

    span {
      font-weight: bold;
      color: #76C076;
      padding-right: 5px;
    }
  }

  p.pointer {
    font-size: 13px;
    color: #E48F68;
    font-weight: bold;
    border-bottom: 1px solid #BE9B69;
    display: inline-block;
    padding-bottom: 4px;

    span {
      display: inline-block;
      width: 20px;
      border-radius: 4px;
      background-color: #E48F68;
      line-height: 20px;
      text-align: center;
      color: white;
      font-weight: normal;
      margin-right: 8px;
    }
  }
}
</style>