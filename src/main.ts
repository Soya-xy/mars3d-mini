import { createApp } from 'vue'
import { injectState, key } from '@mars/common/store/widget'
import MarsUIInstall from '@mars/components/mars-ui'
import Application from './App.vue'
import router from './router'
import store from './widget-store'
import '@mars/components/mars-ui/common'
import './assets'
const app = createApp(Application)

MarsUIInstall(app)

app.use(injectState(store), key)
app.use(router)

app.mount('#app')
