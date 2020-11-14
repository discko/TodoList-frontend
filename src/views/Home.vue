<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p><button v-on:click='demoGetVersion()'>get version:</button><span>{{ versionInfo }}</span></p>
    <p><button v-on:click='demoGetModule("web")'>get module:</button><span>{{ moduleInfo }}</span></p>
    <p><button v-on:click='demoGetModulePart("common", "env")'>get modulePart:</button><span>{{ modulePart }}</span></p>
    <HelloWorld v-bind:msg='getMsg()'/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import EPE, { epMessage, epAlert, epConfirm, epPrompt, epNotify, MessageBoxInputData } from '@/utils/ElementPlusExtension'
import global from '@/utils/global'
import api from '@/static/api'

const profile = global.getProfiledConfig()

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      versionInfo: 'click to get',
      moduleInfo: 'click to get',
      modulePart: 'click to get'
    }
  },
  methods: {
    demoGetVersion () {
      api.ServiceInfo.ServiceVersion.getServiceInfoVersion().then(data => {
        const result: {[key: string]: string} = {}
        for (const moduleName in data) {
          const moduleInfo = data[moduleName]
          result[moduleName] = `${moduleInfo.env}.${moduleInfo.serial}`
        }
        this.versionInfo = JSON.stringify(result)
        this.EPE.notify({
          title: 'title',
          message: 'click ok',
          position: 'bottom-right',
          type: 'info'
        })

        this.epAlert(this.versionInfo, 'title').then(() => {
          this.epMessage('click ok')
        }).catch(action => {
          this.epMessage.warning('clicked ' + action)
        })
      }).catch((reason: Error) => {
        console.log(' error: ', reason)
        this.epMessage.error(reason.message)
      })
    },
    demoGetModule (moduleName: string) {
      api.ServiceInfo.ModuleVersion.getServiceInfoModule(moduleName).then(data => {
        this.moduleInfo = `${moduleName}: ${data.env}.${data.serial}`
        this.EPE.notify.error({
          title: 'error title',
          message: 'error message',
          onClose: (): void => { this.EPE.message('click close of the notification') }
        })
        this.EPE.confirm(this.moduleInfo, {
          distinguishCancelAndClose: true
        }).then(() => {
          this.EPE.message('click yes')
        }).catch(action => {
          this.EPE.message.error('clicked ' + action)
        })
      }).catch((reason: Error) => {
        console.log(' error: ', reason)
        this.epMessage.error(reason.message)
      })
    },
    demoGetModulePart (moduleName: string, modulePart: 'env' | 'serial') {
      api.ServiceInfo.ModulePart.getServiceModulePart(moduleName, modulePart).then(data => {
        this.modulePart = `${moduleName}.${modulePart}: ${data}`
        this.epNotify.success('notify success')
        this.epPrompt(this.modulePart, {
          distinguishCancelAndClose: true
        }).then(data => {
          this.epMessage('click finish ' + (data as MessageBoxInputData).value)
        }).catch(action => {
          this.epMessage.success('clicked ' + action)
        })
      }).catch((reason: Error) => {
        console.log(' error: ', reason)
        this.epMessage.error(reason.message)
      })
    }
  },
  setup () {
    const getMsg = () => `Welcom to ${profile.profileInfo.profileName}-${profile.profileInfo.serial}`
    return {
      epMessage,
      epAlert,
      epConfirm,
      epPrompt,
      epNotify,
      getMsg,
      EPE
    }
  }
})
</script>
