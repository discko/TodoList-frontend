<template>
  <img alt='Vue logo' src='./assets/logo.png' />
  <p><button v-on:click='demoGetVersion()'>get version:</button><span>{{ versionInfo }}</span></p>
  <p><button v-on:click='demoGetModule()'>get module:</button><span>{{ moduleInfo }}</span></p>
  <HelloWorld v-bind:msg="getMsg()" />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Global from './utils/global'
import axios from 'axios'

// eslint-disable-next-line
console.log(Global.profiledConfig!.profileInfo.profileName)
const profiledConfig = Global.getProfiledConfig()
const globalConfig = Global.getGlobalConfig()

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    const profile = profiledConfig.profileInfo.profileName
    console.log('in setup', profile)
    const getMsg = () => `Welcome to ${profiledConfig.profileInfo.profileName}-${profiledConfig.profileInfo.serial}`
    const moduleInfo = ref('click to get')
    const versionInfo = ref('click to get')

    const demoGetVersion = async () => {
      const url = `${profiledConfig.netConfig.baseUrl}${globalConfig.api.versionInfo}`
      versionInfo.value = JSON.stringify((await axios.get(url)).data)
      console.log('versionInfo:', versionInfo)
    }
    const demoGetModule = async () => {
      const url = `${profiledConfig.netConfig.baseUrl}${globalConfig.api.moduleInfo}`
      moduleInfo.value = JSON.stringify((await axios.get(url)).data)
      console.log('moduleInfo: ', moduleInfo)
    }

    return { profile, getMsg, demoGetVersion, demoGetModule, moduleInfo, versionInfo }
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
