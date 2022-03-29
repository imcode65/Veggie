<template lang="pug">
  #listWrapper.pb-4(ref='listWrapper')
    slot(name="list" :itemsToShow="itemsToShow") 
</template>

<script>
import {scrollBottomAction} from '~/plugins/library/scrollBottomAction'

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

      //listの高さがwrapperより大きくないと
      //scrollBottomActionが動かない
      //wrapperがoverflowするまで、アイテムを追加する
      const wrapper = this.$refs.listWrapper
      const list = this.$refs.listWrapper.children[0]
      //最初ロードされた際、listの高さは0
      //以下はその対策
      var observer = new MutationObserver(() => {
        if(wrapper && list)
          while(list.clientHeight < wrapper.clientHeight && this.items.length !== this.itemsToShow.length){
            this.addItemsToShow()
          }
      })
      observer.observe(wrapper, {attributes: true, childList: true, subtree: true ,attributeFilter: ['style']})

      const listWrapper = this.$refs.listWrapper
      listWrapper.addEventListener('scroll', (e) => {
        this.$emit('scroll', e)
      })
      scrollBottomAction({ref: listWrapper}, this.addItemsToShow)
    },
    //表示する直売所などをロードする
    addItemsToShow(){
      const numOfItemsLoadedAlready = this.itemsToShow.length
      this.items.forEach((item, index)=> {
        if(numOfItemsLoadedAlready <= index && index < numOfItemsLoadedAlready + this.numOfItemsPerLoad){
          this.itemsToShow.push(item)
        }
      });
    }
  },
  mounted(){
    this.initializeState()

  }
  
}
</script>


<style lang="scss" scoped>
  #listWrapper {
    // overflow: scroll;
    height: 100%;
  }
  #listWrapper::-webkit-scrollbar {
    display:none;
  }
</style>
