<template lang="pug">
  .btn.footer-menu(@click="$emit('action')") {{displayText}}
</template>

<script>
export default {
  props: ['displayText']
}
</script>

<style lang="scss" scoped>
  .footer-menu{
    font-size: 0.9rem;
    font-weight: 500;
    padding: 20px 0;
    text-indent: 5px;
  }
</style>