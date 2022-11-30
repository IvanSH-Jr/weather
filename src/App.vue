<template>
  <div class="app">
    <weather-widget></weather-widget>
  </div>
  
</template>

<script>

import WeatherWidget from '@/components/WeatherWidget.vue';
export default {
  name: 'App',
  components: {
    WeatherWidget
  }
}
</script>

<style scoped>
 .app{
  margin-top: 15px;
  display: flex;
  justify-content: center;
 }

</style>
