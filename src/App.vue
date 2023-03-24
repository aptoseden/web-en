<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script>
import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$axios = axios
export default {
  name: 'App'
}
</script>

<style>

</style>
