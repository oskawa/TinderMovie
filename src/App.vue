<template>
  <div id="app">
    
    <router-view/>
    <headerBottom/>
  </div>
</template>

<script>
import headerBottom from './components/headerBottom'


export default {
  name: 'App',
  components: {
    headerBottom

   
  }
}
</script>

<style>

@import './assets/styles/style.css';
</style>
