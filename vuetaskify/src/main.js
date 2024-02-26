import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import Axios from 'axios';


const app = createApp(App);

// Configura Axios
app.config.globalProperties.$http = Axios;

app.mount('#app');
