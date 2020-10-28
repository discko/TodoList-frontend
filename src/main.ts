import { createApp } from 'vue'
import Global from './utils/global'

console.log('in main.ts')
Global.init().then(() => {
  import('./App.vue').then(({ default: App }) => {
    createApp(App).mount('#app')
  })
})
