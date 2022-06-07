import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index';
import 'element-plus/packages/theme-chalk/src/base.scss';
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus';

const app = createApp(App);
app.use(ElementPlus);
app.use(router).mount('#app');
