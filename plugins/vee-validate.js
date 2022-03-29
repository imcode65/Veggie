import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import { required, numeric, max, min } from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';

// 必要なルールのみインポート
extend('required', {
  ...required,
  message: '必須項目です'
});
extend('numeric', {
  ...numeric,
  message: '数字のみで入力してください'
});
extend('max', {
  ...max,
  message: '文字数が超過しました'
});
extend('min', {
  ...min,
  message: '文字数が足りません'
});

// メッセージを設定
localize('ja', ja);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);