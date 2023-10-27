<template>
  <div class="sidebar__wrapper relative">
    <div @click.stop="setIsOpen" class="nav-burger__icon" :class="{ open: isOpen }">
      <div class="nav-burger__bar" :class="{ open: isOpen }"></div>
      <div class="nav-burger__bar" v-show="!isOpen"></div>
      <div class="nav-burger__bar" :class="{ open__reverse: isOpen }"></div>
    </div>
  </div>
  <div class="sidebar__backdrop"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['open'])

const isOpen = ref<Boolean>(false)
const setIsOpen = () => {
  isOpen.value = !isOpen.value
  emit('open', isOpen.value)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
