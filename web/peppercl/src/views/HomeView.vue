<template>
  <div class="color__wrapper">
    <div v-for="color in colors" :class="color" class="color-box" :key="color"></div>
  </div>
</template>

<script setup lang="ts">
const colors = ['green', 'sea', 'light-brown', 'brown', 'dark-gray', 'light-gray']
</script>

<style scoped lang="scss">
.color__wrapper {
  width: 100%;
  display: flex;
  height: 100vh;
}
.color-box {
  width: 100%;
  height: 100vh;
}
</style>
