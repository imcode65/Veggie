<template lang="pug">
  div
    .font-weight-bold.mypageTit {{ title }}
    .form-group.labelsize.bg-fa(v-if="!this.$slots.description")
      slot(name="input")
      slot(name="map")
    .m-auto.pb-4.font14(v-else style="width: 90%; color: rgba(0, 0, 0, 0.54);")
      slot(name="description")
</template>

<script>
export default {
  props: ['title'],
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.mypageTit {
    color: #BE9B69;
    padding: 2% 2% 2% 5%;
    background: white;
}

.labelsize{
font-size:1rem;
}

.bg-fa{
    background-color: #fafafa;
}

.form-group{

padding-bottom: 16px;
}

.form-control{
  margin-bottom:1rem;
  }
  
   .font14{
  font-size:14px;
  }
  
</style>