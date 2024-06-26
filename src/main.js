import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from '../src/storm'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 对于 Element Plus (Vue 3)
import { ElIcon } from 'element-plus';
import 'element-plus/dist/index.css'; // 引入对应 CSS
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(ElIcon);
app.use(pinia)  //全局挂载
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');