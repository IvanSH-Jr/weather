import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons'
import { faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons'
import { faSmog } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import 'bulma'
library.
    add(
        faGear,faCloud, 
        faCloudRain, faWind, 
        faGauge, faCloudSun, 
        faCloudSunRain, faSun, 
        faSnowflake, faSmog
        )
createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
