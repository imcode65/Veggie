<template lang="pug">
.mypage.p-3.pcw-70
  .m-auto.d-flex.name-container(style="width: fit-content;")
    h4.username.mr-3(v-if="user") {{ user.name }}
    div(style="width: 2rem; height: 2rem; display: flex; justify-content: center; align-items: center;")
      i.material-icons.icon(style="animation-duration: 1s; animation-name: msgButtonEffect;" @click="showDMMessageModal") mail_outline
  p.usertext(v-if="user") {{ user.introduction }}
  p.userurl
    i.material-icons.icon(v-if="user && user.url") insert_link
    a.ml-2(v-if="user && user.url" :href="user.url") {{ user.url }}
  div(v-if="ownedDirectSales && ownedDirectSales.length > 0")
    div(
      v-for="(directSale, id) in ownedDirectSales" 
      :key="id" 
      style="display: flex; align-items: center; margin-bottom: 5px;"
    )
      img(src="~assets/directsale_owner.jpg" alt="direct sale owner" style="width: 24px; margin-right: 10px;")
      div(style="margin-right: 10px;") {{ directSale.name }}
      nuxt-link(:to="'/directSales/' + directSale.id") 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd"><path d="M 14,11.414 7.121,18.293 C 6.835,18.579 6.75,19.009 6.905,19.383 7.059,19.756 7.424,20 7.828,20 c 3.657,0 8.494,0 11.172,0 0.265,0 0.52,-0.105 0.707,-0.293 C 19.895,19.52 20,19.265 20,19 20,15.537 20,8.463 20,5 20,4.735 19.895,4.48 19.707,4.293 19.52,4.105 19.265,4 19,4 15.537,4 8.463,4 5,4 4.448,4 4,4.448 4,5 V 15 C 4,15.552 3.552,16 3,16 2.448,16 2,15.552 2,15 2,15 2,8.414 2,5 2,3.343 3.343,2 5,2 8.463,2 15.537,2 19,2 19.796,2 20.559,2.316 21.121,2.879 21.684,3.441 22,4.204 22,5 c 0,3.463 0,10.537 0,14 0,0.796 -0.316,1.559 -0.879,2.121 C 20.559,21.684 19.796,22 19,22 16.322,22 11.485,22 7.828,22 6.615,22 5.521,21.269 5.057,20.148 4.592,19.027 4.849,17.737 5.707,16.879 L 12.586,10 H 9.343 c -0.552,0 -1,-0.448 -1,-1 0,-0.552 0.448,-1 1,-1 H 15 c 0.552,0 1,0.448 1,1 v 5.657 c 0,0.552 -0.448,1 -1,1 -0.552,0 -1,-0.448 -1,-1 z"/></svg>
  div.follownum
    span.usercountl(v-if="user.following_users" style="flex-shrink: 0; flex-grow: 0;") {{ user.following_users.length }}
    span.padingr(v-if="user.following_users" style="flex-shrink: 0; flex-grow: 0;") フォロー中
    span.usercountr.padingl(v-if="user.user_following" style="flex-shrink: 0; flex-grow: 0;") {{ user.user_following.length }}
    span(v-if="user.user_following") フォロワー
    div(style="flex-shrink: 1; flex-grow: 1;")
    div.count(style="flex-shrink: 0; flex-grow: 0;")
      i.material-icons.icon remove_red_eye
      span {{ user.watch_count }}
  .btn.col.d-flex.flex-column.align-items-center.justify-content-center(
    v-if="!isFollow",
    @click.stop="follow()"
  )
    span.followout フォローする
  .btn.col.d-flex.flex-column.align-items-center.justify-content-center(
    v-else,
    @click.stop="unfollow()"
  )
    span.followin フォロー中
</template>

<script>
import { mapGetters } from "vuex";
import DMMessageModal from '~/components/ui/dm/DMMessageModal'

export default {
  props: ["user"],
  computed: {
    ...mapGetters({
      currentUser: "currentUser/currentUser",
      currentUserId: "currentUser/uid",
      directSales: "directSales/directSalesList/directSales"
    }),
    isFollow () {
      if (!this.currentUser) return false;
      if (!this.currentUser.following_users)
        this.currentUser.following_users = [];
      return this.currentUser.following_users.indexOf(this.user.id) > -1;
    },
    ownedDirectSales () {
      if (this.directSales && this.directSales.length > 0) {
        return this.directSales.filter(directSale => directSale.ownerId == this.$route.params.id)
      } else {
        return []
      }
    }
  },
  methods: {
    async follow () {
      if (this.$checkAuthenticated()) {
        await this.$store.dispatch("currentUser/follow", this.user);
        this.$store.dispatch("userDetail/addFollower", this.currentUserId);
      }
    },
    async unfollow () {
      if (this.$checkAuthenticated()) {
        await this.$store.dispatch("currentUser/unfollow", this.user);
        this.$store.dispatch("userDetail/removeFollower", this.currentUserId);
      }
    },
    showDMMessageModal () {
      if (this.$checkAuthenticated()) {
        const modalWidth = $(window).width() < 1000 ? `${$(window).width() - 30}px` : '1000px'
        this.$modal.show(
          DMMessageModal, 
          { toUserId: this.$route.params.id }, 
          {
            clickToClose: true,
            width: modalWidth,
            height: 'calc(100vh - 16rem)',
            style: {
              margin: "8rem 0",
            }
          }
        )
      }
    },
  },
  mounted() {
    this.$store.dispatch("directSales/directSalesList/initializeState");
  }
};
</script>

<style lang="scss" scoped>
.pcw-70 {
  width:100%;
}

h4 {
  font-weight: bold;
  font-size: 1.2rem;
}

.icon {
  color: #BE9B69;
  cursor: pointer;
}

.lightGray {
  color: #8e8e8e;
}

.username {
  text-align: center;
}

.usertext {
  text-align: left;
   color: #666666;
}

.userurl {
  color: #007aff;
  font-size: 0.9rem;
  a {
    position: relative;
    top: -0.4rem;
  }
}

.count {
    font-size: 14px;
    border-radius: 20px;
    background: #F1EEF1;
    width: 60px;
    position: relative;
    padding-left: 8px;
    line-height: 12px;
}
.count span {
    position: absolute;
    top: 4px;
    right: 12px;
    font-weight: normal;
}

.follownum {
  display: flex;
  align-items: center;
  color: #666666;
  position: relative;
  margin: 0 0 20px;
}

.padingr {
  padding: 0 8px 0 0;
}

.padingl {
  padding: 0 0 0 32px;
}

.usercountl, .usercountr{
  color:#76C076;
}

.followout {
  border: 1px solid #76c076;
  width: 120px;
  height: 32px;
  line-height: 30px;
  color: #76c076;
  border-radius: 18px;
  font-weight: bold;
  font-size: 10px;
}

.followin {
  background-color: #76c076;
  width: 120px;
  height: 32px;
  line-height: 32px;
  color: white;
  border-radius: 16px;
  font-weight: bold;
  font-size: 10px;
}

@media screen and (min-width: 1024px) {
  .mypage {
    margin-top: 40px;
  }

  .pcw-70 {
    width: 70%;
    margin-left: 32%;
  }

  h4 {
    font-size: 1.5rem;
  }

  .username,
  .usertext {
    text-align: left;
    margin: 0;
  }

  .userurl {
    text-align: left;
    margin: 10px 0 10px;
  }
  .follownum{
    margin: 20px 0 20px;
  }

  .follownum:after{
    position: absolute;
    content: "";
    top: 0;
    left: 18%;
  }

  .followin {
    background-color: #76c076;
    width: 180px;
    height: 42px;
    line-height: 42px;
    color: white;
    border-radius: 20px;
    font-weight: bold;
    font-size: 1rem;
  }

  .followout {
    border: 2px solid #76c076;
    width: 180px;
    height: 42px;
    line-height: 38px;
    color: #76c076;
    border-radius: 20px;
    font-weight: bold;
    font-size: 1rem;
  }
}

@keyframes msgButtonEffect {
  from {
    font-size: 1.5rem;
  }

  50% {
    font-size: 150%;
  }

  to {
    font-size: 1.4rem;
  }
}
</style>

