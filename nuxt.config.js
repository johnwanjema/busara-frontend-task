
export default {
  // mode:'universal', 
  ssr: false,   
  /*
  ** Headers of the page
  */
  head: {
    title: 'Busara',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700&display=swap",
      },
      // {
      //   rel: "stylesheet",
      //   href: "/css/codebase.min.css",
      // },
    ],
    script: [
      {
        src: "js/codebase.core.min.js",
      },
      {
        src: "js/codebase.app.min.js",
      },
      {
        src: "js/plugins/jquery-validation/jquery.validate.min.js",
      },
      {
        src: "js/pages/op_auth_signin.min.js",
      },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/static/css/codebase.min.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/persistedState.client.js'},
    '~/plugins/textFilter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  '@nuxtjs/axios',
  'vue-sweetalert2/nuxt'
],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  axios: {
    baseURL: process.env.baseURL,
  },
}
