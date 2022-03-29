<template lang="pug">
  .btn.sidebar-menu(@click="$emit('action')") {{displayText}}
    slot(name="child")
</template>

<script>
export default {
  props: ["displayText"],
};
</script>

<style lang="scss" scoped>
.sidebar-menu {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 10px 0;
  border-bottom: 1px solid #ffffff;
  white-space: nowrap;
  text-indent: 5px;
  text-align: left;
}
</style>
