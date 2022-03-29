import { API_KEY, GOOGLE_ANALYTICS_ID } from './constants/'
import firebase from './plugins/firebase'
const db = firebase.firestore()

require('dotenv').config()

export default {
  env: {
    VEGGIE_MODE: process.env.VEGGIE_MODE,
    ADMIN_ID: process.env.ADMIN_ID,
    STRIPE_PK: process.env.STRIPE_PK,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'チョクバイGO！Veggie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '近くの直売所のどこがおすすめかな？栽培法で困ったので相談できないかな？ポイントを貯めながら楽しく、みんなで直売情報共有♪見えべジ機能で今の在庫を確認！Lets’チョクバイGO！' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'チョクバイGO！Veggie' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'Veggieベジー｜農業SNS｜ネット×リアル' },
      { hid: 'og:description', property: 'og:description', content: '近くの直売所のどこがおすすめかな？栽培法で困ったので相談できないかな？ポイントを貯めながら楽しく、みんなで直売情報共有♪見えべジ機能で今の在庫を確認！Lets’チョクバイGO！' },
      { name: "google-site-verification", content: "UDBx5NvQOzzJ-JBcKIOy5cL0ueYB6F2l9C-R9ezPKRE"},
      { hid: 'keywords', name: 'keywords', content: "veggie, ベジー, 直売所, 一次産業, 農業, SNS"},
    ],
    bodyAttrs:{
      class: 'body-class'
    },
    script: [
      { src: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&region=JP&language=ja&libraries=&v=weekly` },
      { src: `https://code.jquery.com/jquery-3.5.1.slim.min.js` },
      { src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/jquery-timepicker/1.13.16/jquery.timepicker.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js" },
      { src: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js" },
      { src: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js" },
      { src: "https://cdn.plyr.io/3.6.2/plyr.js" },
      // { src: 'https://js.stripe.com/v3' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css', crossorigin: 'anonymous', integrity:'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'},
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-timepicker/1.13.16/jquery.timepicker.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css'},
      { rel: 'stylesheet', href: 'https://cdn.plyr.io/3.6.2/plyr.css'},
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/commonStyle.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vue-js-modal', ssr: false },
    { src: '~/plugins/global/auth', ssr: false },
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/link-prevue', ssr: false },
    { src: '~/plugins/library/distance', ssr: false },
    { src: '~/plugins/library/businessHour', ssr: false },
    { src: '~/plugins/library/scrollBottomAction', ssr: false },
    { src: '~/plugins/global/guid', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-gsap-module',
    '@nuxtjs/google-analytics',
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-adsense', 
      {
        id: 'ca-pub-4940560442104613',
        pageLevelAds: true,
        analyticsUacct: GOOGLE_ANALYTICS_ID,
        analyticsDomainName: 'veggie.co.jp'
      }
    ],
    [
      'nuxt-stripe-module', 
      {
        publishableKey: 'pk_test_51JN9d0D7c3VXLUtn28g1VnwLzjEGED6mJ2KA5s22YgEr5cs3cCXbi4gi3xxKv0IyqI3NpuK7KBjCQcnxVWB4X4Jr004qxbKW86',
      }
    ],
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    analyze: process.env.VEGGIE_MODE === "development",
    babel: {
      compact: true,
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  },

  googleAnalytics: {
    id: GOOGLE_ANALYTICS_ID
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: GOOGLE_ANALYTICS_ID
    }
  },

  router: {
    extendRoutes (routes, resolve){
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue')
      })
    }
  },

  fireStore: {
    settings: {
      host: 'localhost:5000',
      ssl: false
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://veggie.co.jp',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: [
      '/notifications',
      '/mypage',
      '/mypage/**',
    ],
    routes: async () => {
      const { docs } = await db.collection('directSales').get()
      return docs.map(doc => {
        return `/directSales/${doc.id}`
      })
    },
  }, 
  
  axios: {
    proxy: true,
    prefix: '/api',
  },

  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'my-server.key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'my-server.crt.pem'))
  //   }
  // },
  // serverMiddleware: ['redirect-ssl']
  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
    {
      path: "/api",
      handler: (req, res, next) => {
        const url = require("url");
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      }
    },
    { path: "/api", handler: "~/serverMiddleware/api-server.js" }
  ],
}
