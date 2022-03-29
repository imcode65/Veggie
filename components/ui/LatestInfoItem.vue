<template lang="pug">
  .itemWrapper.m-auto.pt-2.pb-2(style="position: relative") 
    div(v-if="isOwner" style='position: absolute; top: 10px; right: 20px;')
      i.material-icons.icon(@click="showPostModal") mode_edit
    div(v-if="isOwner" style='position: absolute; top: 50px; right: 20px;')
      i.material-icons.icon(@click="showDeleteConfirmationModal") delete
    div(v-if="directSaleName") {{directSaleName}}
    div(v-if="post" :ref="guid" :id="guid")
    .pt-2.pb-2 {{post.description}}
    .d-block(style="overflow: scroll; white-space: nowrap;")
    ImgListWrapper
      template(#image)
        ImgFirebaseLoader(v-for="(path, id) in post.imageStoragePaths" :key="id" v-if="path !==''" :path="path" objectFit="cover")
    modal(name="confirmationModal" width="300" height="auto")
      ConfirmationModal(message='投稿を破棄してもよろしいですか?' btnRight='破棄', btnLeft='キャンセル' @leftButtonClicked="closeConfirmationModal" @rightButtonClicked="deletePost")

</template>

<script>
import DirectSalePostForm from '~/components/directSale/DirectSalePostForm'

export default {
  data() {
    return {
      guid: ''
    }
  },
  props: ['post', 'isOwner', 'directSaleName'],
  computed: {

  },
  methods: {
    async initialize(){
      this.$refs[this.guid].innerHTML = this.timePosted(this.post.createdAt)
    },
    timePosted(timestamp){
      var date = new Date(timestamp.seconds * 1000);
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var formattedTime = year + '年' + month + '月' + day + '日' + hours + ':' + minutes.substr(-2)

      return formattedTime
    },
    showPostModal(){
      if (this.$checkAuthenticated()) {
        this.$modal.show(DirectSalePostForm, {postProp: this.post}, {
          clickToClose: true,
          width: $(window).width() - 50,
          height: 'auto',
          scrollable: true
        })
      }
    },
    showDeleteConfirmationModal(){
      if (this.$checkAuthenticated()) {
        this.$modal.show('confirmationModal')
      }
    },
    closeConfirmationModal(){
      this.$modal.hide('confirmationModal')
    },
    async deletePost(){
      // console.log('deleting post')
      try{
        await this.$store.dispatch('posts/directSalePostForm/deletePost', this.post)
      }
      catch(e){
        alert('画像をアップロードできませんでした。5M以下の画像でお試しください')
      }
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
  img{
    width: calc(33vw + 20px);
    height: calc(33vw + 20px);
    max-width: 300px;
    max-height: 300px;
    padding: 0 0.1rem;
  }
}
</style>

