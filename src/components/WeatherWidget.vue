<template>
    <div class="my-widget">
        <div class="gear-style icon">
            <font-awesome-icon icon="fa-solid  fa-gear" class="" />
        </div>
        
        <div class="widget-item" v-for="(value,index) in cityArr" :key="index" >
            <div class="location">
                <strong>{{value.cityName}}, {{value.country}}</strong>
            </div>
            <div class="weather-item">
                <div class="weather-icon">
                    <font-awesome-icon :icon="value.iconType" :class="value.className"/>
                </div>
                <div class="weather-temp">
                    <strong class="celsius-img">{{value.temp}}</strong>
                </div>
            </div>
            <div class="weather-description">
                <span class="celsius-img">Feels like {{value.feels_like}}</span>
                <span>{{value.weather}}</span>
            </div>
            <div class="wind-presure">
                <div class="bottom-icon"><font-awesome-icon icon="fa-solid fa-wind" class="wind"/></div>
                <span>{{value.wind}}m/s</span>
                <div class="bottom-icon"><font-awesome-icon icon="fa-solid fa-gauge" class="psychometr"/></div>
                <span>{{value.pressure}}hPa</span>
            </div>
            <div class="bot-info">
                <span>Humidity: {{value.humidity}}%</span>
                <span>Visibility: ~{{value.visibility}}km</span>
            </div>
        </div>
    
        <form @submit.prevent >
            <div class="form__class">
                <input class="input" type="text" placeholder="Имя города" v-model="cityReq">
                <button @click="getCoordinates()" class="button is-link">Запросить</button>
            </div>
        </form>
    </div>    
        
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'weather-widget',
    data(){
        return{
            apiKey: 'тут ключ должен быть',
            limit: 1,
            lat:'',
            lon:'',
            cityReq: '',
            cityArr:[],
            cityData:{
                cityName: "null",
                country: 'null',
                temp: "null",
                weather: "null",
                wind: "null",
                feels_like:'null',
                humidity: 'null',
                pressure: 'null',
                visibility: 'null',
                description: 'null',
                iconType: 'null',
                className: 'null'
            },
            
 
        }
    },
    methods:{
        async getCoordinates(){
            try {
                const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.cityReq}&limit=1&appid=${this.apiKey}`)
                this.lat = response.data[0].lat
                this.lon = response.data[0].lon
                if(this.lat && this.lon){
                    this.getWeatherData(this.lat, this.lon)
                    this.cityReq = ''
                }
            } catch (error) {
                console.log(error)
            }
        },

        async getWeatherData(lat, lon){
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
                console.log(response.data)
                this.cityData.temp = response?.data.main.temp
                this.cityData.weather = response?.data.weather[0].main
                this.cityData.wind = response?.data.wind.speed
                this.cityData.cityName = response?.data.name
                this.cityData.country = response?.data.sys.country
                this.cityData.feels_like = response?.data.main.feels_like
                this.cityData.humidity = response?.data.main.humidity
                this.cityData.pressure = response?.data.main.pressure
                this.cityData.visibility = response?.data.visibility/1000
                this.cityData.description = response?.data.weather[0].description
                this.cityArr.push(this.cityData)
                this.mainIcon(this.cityData.weather)
                this.cityData = {
                    cityName: "null",
                    country: 'null',
                    temp: "null",
                    weather: "null",
                    wind: "null",
                    feels_like:'null',
                    humidity: 'null',
                    pressure: 'null',
                    visibility: 'null',
                    description: 'null',
                    iconType: 'null',
                    className: 'null'
                }
            } catch (error) {
                console.log(error)
            }
        },
        getCurrentGeoData(){
            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(this.callbackSuccess, error)
        },

        callbackSuccess(pos){
            let {latitude, longitude} = pos.coords
            this.getWeatherData(latitude, longitude)
        },
        mainIcon(mainWeather){
            console.log(mainWeather)
            switch (mainWeather){
                case 'Clouds':
                    this.cityData.iconType = "fa-solid fa-cloud"
                    this.cityData.className = 'cloud'
                    break
                case 'Rain':
                    this.cityData.iconType = "fa-solid fa-cloud-rain"
                    this.cityData.className = 'rain'
                    break
                case 'Clear':
                    this.cityData.iconType = "fa-solid fa-cloud"
                    this.cityData.className = 'cloud'
                    break
                case 'Snow':
                    this.cityData.iconType = "fa-solid fa-snowflake"
                    this.cityData.className = 'snow'
                    break
                case 'Sun':
                    this.cityData.iconType = "fa-solid fa-sun"
                    this.cityData.className = 'sun'
                    break
                case 'Mist':
                    this.cityData.iconType = "fa-solid fa-smog"
                    this.cityData.className = 'mist-smog'
            }
            console.log(this.cityData.iconType)
        }
    },

    mounted(){
        this.getCurrentGeoData()
    },
    computed:{
        iconClass(){
            console.log(this.cityData.iconType)
            return{
                rain: this.cityData.iconType === "fa-solid fa-cloud-rain",
                cloud: this.cityData.iconType === "fa-solid fa-cloud",
                snow: this.cityData.iconType === "fa-solid fa-snowflake",
                sun: this.cityData.iconType === "fa-solid fa-sun",
            }
        }
    }
}
</script>

<style scoped>
.my-widget{
    background-color: rgba(46, 134, 195, 0.5);
    width: 320px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    font-family:    Verdana, Geneva, Tahoma, sans-serif;
}
.location{
    font-size: 24px;
    text-align: center;
    margin-bottom: 15px;
}
/*******/
.icon{
    font-size: 2.2em;
    cursor: pointer;
}
.rain{
    font-size: 5em;
    color:rgba(41, 171, 227, 1);
}
.sun{
    font-size: 5em;
    color: rgba(252, 235, 15, 0.6);
}
.snow{
    font-size: 5em;
    color: rgba(212, 231, 241, 0.9);
}
.wind{
    color: rgba(228, 228, 228, 0.9);
}
.cloud{
    font-size: 5em;
    color: rgba(236, 239, 241, 0.8);
}
.bottom-icon{
    font-size: 1.5em;
}
.gear-style{
    margin-top: 15px;
    margin-left: 15px;
}
/*******/
.widget-item{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 0 15px;
}

.weather-item{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 15px 15px 15px;
}
.weather-description{
    display: flex;
    justify-content: space-between;
}
.weather-temp{
    font-size: 30px;
}
.celsius-img:after{
    content: "\B0";
}
.wind-presure{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bot-info{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.form__class{
    width: 100%;
    display: flex;
}
.form__class button{
    margin-left: 10px;
}

.weather{
    display: flex;
    justify-content: center;
}






.rowShow-enter-active {
  animation: bounce-in .8s;
}
.rowShow-leave-active {
  animation: bounce-in .8s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
//rain #1f78dc
//sun #ffdd00
//cloud  #adbaca
//grey #878787