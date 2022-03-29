<template lang="pug">
  .wrapper
    img(src="~assets/directSale.jpeg")
    label {{ title }}
</template>

<script>
export default {
  props:['title'],
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 10px auto;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  border-left: 5px solid #E48F6B;
  img {
    width: 3rem;
    margin-right: 1rem;
  }
  label {
    font-family: Hiragino Sans;
    font-weight: 800;
    font-size: 1.8rem;
    line-height: 1.5rem;
    color: #212529;
    margin-bottom: 0;
  }
}
</style>

