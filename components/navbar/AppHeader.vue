<template lang="pug">
div(style="")
  transition(name="fade")
    nav.container-fluid.navbar-light.bg-twiter-bar.twitter-banner.icon(
      v-if="seen",
      style="box-shadow: 0 0 4px grey"
    )
      header.d-flex
        div(style="display: flex; align-items: center;")
          button.btn-close(v-if="false" @click="seen = !seen") X
          img(src="~assets/logo.png")
          div(style="")
            p.twitter-title(style="margin-bottom: 0;") チョクバイGO！
            p.twitter-text "チョクバイGO！" Appで開く
        a.open-btn(@click="goVegieTwitter") 開く
  nav.container-fluid.navbar-light.bg-light(style="box-shadow: 0 0 2px grey")
    header.d-flex.justify-content-between
      .logo(v-if="$route.name !== 'index' && !$route.name.includes('mypage')")
        img(src="~assets/logo-with-title-big.png")
      .searchbar-inner(v-if="$route.name === 'index'")
        i.fa.fa-search
        input(id="search-input" type="text" placeholder="直売所検索" v-model="searchword" @input="changeSearch" @focus="focusSearch" @blur="lostFocusSearch")
        a.boxclose(id="removeButton" @click="clearSearch")
        span.searchbar-disable-button(id="cancelButton" @click="gotoFirstPage") キャンセル
      .title(:class="{ flex: $route.name === 'mypage' }")
        b-button.navmenu(v-b-toggle.mysidebar)
          i.material-icons.icon menu
        h4.mypage(v-if="user" style="display: flex; align-items: center;") {{ user.name }}
      .title(:class="{ active: $route.name === 'timeline' }" style="display: flex; align-items: center;") 
        //- h4 タイムライン
        i.material-icons.icon(@click="showDMProfileModal") mail_outline
      //- .title(:class="{ active: $route.name === 'notifications' }") 
        //- h4 最新情報
      .title(
        :class="{ active: $route.name.includes('user') && $route.name.includes('detail') }"
      ) 
        h4 ユーザー詳細
      .title(
        :class="{ active: !$route.name.includes('user') && $route.name.includes('detail') }"
      ) 
        h4 詳細情報
      .title(:class="{ active: $route.name === 'mypage-favorites' }") 
        h4 お気に入り
      .title(:class="{ active: $route.name === 'user' }") 
        h4 ユーザー
  nav.container-fluid.search-bar.navbar-light.bg-light(v-if="$route.name.includes('search')?true:false", style="box-shadow: 0 0 2px grey")
    header.d-flex.justify-content-between
      .searchbar-inner
        i.fa.fa-search
        input(id="search-input" type="text" placeholder="直売所検索" v-model="searchword" @input="changeSearch" @focus="focusSearch" @blur="lostFocusSearch")
        a.boxclose(id="removeButton" @click="clearSearch")
        span.searchbar-disable-button(id="cancelButton" @click="gotoFirstPage") キャンセル
  b-sidebar#mysidebar(v-if="$route.name === 'mypage' && user")
    SideNav(ref="sidebar")
</template>

<script>
import DMProfileModal from "~/components/ui/dm/DMProfileModal";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      searchword: "",
      seen: true,
      search_seen:true,
      hasSearchFocus: false,
      android: false
    };
  },
  watch: {
    searchword: function(strSearch) {
      this.changeSearchWord(strSearch)
    }
  },
  computed: {
    ...mapGetters({
      searchstring: "searchDirect/searchString",
      user: "currentUser/currentUser",
    }),
  },
  methods: {
    ...mapActions({
      changeSearchWord: 'searchDirect/changeSearchWord'
    }),
    detectMob() {
        // const toMatch = [
        //     /Android/i,
        //     /webOS/i,
        //     /iPhone/i,
        //     /iPad/i,
        //     /iPod/i,
        //     /BlackBerry/i,
        //     /Windows Phone/i
        // ];
        const toMatchItem = /Android/i
        
        // return toMatch.some((toMatchItem) => {
            return window.navigator.userAgent.match(toMatchItem);
        // });
    },
    isIOSDevice() {
      if (process.browser) {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          return true;
        } else {
          return false;
        }
      }
    },

    changeSearch: function(event) {
      document.documentElement.scrollTop = 1080;
      if(event.target.value === '') {
        document.getElementById("removeButton").style.visibility = "hidden";
      }
      else {
        document.getElementById("removeButton").style.visibility = "visible";
      }
    },

    clearSearch(event) {
      this.searchword = '';
      event.target.style.visibility = 'hidden';
      // document.getElementById("search-input").style.width = '90%';
      this.lostFocusSearch();
    },

    focusSearch(event) {
      this.hasSearchFocus = true;
      event.target.style.outline = 'none';
      event.target.style.width = 'calc(100% - 100px)';
      document.getElementById("cancelButton").style.fontSize = '14px';

    },

    lostFocusSearch(event) {
      document.documentElement.scrollTop = 10;

      if(this.searchword === '') {
        this.hasSearchFocus = false;
        document.getElementById("search-input").style.width = '90%';
        document.getElementById("cancelButton").style.fontSize = '0px';
      }
    },

    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition < 0) {
        return;
      } else if (currentScrollPosition < 20) {
        this.seen = true;
      } 
      else {
        this.seen = false;
      }
    },

    gotoFirstPage() {
      this.$router.push(`/`)
    },

    moveToDirectSaleSearch(){
      this.$router.push(`/directSales/search`)
    },

    goVegieTwitter() {
      window.location.replace("https://apps.apple.com/jp/app/veggie-%E3%83%99%E3%82%B8%E3%83%BC/id1522765673");
    },

    showDMProfileModal() {
      if (this.$checkAuthenticated()) {
        const modalWidth =
          $(window).width() < 1000 ? `${$(window).width() - 50}px` : "1000px";
        const modalHeight = `${$(window).height() - 240}px`;
        this.$modal.show(
          DMProfileModal,
          {},
          {
            clickToClose: true,
            width: modalWidth,
            height: modalHeight,
            scrollable: true,
            style: {
              overflow: "auto",
            }
          }
        );
        // heightを上記にてauto以外に設定してしまうとscrollable: true
        // が効かなくなってしまうので手動で設定する
        setTimeout(() => {
          document.getElementsByClassName("vm--modal")[0].style.overflow =
            "scroll";
          document.getElementsByClassName("vm--modal")[0].style.background =
            "#f2f3f5";
        }, 100);
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)

    // this.android = this.detectMob();
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
};
</script>

<style lang="scss" scoped>

.icon {
  cursor: pointer;
}

.bg-twiter-bar {
  background-color: white !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  height: 50px;
  overflow: hidden;
}
.fade-enter,
.fade-leave-to {
  height: 0;
  opacity: 0;
}

nav.twitter-banner {
  max-width: 1023px;
  width: 100%;

  transform: translate3d(0, 0, 0);

  header {
    height: 50px;
    color: black;
    // margin-bottom: 0.3rem;
    padding: 7px 0;
    justify-content: space-between;
    div {
      display: flex;
      button {
        &.btn-close {
          background-color: transparent;
          border: none;
          color: white;
        }

        &.btn-close:hover {
          opacity: 0.7;
        }
      }
      img {
        border-radius: 25%;
        margin-left: 4px;
        height: 40px;
        width: 40px;
      }
      div {
        margin-left: 10px;
        flex-direction: column;
        p {
          &.twitter-title {
            margin: 0 !important;
            font-size: 15px;
            font-weight: bold;
          }

          &.twitter-text {
            margin: 0 !important;
            font-size: 13px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
    a {
      &.open-btn {
        padding: 6px;
        background-color: #0084ffb0;
        border-radius: 20px;
        width: 80px;
        color: white !important;
        text-align: center;
        letter-spacing: 3px;
        font-size: 16px;
      }
    }
  }
}

nav {
  max-width: 1023px;
  width: 100%;
  header {
    height: 50px;
    color: #be9b69;
    // margin-bottom: 0.3rem;
    padding: 8px 0;
    
    .logo{
        height: 100%;
        margin-left: 10px;
        width: 150px;
        display: flex;
        align-items: center;
        img{
          // margin-top: -15px;
          width: auto;
          height: 100%;
        }
      }
    
    div {
      &.searchbar-inner {
          
        width: 100%;

        input::-webkit-input-placeholder {
          // color: grey;
          opacity: 1;
        }
        
        input {
          margin-left: -12px;
          border-radius: 10px;
          padding: 5px 10px 5px 35px;
          font-size: 16px;
          border: none;
          background-color: #e5e5e5b0;
          width: 90%;
          transition: width .5s ease-in-out;

          &::-webkit-input-placeholder {
            color: grey;
            opacity: 1;
          }
        }

        i {
          position: relative;
          left: 12px;
          font-weight: 400;
        }

        a.boxclose{
          cursor: pointer;
          color: #fff;
          border: 1px solid #AEAEAE;
          border-radius: 10px;
          background: darkgrey;
          font-size: 16px;
          display: inline-block;
          line-height: 0px;
          width: 18px;
          height: 18px;
          padding: 7px 3px;
          left: -26px;
          position: relative;
          visibility: hidden;
          text-decoration-line: none;
          
          &:before {
              content: "×";
          }
        }

        span {
          &.searchbar-disable-button {
            cursor: pointer;
            padding: 5px 10px;
            font-size: 0px;
            overflow:hidden;
            transition: font-size .5s ease-in-out;
            margin-left: -15px;
          }
        }
      }    
    }

    button.navmenu {
      background: transparent;
      background-color: transparent;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      i {
        color: #be9b69;
      }
    }
    .title {
      display: none;
      &.active {
        display: block;
        cursor: pointer;
      }
      &.flex {
        display: flex;
      }
      h4 {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.3;

        &.mypage {
          line-height: initial;
          margin-bottom: 0;
          margin-left: 12px;
        }
      }
    }
    .icon {
      cursor: pointer;
    }
  }
}

</style>
