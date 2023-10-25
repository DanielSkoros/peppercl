<template>
  <nav class="nav-container relative">
    <div :class="{'move-out': sidebarOpen}" class="back-arrow animated">&lt;</div>
    <div class="nav__logo">LOGO</div>
    <SideBar @open="(state) => (sidebarOpen = state)" />
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SideBar from './SideBar.vue'
const sidebarOpen = ref<Boolean>(false)
</script>

<style lang="scss">
.nav-container {
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
