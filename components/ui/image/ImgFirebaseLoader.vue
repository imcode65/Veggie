<template lang="pug">
  img.d-inline(:id="guid" :ref="guid" src="~assets/noimage-vertical.jpg" style="`object-fit: ${objectFit}`; height: auto; border-radios: 12px" :alt="'Logo'")
</template>

<script>
import firebase from '~/plugins/firebase'
import imageModal from '~/components/ui/image/imageModal.vue'
import { getImageOriginalPath } from '~/plugins/library/imageThumbnail'

export default {
  data() {
    return {
      guid: '',
      url: '',
    }
  },
  props: ['path','width','height','objectFit','modalDisabled', 'showNoImage', 'noImagePath'],
  methods: {
    setImage() {
      if (this.path === "") {
        return;
      }
      var storage = firebase.storage()
      var storageRef = storage.ref(this.path)
      storageRef.getDownloadURL()
      .then((url) => {
        var xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = (event) => {
          var blob = xhr.response;
        };
        xhr.open('GET', url)
        this.$refs[this.guid].setAttribute('src', url)
        this.url = url
      })
      .catch((error) => {
        // this.$refs[this.guid].setAttribute('src', "~assets/noimage.jpg")
        // this.url = "~assets/noimage.jpg"
        
        // console.log(error)
      });
    },
    showImageModal() {
      if(this.modalDisabled) return

      this.$modal.show(
        imageModal, 
        { 
          url: getImageOriginalPath(this.url) 
        }, 
        {
          clickToClose: true,
          width: $(window).width() - 50,
          height: $(window).height() - 150,
        }
      )
      setTimeout(() => {
        document.getElementsByClassName('vm--modal')[0].style.zIndex = 'scroll'
      }, 100)
    }
  },
  created() {
   if(process.browser) this.guid = this.$guidGenerator()
  },
  mounted() {
    if(this.noImagePath) this.$refs[this.guid].setAttribute('src', this.noImagePath)
    if(this.showNoImage === false) this.$refs[this.guid].setAttribute('src', '')
    this.setImage()
    if(this.width) this.$refs[this.guid].style.width = this.width
    if(this.height) this.$refs[this.guid].style.height = this.height
    if(this.objectFit) this.$refs[this.guid].style.objectFit = this.objectFit
  },
  watch: {
    path: function (path) {
      if(path) {
        this.setImage()
      } else {
        this.$refs[this.guid].setAttribute('src', "~assets/noimage.jpg")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-bk {
  width: 100%;
  height: 250px !important;
  object-fit: cover;
}
.user-icon {
  border-radius: 50%;
  flex-shrink: 0;
  flex-grow: 0;
}
.sm-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.mypage-icon {
  height: 80px !important;
  width: 80px !important;
  border-radius: 50%;
  position: absolute;
  left: 16px;
  bottom: -40px;
}
img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>

