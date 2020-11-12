<template>
  <div class="home">
    <img @click='hello()' alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { epMessage } from '@/utils/ElementPlusExtension'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    hello () {
      this.epMessage('raw')
      this.epMessage.info('info')
      this.epMessage.warning('warning')
      this.epMessage.success('success')
      this.epMessage.info({
        duration: 10000,
        message: 'custom'
      })
    }
  },
  setup () {
    return {
      epMessage
    }
  }
})
</script>
