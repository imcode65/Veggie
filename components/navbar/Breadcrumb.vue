<template lang="pug">
.breadcrumb
  .content.ml-auto.mr-auto
    .d-flex.justify-content-start.ml-4
      //- nuxt-link.menu(
      //-   v-for="b in breadcrumb"
      //-   :to="b.link"
      //- ) {{b.text}}
      .menu(
        v-for="(b, id) in breadcrumb"
        :key="id"
      ) 
        nuxt-link(v-if="id !== breadcrumb.length - 1" 
                  :to="b.link"
                  ) {{b.text}}
        span(v-else) {{b.text}}
        
</template>

<script>
import {BreadcrumbLink, BreadcrumbText} from '~/constants/'
import { mapGetters } from "vuex";

export default {
  data(){
    return {
      breadcrumb: [],
      id: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters({
      directSale: 'directSales/directSaleDetail/directSale',
      user: 'userDetail/user'
    })
  },
  watch:{
    directSale: {
      handler(newDirectSale, oldDirectSale){
        if(oldDirectSale?.name !== newDirectSale?.name){
          this.breadcrumb.push({
            text: newDirectSale?.name || "未設定",
            link: `/directSales/${this.id}`
          })
        }
      }
    },
    // user: {
    //   handler(newUser){
        // this.breadcrumb.length = 0
        // let menus = this.$router.name.split("-")
        // if(this.$router.name !== 'index') menus.splice(0, 0, 'index')
        // menus.forEach(menu => {
        //   const text = BreadcrumbText[menu]
        //   const link = BreadcrumbLink[menu]
        //   if(text && link != undefined){
        //     this.breadcrumb.push({
        //       text: BreadcrumbText[menu],
        //       link: BreadcrumbLink[menu]
        //     })
        //   }
        // })
    //     this.breadcrumb.push({
    //       text: newUser.name,
    //       link: `/users/${this.id}`
    //     })
    //   }
    // },
    $route: {
      immediate: true,
      handler(newRoute, oldRoute){
        this.breadcrumb.length = 0
        let menus = newRoute.name.split("-")
        if(newRoute.name !== 'index') menus.splice(0, 0, 'index')
        menus.forEach(menu => {
          const text = BreadcrumbText[menu]
          const link = BreadcrumbLink[menu]
          if(text && link != undefined){
            this.breadcrumb.push({
              text: BreadcrumbText[menu],
              link: BreadcrumbLink[menu]
            })
          }
        })
      }
    },
  },
  mounted(){
    // console.log(this.$route.name);
    // if(this.$route.name === "directSales-id"){
    //   this.breadcrumb.push(this.directSale.name)
    // }
  }
}
</script>
<style lang="scss" scoped>
  .breadcrumb{
    width: 100%;
    // color: #232426;
    // margin: 70px auto 0;  
    margin: 0 auto;
    padding: 5px 0;
    font-size: 0.7rem;
    background: rgba(228, 143, 107, 0.2);
    .content{
      max-width: 1200px;
      .menu > a{
        // color: #232426;
        color: #BE9B69;
      }
      .menu:first-child > a{
        color: #BE9B69;
      }
      .menu:not(:last-child)::after{
        content: ">";
        color: #232426;
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
</style>

