<template>
  <nav class="nav-container relative">
    <div :class="{ 'move-out': sidebarOpen }" class="back-arrow animated">&lt;</div>
    <div class="nav__logo">LOGO</div>
    <SideBar @open="(state: boolean) => setSidebarState(state)" />
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SideBar from '../SideBar/SideBar.vue'

const emit = defineEmits(['sidebarStateChanged'])

const sidebarOpen = ref<Boolean>(false)
const setSidebarState = (state: boolean) => {
  sidebarOpen.value = state
  emit('sidebarStateChanged', state)
  const elementsToLockOverflow = ['body', '#app']
  elementsToLockOverflow.forEach((el) => {
    document.querySelector(el)?.classList?.[state ? 'add' : 'remove']('overflow-hidden')
  })
}
</script>

<style lang="scss">
.nav-container {
  position: relative;
  z-index: 4;
  color: white;
  width: 100%;
  background: black;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

  .back-arrow {
    transition-delay: 250ms;
    transition-duration: 0.5s;
    &.move-out {
      transition-duration: 2s !important;
    }
  }
}
</style>
