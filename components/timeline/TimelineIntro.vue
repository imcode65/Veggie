<template lang="pug">
.mypage.w-100(v-if="timeline")
  TimelineContent(:timeline="timeline")
  footer.row
    .col-6.float-left
      .row
        TimelineLikeBtn.icon.heart(:timeline="timeline")
        TimelineCommentBtn.icon.comment(:timeline="timeline")
        button.btn.col.d-flex.flex-column.align-items-center.justify-content-center(
          v-if="false",
          @click="click('シェア')"
        )
          i.material-icons.icon.sharelink share
    .col-3
    .col-3.float-right
      .row
        button.btn.col.d-flex.flex-column.align-items-center.justify-content-center(
          v-if="timeline.userId === uid",
          @click="showPostModal()"
        )
          i.material-icons.icon.pen mode_edit
</template>

<script>
import TimelinePostForm from "~/components/timeline/TimelinePostForm";
import { mapGetters } from "vuex";

export default {
  data(){
    return{
      slickPaths: [],
    }
  },
  computed: {
    ...mapGetters({
      uid: "currentUser/uid",
    }),
  },
  props: ["timeline"],
  methods: {
    click(message) {
      // console.log(message);
    },
    initialize(){
      if(this.timeline?.imageStoragePaths[0]) 
       this.slickPaths.push(this.timeline?.imageStoragePaths[0])
      if(this.timeline?.imageStoragePaths[1]) 
       this.slickPaths.push(this.timeline?.imageStoragePaths[1])
      if(this.timeline?.imageStoragePaths[2]) 
       this.slickPaths.push(this.timeline?.imageStoragePaths[2])
    },
    showPostModal() {
      if (this.$checkAuthenticated()) {
        this.$modal.show(
          TimelinePostForm,
          { postProp: this.timeline },
          {
            clickToClose: true,
            width: $(window).width()/2 - 50,
            height: "auto",
            scrollable: true,
          }
        );
      }
    },
    autoLink(text) {
      return text
        ? text.replace(
            /(https?:\/\/[^\s\/]*)(\/[^\s]{1,12})?([^\s]*)/g,
            "<a href='$1$2$3' target='_blank' rel='noopener noreferrer'>$1$2...</a>"
          )
        : "";
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
    this.initialize()
  }
};
</script>

<style lang="scss" scoped>
.timeline-image > img {
  width: 100%;
  height: 200px;
}

.heart {
  color: #e48f82;
}

.comment,
.sharelink {
  color: #be9b69;
}

.pen {
  color: grey;
}

.no-decoration {
  text-decoration: none;
}
</style>

