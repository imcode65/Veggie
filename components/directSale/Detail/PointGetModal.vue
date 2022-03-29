<template lang="pug">
  .wrapper.m-auto
    .title ポイントを取得しました！
    .text-muted.point-title.mt-3 獲得ポイント
    .point +{{response.point}} pt
    .total.text-muted 合計 {{response.total}} pt
    .pin-wrapper(v-if="showAnimation" ref="pin")
      .user-pin
      ImgFirebaseLoader.user-icon(
          v-if="currentUser !== ''",
          :path="currentUser.imageStoragePath",
          objectFit="cover",
          :modalDisabled="true"
        )
    .imgWrapper(v-if="imagePath")
      ImgFirebaseLoader(
        :path="imagePath",
        objectFit="cover",
        :modalDisabled="true"
      )
    .name.mt-4.mb-2 {{caption}}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      imagePath: ''
    }
  },
  // props: ['response', 'directSale', 'pointType'],
  props: ['response', 'imagePath', 'caption', 'showAnimation'],
  methods:{
    initialAnimation(){
      const duration = 1
      this.$gsap.from(this.$refs.pin, duration / 4, {y:-250, ease: 'power2.easeOut', delay: duration / 2});
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/currentUser',
    })
  },
  mounted(){
    this.initialAnimation()
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 15px;
    border-radius: 50px;
    background-color: beige;
    .title{
      font-weight: 500;
    }
    .point-title{
      font-weight: 500;
    }
    .point{
      font-size: 40px;
      font-weight: 800;
      color: #be9b69;
    }
    .pin-wrapper{
      position: relative;
      .user-pin{
        transform: perspective(50px) rotateX(20deg) rotateZ(-45deg);
        // transform: rotateX(45deg);
        transform-origin: 50% 50%;
        border-radius: 50% 50% 50% 0;
        padding: 0 3px 3px 0;
        width: 50px;
        height: 50px;
        background: rgba(228, 143, 107, 1);
        position: relative;
      }
      .user-icon{
        position: absolute;
        left: 50%;
        top: 58%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);

      }
    }
    .imgWrapper {
      width: 90%;
      // height: 50%;
      height: 200px;
      margin-top: 40px;
      border-radius: 20px;
      overflow: hidden;
    }
    .name {
      font-size: 20px;
      font-weight: 500;
    }
    .review-btn-wrapper{
      width: 100%;
      text-align: center;
      .review-btn{
        width: 80%;
        max-width: 2000px;
        text-align: center;
        color: white;
        border: 2px rgba(228, 143, 107, 1) solid;
        background: rgba(228, 143, 107, 1);
        border-radius: 25px;
        &.checkined{
          color: white;
        }
      }
      @media screen and (min-width:800px) { 
        .checkin-btn{
          width: 50%;
        }
      }
    }
  }
</style>