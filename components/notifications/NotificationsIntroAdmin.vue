<template lang="pug">
.w-100.mt-1.mb-1.border-bottom(v-if="isShow")
  .header-line
    div.content(@click="moveToPage") {{ content() }}
    div.close-icon
      i.material-icons.icon.mr-2(@click="clickClose") close
  p.lightGray {{ timePosted(notification.createdAt) }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      ADMIN_NOTIFICATION: "運営からのお知らせ",
      USER_FOLLOW: "ユーザフォロー",
      LIKE_ON_MY_TIMELINE_POST: "自分の投稿へのいいね",
      DM_RECEIVED: 'DM'
    };
  },
  props: ["notification"],
  computed: {
    ...mapGetters({
      userList: 'userList/userList',
    }),
    isShow() {
      return (
        this.notification &&
        (this.ADMIN_NOTIFICATION === this.notification.kind ||
          this.LIKE_ON_MY_TIMELINE_POST === this.notification.kind ||
          this.USER_FOLLOW === this.notification.kind ||
          this.DM_RECEIVED === this.notification.kind)
      );
    },
    isAdminNotification() {
      return (
        this.notification && this.ADMIN_NOTIFICATION === this.notification.kind
      );
    },
  },
  methods: {
    moveToPage() {
      if (this.notification.kind === this.ADMIN_NOTIFICATION) {
        window.open(this.notification.details[0].content, '_blank');
      }
    },
    clickClose() {
      console.log("asdfasdf")
    },
    content() {
      if (this.notification.kind === this.ADMIN_NOTIFICATION)
        return this.notification.details[0].title;
      if (this.notification.kind === this.USER_FOLLOW) {
        return this.userList[this.notification.userId] + " あなたをフォローしました";
      }
      if (this.notification.kind === this.LIKE_ON_MY_TIMELINE_POST)
        return this.notification.dispMessage;
      if (this.notification.kind === this.DM_RECEIVED)
        return this.notification.dispMessage;
      return " ";
    },
    timePosted(timestamp) {
      if (!timestamp) return "";
      var date = new Date(timestamp.seconds * 1000);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var formattedTime =
        year +
        "年" +
        month +
        "月" +
        day +
        "日" +
        hours +
        ":" +
        minutes.substr(-2);

      return formattedTime;
    },
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
.header-line {
  color: #212529;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  div.content {
    flex-grow: 1;
    flex-shrink: 1;
    width: calc(100% - 24px);
    color: blue;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  div.close-icon {
    flex-grow: 0;
    flex-shrink: 0;
    width: 24px;
    cursor: pointer;
  }
}
.lightGray {
  color: #8e8e8e;
  font-size: 0.8rem;
  text-align: right;
}

</style>

