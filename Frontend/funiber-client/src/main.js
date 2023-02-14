import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret,faEye,faEyeSlash)
const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon);
axios.defaults.baseURL="http://127.0.0.1:8000/";
axios.defaults.headers.common["Authorization"];

app.use(router,axios)
app.config.globalProperties.$msg = 'hello'
app.mount('#app')
