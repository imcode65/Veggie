<template lang="pug">
.container.mt-4
  nav.navbar.bg-pink
    span.navbar-brand.mb-0.h1 運営からのお知らせ
  NotificationsListItem.pl-3.pr-3.bg-white(
    v-for="adminNotification in adminNotifications" 
    :key="adminNotification.guid"
    :notification="adminNotification"
    :isAdmin="true"
  )
  nav.navbar.bg-pink.sticky-top.mt-1
    span.navbar-brand.mb-0.h1 過去
  WindowScrollLoadList(
    v-if="currentUser && notifications.length != 0",
    :items="notifications",
    numOfItemsPerLoad=10
  )
    template(#list="list")
      NotificationsListItem.pl-3.pr-3.bg-white(
        v-for="(notification, id) in list.itemsToShow",
        :key="id"
        :notification="notification"
        :isAdmin="false"
      )
  p(v-else) まだ通知がありません
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedTab: 1,
      adminNotifications: []
    };
  },
  head() {
    return {
      title: "notifications",
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser/currentUser",
      notifications: "notifications/notifications",
    }),
  },
  methods: {
    async initializeState() {
      await this.$store.dispatch("notifications/readAll");
      // console.log('fetching rss');
      const RSS_URL = `https://us-central1-veggielcc-development.cloudfunctions.net/getNoteRss/rss`;

      const Parser = require('rss-parser')
      const parser = new Parser()
      const feed = await parser.parseURL(RSS_URL)
      feed.items.forEach(item => {
        this.adminNotifications.push({
          guid: item.guid,
          createdAt: {
            seconds: new Date(item.isoDate).getTime() / 1000
          },
          kind: "運営からのお知らせ",
          details: [
            {
              title: item.title,
              content: item.guid,
            },
          ],
          read: true,
          userId: "",
        })
      })
    },
  },
  layout: "index",
  mounted() {
    this.initializeState();
    firebase.auth().onAuthStateChanged(async (user) => {
      // リロードやブックマークなどでこのページに直接遷移した場合、
      // ~/layout/index内で実施しているログイン処理が完了しておらず
      // 通知の取得が行われない状態になってしまう。
      // そのため、この画面でもログイン判定を行い、ログインしていたら通知を取得する
      if (user) {
        if (this.currentUser === "") {
          await this.$store.dispatch("currentUser/initializeState", user);
          await this.$store.dispatch("notifications/readAll");
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0rem 1rem;
}
.navbar-brand {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  font-size: 1rem;
}
.bg-pink {
  color: #fff;
  background-color: #e48f6b;
}
.container {
  overflow: auto;
  height: 100%;
}
.sticky-top {
  z-index: 999 !important;
}
</style>
