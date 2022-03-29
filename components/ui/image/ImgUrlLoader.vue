<template lang="pug">
.imgLoader.position-relative(:id="guid" :ref="guid" style="")
  img.d-inline(:ref="guid2" src="~assets/noimage.jpg" :style="imgStyle ? imgStyle : 'height: auto; width: 100%; border-radius: 12px'")
  span.position-absolute.text-white(v-if="label" :style="labelStyle ? labelStyle : 'right: 50px; bottom: 0'") {{ label }}
</template>

<script>

export default {
  data() {
    return {
      guid: undefined,
      guid2: undefined
    }
  },
  props: ['path','width','height','imgStyle', 'label','labelStyle','objectFit'],
  methods: {
    setImage(){
      if(this.width) this.$refs[this.guid].style.width = this.width
      if(this.height) this.$refs[this.guid].style.height = this.height
      this.$refs[this.guid2].style.objectFit = this.objectFit ? this.objectFit : 'contain'
      if(this.path) this.$refs[this.guid2].src = this.path
    },
  },
  created(){
    this.guid = this.$guidGenerator()
    this.guid2 = this.$guidGenerator()
  },
  mounted() {
    this.setImage()    
  }
}
</script>

<style lang="scss" scoped>

</style>
