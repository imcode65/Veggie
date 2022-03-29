<template lang="pug">
    .d-flex.justify-content-around.pt-3
      .image-upload
        ImgInput(:imgPath="image.path" :imgBlob="image.blob" name="IMAGE" @onChangeImage="$emit('onChangeImage', $event)" @deleteImage="$emit('deleteImage', $event)")
      .image-upload
        ImgInput(:imgPath="image2.path" :imgBlob="image2.blob" name="IMAGE_2" @onChangeImage="$emit('onChangeImage', $event)" @deleteImage="$emit('deleteImage', $event)")
      .image-upload
        ImgInput(:imgPath="image3.path" :imgBlob="image3.blob" name="IMAGE_3" @onChangeImage="$emit('onChangeImage', $event)" @deleteImage="$emit('deleteImage', $event)")
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props: ['post', 'image', 'image2', 'image3'],

}
</script>

<style lang="scss" scoped>
.image-upload{
  position: relative;
  .image-upload:before{
    content: "";
    float: left;
    padding-top: 70%; 
  }
  .image-upload{
    width: 32%;
    margin: 0 1%;
    img{
      object-fit: cover;
    }
  }
}
</style>