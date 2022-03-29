<template lang="pug">
  no-ssr
    nav.mt-4.mb-4
      .wrapper
        .menu-wrapper.p-4
          .title 一覧から探す
            .img-wrapper
              img.filter-veggie-color(src="~assets/sidebar-icon.svg")
          PCSidebarMenu(
            :class="{ active: $route.name === 'notifications' }"
            displayText="お知らせ" 
            @action="goNotifications"
          )
          PCSidebarMenu(
            v-if="currentUser"
            :class="{ active: $route.name === 'mypage' }"
            displayText="マイページ" 
            @action="goMypage"
          )
          PCSidebarMenu(
            v-if="currentUser"
            :class="{ active: $route.name === 'point' }"
            displayText="マイポイント管理"
            @action="goPointpage"
          )
          PCSidebarMenu(
            v-if="isAdmin"
            :class="{ active: $route.name === 'point-admin' }"
            displayText="ポイント管理者"
            @action="goPointAdminpage"
          )
          PCSidebarMenu(
            :class="{ active: $route.name === 'timeline' }"
            displayText="タイムライン" 
            @action="goTimelines"
          )
          PCSidebarMenu(
            :class="{ active: $route.name === 'users' }"
            displayText="ユーザー検索" 
            @action="goUsers"
          )
          PCSidebarMenu(
            :class="{ active: $route.name === 'directSales' }"
            displayText="直売所一覧" 
            @action="goDirectSales"
          )
          PCSidebarMenu(
            v-if="!production"
            :class="{ active: $route.name === 'premium' }"
            displayText="購入保険料" 
            @action="goPremiumPage"
          )
          PCSidebarMenu(
            v-if="currentUser"
            displayText="各種設定"
            @action="startVariousSetting"
          )
          .menu-wrapper(:class="`${isVariousSetting ? 'OverFlowVisible height-5': 'OverFlowHidden height-0'}`" style="transition: height 0.5s;")
            PCSidebarMenu(
              style="margin-left: 1.5rem;"
              v-if="currentUser"
              displayText=" お問合せ"
              @action="startInquiries"
            )
            PCSidebarMenu(
              style="margin-left: 1.5rem;"
              v-if="currentUser"
              displayText="退会"
              @action="startWithDrawal"
            )
        div(
          style="display: flex; align-items: center; justify-content: space-around;margin-top: 12px; cursor: pointer;"
          @click="gotoViewVeggie"
        )
          img.service-logo(src="~assets/veggie-service-logo.png")
          div.text-content {{ "見えベジについて" }}
      //- adsbygoogle(:ad-slot="6762554901").ad.mt-4.mb-4
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      isVariousSetting: false,
      production: process.env.VEGGIE_MODE === "production"
    }
  },
  props: ["sidebarProps"],
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goDirectSales() {
      this.$router.push("/directSales/");
    },
    goFavoriteDirectSales() {
      this.$router.push("/mypage/favorites/");
    },
    goMap() {
      this.$router.push("/map/");
    },
    goUsers() {
      this.$router.push("/users/");
    },
    goTimelines() {
      this.$router.push("/timeline/");
    },
    goNotifications() {
      this.$router.push("/notifications/");
    },
    goMypage() {
      this.$router.push("/mypage/");
    },
    goPointpage() {
      this.$router.push("/point/");
    },
    goPointAdminpage() {
      this.$router.push("/point/admin/");
    },
    goPremiumPage() {
      this.$router.push("/premium/");
    },
    startVariousSetting() {
      this.isVariousSetting = !this.isVariousSetting;
    },
    startInquiries() {
      window.open("https://www.veggiejapan.com");
    },
    async startWithDrawal() {
      this.$isVariousSetting = true;
      if (confirm('退会します。よろしいでしょうか？')) {
        await this.$store.dispatch("timeline/removeTimeLine");
        await this.$store.dispatch("currentUser/removeUserData");
        firebase.auth().signOut();
      }
    },
    gotoViewVeggie() {
      window.open("https://www.veggiejapan.com/%E8%A6%8B%E3%81%88%E3%81%B9%E3%82%B8");
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser/currentUser",
      isAdmin: "currentUser/isAdmin"
    }),
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: 90%;
  .wrapper {
    position: sticky;
    top: 100px;
    .menu-wrapper {
      display: flex;
      flex-direction: column;
      background: rgba(190, 155, 105, 0.2);
      border-radius: 12px;
      .title {
        margin: auto;
        color: #be9b69;
        font-size: 1rem;
        font-weight: 500;
        .img-wrapper {
          margin: 10px auto;
          width: 35px;
          height: 27px;
          img {
            width: 100%;
            height: 100%;
          }
          .filter-veggie-color {
            filter: invert(65%) sepia(9%) saturate(1536%) hue-rotate(356deg)
              brightness(96%) contrast(95%);
          }
        }
      }
      .logo {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .active {
        color: #e48f6b;
      }
      .ShowNone {
        display: none;
      }
      .OverFlowHidden {
        overflow: hidden;
      }
      .OverFlowVisible {
        overflow: visible;
      }
      .height-0 {
        height: 0rem;
      }
      .height-5 {
        height: 5.4rem;
      }
      .width-0 {
        width: 0rem;
      }
      .width-3 {
        width: 5rem;
      }
    }
    .service-logo {
      width: 20%;
      height: auto;
    }
  }
  .ad {
    position: sticky;
    top: 550px;
  }
}
</style>
