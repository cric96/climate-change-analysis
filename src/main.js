import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import chartjs from './plugins/chart'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
new Vue({
  vuetify,
  chartjs,
  render: h => h(App)
}).$mount('#app')
