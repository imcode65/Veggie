<template lang="pug">
  .wrapper(ref='wrapper')
    slot(name="list" :itemsToShow="itemsToShow") 
</template>

<script>
import {windowBottomAction} from '~/plugins/library/scrollBottomAction'

export default {
  data(){　
    return{
      itemsToShow: [],
    }
  },
  props: ['items', 'numOfItemsPerLoad'],
  watch: {
    // itemsが変わった時にitemsToShowをリセットしないと
    // 古いデータが表示されてしまう
    items:function(){
      this.itemsToShow = []
      this.addItemsToShow()
    }
  },
  methods: {
    async initializeState(){
      this.itemsToShow = []
      //取得した直売所などを一気に表示すると、画像等のせいで通信量が
      //多くなるため、スクロールに応じて直売所データをロードする
      this.addItemsToShow()
      //最初ロードされた際、listの高さは0
      //以下はその対策
      while(this.itemsToShow.length < 21 && this.items.length !== this.itemsToShow.length){
        this.addItemsToShow()
      }
      windowBottomAction(this.addItemsToShow)
    },
    //表示する直売所などをロードする
    addItemsToShow(){
      const numOfItemsLoadedAlready = this.itemsToShow.length
      this.items.forEach((item, index)=> {
        if(numOfItemsLoadedAlready <= index && index < numOfItemsLoadedAlready + this.numOfItemsPerLoad){
          this.itemsToShow.push(item)
        }
      });
    },
  },
  mounted(){
    this.initializeState()
  }
}
</script>


<style lang="scss" scoped>
</style>
