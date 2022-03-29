
// DOM要素を{ref: xxxxx}の形でパスする。(DOM要素にscroll: overflow, とheightを指定する必要あり)
// actionには一番下までスクロールした時に実行する関数をパスする
  export const scrollBottomAction = function(ref, action){
    ref.ref.addEventListener('scroll', (event) =>{
     // if(event.target.scrollTop + event.target.clientHeight == event.target.scrollHeight) {
      if(event.target.scrollTop + event.target.clientHeight < event.target.scrollHeight + 100) {
        action()
      }
    })
  }

  export const windowBottomAction = function(action){
    window.addEventListener('scroll',() => {
      if(window.scrollY + window.innerHeight > document.body.clientHeight - 1000){
        action()
      }
    })
  }
