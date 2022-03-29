<template lang="pug">
  .itemWrapper.m-auto.pt-2.pb-2(style="position: relative") 
    div(v-if="editAllowed" style='position: absolute; top: 10px; right: 20px;')
      i.material-icons.icon(@click="showPostModal") mode_edit
    div(v-if="editAllowed" style='position: absolute; top: 50px; right: 20px;')
      i.material-icons.icon(@click="showDeleteConfirmationModal") delete
    slot(name="post-header" :post="post" :user="user") 
      div {{ getTime(post.createdAt) }}
    .pt-2.pb-2.content {{post.content}}
    .d-block(style="overflow: auto; white-space: nowrap;")
    ImgListWrapper
      template(#image)
        ImgFirebaseLoader(v-for="(path, id) in post.imageStoragePaths" v-if="path !==''" :path="path" objectFit="cover" :key="id")
</template>

<script>
import { mapGetters } from 'vuex'
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'
import ConfirmationModal from '../../ui/ConfirmationModal.vue'

export default {
  data() {
    return {
      guid: '',
      editAllowed: false,
    }
  },
  props: ['post', 'isOwner', 'directSaleName', 'review', 'user'],
  computed: {
    ...mapGetters({
      currentUserUid: 'currentUser/uid',
    }),
  },
  methods: {
    async initialize(){
      if(this.post.userId === this.currentUserUid) this.editAllowed = true
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp)
    },
    showPostModal(){
      this.$emit('showPostModal', this.post)
    },
    showDeleteConfirmationModal(){
      if (this.$checkAuthenticated()) {
        const modalWidth = $(window).width() < 1000 ? $(window).width() - 80 : '1000px'
        this.$modal.show(ConfirmationModal, 
        {
          btnLeft: 'キャンセル',
          btnRight: '破棄', 
          rightClickMethod: this.deletePost,
          message: '投稿を破棄してよろしいですか？', 
          post: this.post
        }, 
        {
          clickToClose: true,
          width: modalWidth,
          height: 'auto',
          scrollable: true
        })
      }
    },
    async deletePost(){
      this.$store.dispatch('posts/directSaleReviewPostForm/deletePost', this.post)
      .then(() => {
          location.reload()
      })
    },
  },
  created() {
    this.guid = this.$guidGenerator()
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
.itemWrapper{
  max-height: 500px;
  overflow: auto;
  text-decoration: none;
  img{
    width: calc(33vw + 20px);
    height: calc(33vw + 20px);
    max-width: 300px;
    max-height: 300px;
    padding: 0 0.1rem;
  }
  .content{
    word-wrap: break-word;
    width: 90%;
  }
}
</style>

