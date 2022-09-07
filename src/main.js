import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/src/index.scss';
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus);

app.mount('#app');