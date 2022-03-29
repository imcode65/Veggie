<template lang="pug">
  .posts-wrapper
    h6.pl-3.pr-3.title {{title}}
    .pl-3.pr-3.pt-2.pb-2.whitebg.border-bottom.text-center.position-relative(v-if="postAllowed" @click.prevent="showPostModal()") 新規投稿する
      i.material-icons.icon.position-absolute(style="top: 10px;" v-if="postAllowed") mode_edit
    WindowScrollLoadList(v-if="posts.length!=0" :items="posts" numOfItemsPerLoad=10)
      template(#list="list")
        //- DetailPostItemTemplate.pl-3.pr-3.whitebg.border-bottom(v-for="post in list.itemsToShow" :post="post" :postAllowed="postAllowed" @showPostModal="$emit('showPostModal', post)") {{post}}
        DetailPostItemTemplate.pl-3.pr-3.whitebg.border-bottom(v-for="(post, id) in list.itemsToShow" :key="id" :post="post" :user="userList.find(user => user.id == post.userId)" :postAllowed="postAllowed" @showPostModal="showPostModal") {{post}}
          template(#post-header="header")
            TimelineUserProfile(v-if="post && header.user" :userId="post.userId" :name="header.user.name" :imageStoragePath="header.user.imageStoragePath" :createdAt="post.createdAt")
            //- div {{ header.post.content }}
            //- div {{ post-header.post }}
</template>

<script>
import {mapGetters} from 'vuex'
import { getDateTimeFromTimeStamp } from '~/plugins/library/timestampConverter'

export default {
  data(){
    return{
    }
  },
  props: ['directSale', 'title', 'posts', 'postAllowed', 'userList'],
  computed: {
    ...mapGetters({
    }),
  },
  methods:{
    async initializeState(){
      // await this.$store.dispatch('posts/directSalePosts/getPostsByDirectSaleId', this.$route.params.id)
    },
    showPostModal(post){
      this.$emit('showPostModal', post)
    },
    getTime(timestamp){
      if(timestamp !== null) return getDateTimeFromTimeStamp(timestamp)
    },
    prepareToExit(){
      this.$store.commit('posts/directSalePosts/RESET_STATE_DIRECTSALEPOSTS')
    }
  },
  mounted() {
    this.initializeState()
  },
}
</script>

<style lang="scss" scoped>
  .posts-wrapper{
    color: rgba(0, 0, 0, 0.54);
    .whitebg{
      background-color: white;
    }
    .title{
      font-weight: 400;
      padding: 5px 20px;
      color: #BE9B69;
      background: rgba(190, 155, 105, 0.2);
    }
  }

</style>
