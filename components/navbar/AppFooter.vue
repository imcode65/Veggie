<template lang="pug">
nav.container-fluid.fixed-bottom.navbar-light.bg-light
  footer.row
    nuxt-link.col.d-flex.flex-column.align-items-center.justify-content-center(
      :class="{ active: $route.name === 'index' || $route.name === 'map' }",
      to="/"
    )
      .row 
        i.material-icons.icon room
      .row 直売所検索
    nuxt-link.col.d-flex.flex-column.align-items-center.justify-content-center(
      :class="{ active: $route.name === 'timeline' }",
      to="/timeline"
    )
      .row 
        i.material-icons.icon schedule
      .row タイムライン
    nuxt-link.col.d-flex.flex-column.align-items-center.justify-content-center(
      :class="{ active: $route.name === 'notifications' }",
      to="/notifications/"
    )
    
      .row 
        i.material-icons.icon notifications
      .row お知らせ
      span#notification-badge.badge-pill.badge-danger {{ unreadCountStr }}
    nuxt-link.col.d-flex.flex-column.align-items-center.justify-content-center(
      :class="{ active: $route.name === 'mypage' }",
      to="/mypage/"
    )
      .row 
        i.material-icons.icon account_circle
      .row アカウント
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      unreadCountStr: "notifications/unreadCountStr",
    }),
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 0;
  font-size:0.8rem;
  .col {
    color: #be9b69;
    text-decoration: none;
    padding: 3px 0;
    &.active {
      color: #fff;
      background-color:#E48F6B;
    }
  }
}
#notification-badge {
  position: absolute;
  top: -10px;
  right: 1rem;
}

@media screen and (min-width:1024px) {
footer {
    display: none;
    
}

}
</style>

