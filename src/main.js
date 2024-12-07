import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue' // 引入所有图标
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
  }
  

app.use(router).use(ElementPlus).mount('#app')
