import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import global from '@/utils/global'
import appVue from './App.vue'

const app = createApp(appVue)
app.use(ElementPlus);

(async () => {
  await global.init()
  const router = (await import('./router')).default
  const store = (await import('./store')).default
  app.use(router)
    .use(store)
    .mount('#app')
})()
