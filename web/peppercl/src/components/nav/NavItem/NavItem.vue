<script lang="ts" setup>
import { type INavItem } from '@/constants/nav'

withDefaults(defineProps<INavItem>(), {
  link: '',
  label: '',
  name: '',
  show: true,
  actionFn: undefined,
  params: () => {
    return {}
  },
  query: () => {
    return {}
  }
})
</script>

<template>
  <div class="nav-item pointer">
    <component
      :is="actionFn ? 'div' : 'RouterLink'"
      :to="{
        name,
        params,
        query
      }"
      @click="actionFn && actionFn()"
    >
      <span class="capitalize">{{ label || name }}</span>
      <v-icon v-if="icon" :name="icon" fill="white" />
    </component>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<style lang="scss">
.nav-item {
  transition: transform ease 1s;
  &:hover {
    transform: translateX(-10px);
  }
  a,
  i,
  svg,
  path {
    color: white !important;
    text-decoration: none !important;
    fill: white !important;
  }
}
</style>
