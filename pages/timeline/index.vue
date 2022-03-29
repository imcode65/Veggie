<template lang="pug">
.bkcolor
  Loading(ref="loading")
  SwitchBtn(
    icon="",
    right="5%",
    bottom="15%",
    :style="btnStyle",
    @btnClicked="showPostModal"
  )
  WindowScrollLoadList(
    v-if="currentUser && timelines.length != 0",
    :items="timelines",
    :numOfItemsPerLoad="10"
  )
    template(#list="list")
      TimelineListItem(
        v-for="(timeline, id) in list.itemsToShow",
        :key="id"
        :timeline="timeline"
      )
  div(v-else)
    TimelineListItem(
      v-for="idx of 10",
      :key="idx"
      :timeline="timelines[idx - 1]"
    )
    .signInWrapper(v-if="scrollLoadListScrollTop > 1000")
      SignIn(:isHideClear="true")
</template>

<script>
import { mapGetters } from "vuex";
import TimelinePostForm from "~/components/timeline/TimelinePostForm";

export default {
  data() {
    return {
      scrollLoadListScrollTop: 0,
      btnStyle: {
        // 背景変更用スタイル
        background: `url('${require("@/assets/post_timeline.png")}')`, // 背景読み込み前なので空白
        backgroundSize: "3.5rem",
        backgroundPosition: "50% 50%",
      },
    };
  },
  head() {
    return {
      title: "timeline",
    };
  },
  computed: {
    ...mapGetters({
      timelines: "timeline/timelines",
      currentUser: "currentUser/currentUser",
      userList: "userList/userList",
    }),
  },
  methods: {
    async initializeState() {
      const loading = this.$refs.loading;
      loading.startLoading();
      window.addEventListener("scroll", this.onScroll);
      if(this.userList.length === 0) await this.$store.dispatch("userList/initializeState");
      if(this.timelines.length === 0) { 
        await this.$store.dispatch("timeline/initializeState");
      }
      loading.finishLoading()
    },
    showPostModal() {
      if (this.$checkAuthenticated()) {
        const modalWidth =
          $(window).width() < 1000 ? `${$(window).width() - 50}px` : "1100px";
        this.$modal.show(
          TimelinePostForm,
          {},
          {
            clickToClose: true,
            width: modalWidth,
            height: "auto",
            style: {
              top: 0,
            },
            scrollable: true,
          }
        );
      }
    },
    onScroll() {
      // console.log(this.scrollLoadListScrollTop);
      this.scrollLoadListScrollTop = window.scrollY;
    },
  },
  layout: "index",
  mounted() {
    this.initializeState();
  },
  beforeRouteLeave(to, from, next) {
    this.$modal.hideAll();
    next();
  },
};
</script>

<style lang="scss" scoped>
.btn.switch-btn.rounded-pill {
  width: 50px;
  height: 50px;
  background-color: #e48f6b;
}
.rounded-pill .switch-icon {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.signInWrapper {
  margin-top: 20vh;
  height: 40vh;
}
.bkcolor {
  background-color: rgba(190, 155, 105, 0.1);
}
@media screen and (min-width: 1024px) {
  .btn.switch-btn.rounded-pill {
    display: none;
  }
}
</style>

