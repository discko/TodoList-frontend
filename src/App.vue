<template>
  <img alt='Vue logo' src='./assets/logo.png' />
  <HelloWorld v-bind:msg="getMsg()" />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Global from './utils/global'

console.log(Global.profile)

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    const profile = Global.profile?.profileName
    console.log('in setup', profile)
    const getMsg = () => `Welcome to ${Global.profile?.profileName}-${Global.profile?.serial}`
    return { profile, getMsg }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px
}
</style>
