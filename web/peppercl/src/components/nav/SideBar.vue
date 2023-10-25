<template>
  <div class="sidebar__wrapper relative">
    <div @click.stop="setIsOpen" class="nav-burger__icon" :class="{ open: isOpen }">
      <div class="nav-burger__bar" :class="{ open: isOpen }"></div>
      <div class="nav-burger__bar" v-show="!isOpen"></div>
      <div class="nav-burger__bar" :class="{ open__reverse: isOpen }"></div>
    </div>
  </div>
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
.nav-burger__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: transform 0.5s ease;

  &.open {
    transform: translateX(calc(-100vw + 45px)) translateY(6px);
  }
  .nav-burger__bar {
    height: 3px;
    width: 25px;
    background-color: white;
    transition: transform 0.5s ease;

    &.open {
      transform: rotate(45deg) translateY(6px);
    }
    &.open__reverse {
      transform: rotate(-45deg) translateY(-6px);
    }
  }
}
</style>
