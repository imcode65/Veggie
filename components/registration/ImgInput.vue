<template lang="pug">
  div
    span.delete-btn.position-absolute(style="z-index: 50; cursor: pointer")
      i.material-icons(style="color: #ccc; font-size: 1.3rem;" :name="name" @click="$emit('deleteImage', $event)") cancel
    label(:for="guid")
      img.user-icon(v-if="imgBlob" :src="imgBlob")
      ImgFirebaseLoader.user-icon(v-else-if="imgPath && imgPath !== ''" :path="imgPath" objectFit="cover" :modalDisabled="true")
      img.user-icon(v-else src="~assets/noimage.jpg") 
    input.d-none(:id="guid" type="file" :name="name" accept="image/*" @change="$emit('onChangeImage', $event)")
</template>

<script>
export default {
  data() {
    return {
      guid: undefined,
    }
  },
  props: ['imgPath', 'imgBlob', 'name', 'userIcon'],
  computed: {

  },
  methods: {
    async initializeState(){
    }
  },
  created(){
    this.guid = this.$guidGenerator()
  },
  mounted() {
    this.initializeState()
  }
}
</script>

<style lang="scss" scoped>
  .delete-btn{
    position: absolute;
    top:5%;
    right: 5%;
  }
  img{
    width: 25vw;
    height: 25vw;
    max-width: 250px;
    max-height: 170px;
    object-fit: cover;
    border: 0.3px solid rgb(219,219,219);
    border-radius: 10px;
  }
  .user-icon {
    position: relative;
    height: 15vw !important;
    width: 15vw !important;
    label{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        max-width: 250px;
        max-height: 250px;
        border-radius: 20%;
      }
    }
  }
  .photo-gallary{
    position: relative;
    label{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        max-width: 1000px;
        max-height: 1000px;
      }
    }
  }


</style>

