<template lang="pug">
    .userWrapper(@click="moveToDetail") 
      UserIntro(v-if="user" :user="user")  
</template>

<script>
export default {
  props: ['user'],
  methods: {
    moveToDetail(){
      this.$router.push(`/users/${this.user.id}`)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  $veggieColor: #BE9B69;
  .userWrapper{
    width: 100%;
    max-width: 350px;
    margin: 30px auto 0;
    border-radius: 1.0rem;
    // overflow: hidden;
    .imgWrapper{
      width: 40vw;
      height: 40vw;
      max-width: 250px;
      max-height: 250px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  @media screen and (min-width:1024px) { 
    .userWrapper{
      width: 30%;
      .imgWrapper{
        width: 22vw;
        height: 22vw;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>

