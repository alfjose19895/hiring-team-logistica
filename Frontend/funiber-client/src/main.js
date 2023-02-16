import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret,faEye,faEyeSlash,faLightbulb,faPen,fas} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret,faEye,faEyeSlash,faLightbulb,faPen,fas)
const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon);

axios.defaults.headers.common["Authorization"];

app.use(router,axios)
app.config.globalProperties.$msg = 'hello'
app.mount('#app')
