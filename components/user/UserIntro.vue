<template lang="pug">
.p-2.wrapper
  nuxt-link.link(:to="'/users/'+user.id")
    .icon
      ImgFirebaseLoader.user-icon(
        :path="user.imageStoragePath",
        objectFit="cover",
        :modalDisabled="true"
      )
    .description
      .header-line {{ nameToDisplay }}
  .follow-btn
    .btn.col.d-flex.flex-column.align-items-center.justify-content-center(
      v-if="!isFollow",
      @click.stop="follow()"
    )
      .followout フォロー
    .btn.col.d-flex.flex-column.align-items-center.justify-content-center(
      v-else,
      @click.stop="unfollow()"
    )
      span.followin フォロー中
  p.mt-2(style="margin-left: 8px;" v-if="introToDisplay && introToDisplay.length > 0") {{ introToDisplay }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      introToDisplay: '',
      nameToDisplay: '',
    }
  },
  props: ["user"],
  computed: {
    ...mapGetters({
      currentUser: "currentUser/currentUser",
    }),
    isFollow() {
      if (!this.currentUser) return false;
      if (!this.currentUser.following_users)
        this.currentUser.following_users = [];
      return this.currentUser.following_users.indexOf(this.user.id) > -1;
    },
  },
  methods: {
    initializeState() {
      this.nameToDisplay = this.user.name
      if (this.user.name === undefined) return
      const nameLength = this.user.name.length
      if(nameLength && nameLength > 20){
        this.nameToDisplay = this.user.name.substr(0,9) + '...'
      }

      this.introToDisplay = this.user.introduction
      if (this.user.introduction === undefined) return
      const introLength = this.user.introduction.length
      if(introLength && introLength > 30){
        this.introToDisplay = this.user.introduction.substr(0, 29) + '...'
      }
    },
    async follow(e) {
      // console.log('follow');
      if (this.$checkAuthenticated()) {
        await this.$store.dispatch("currentUser/follow", this.user);
      }
    },
    async unfollow() {
      // console.log('unfollow');
      if (this.$checkAuthenticated()) {
        await this.$store.dispatch("currentUser/unfollow", this.user);
      }
    },
  },
  mounted() {
    // console.log('UserIntro');
    this.initializeState()
  },
};
</script>

<style lang="scss" scoped>
.user-icon {
  width: 53px !important;
  height: 53px !important;
}
.wrapper{
  position: relative;
 
  p {
    font-size: 14px;
  }

  .link{
    color: #212529;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: visible;
    .icon{
      width: 20%;
    }
    .description{
      width: 50%;
      margin-left: 10px;
      .header-line {
        font-size: 14px;
      }
    }
  }
  
  .follow-btn{
    position: absolute;
    right: 10px;
    top: 13px;
    .btn{
      padding: 0;
      // width: 25%;
      .followout {
        border: 1px solid #76c076;
        width: 70px;
        height: 28px;
        line-height: 28px;
        color: #76c076;
        border-radius: 18px;
        font-weight: bold;
        font-size: 10px;
      }
  
      .followin {
        background-color: #76c076;
        width: 70px;
        height: 28px;
        line-height: 28px;
        color: white;
        border-radius: 16px;
        font-weight: bold;
        font-size: 10px;
      }
    }
  }
  
  .link:hover {
    text-decoration: none;
  }
  
  .font12 {
    font-size: 0.8rem;
  }
}

@media screen and (min-width: 1024px) {
  .wrapper{
    .link{
      .icon{
        width: 20%;
      }
      .description{
        width: 45%;
        .header-line {
          font-size: 14px;
        }
      }
    }
  }
}
</style>

