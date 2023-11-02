<script lang="ts" setup>
import { type INavItem } from '@/constants/nav'

withDefaults(defineProps<INavItem>(), {
  link: '',
  label: '',
  name: '',
  show: true,
  params: () => {
    return {}
  },
  query: () => {
    return {}
  }
})
</script>

<template>
  <div class="nav-item">
    <RouterLink
      :to="{
        name,
        params,
        query
      }"
    >
      <span class="capitalize">{{ label || name }}</span>
      <v-icon v-if="icon" :name="icon" fill="white" />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<style lang="scss">
a,
i,
svg,
path {
  color: white !important;
  text-decoration: none !important;
  fill: white !important;
}

.nav-item {
  transition: transform ease 1s;
  &:hover {
    transform: translateX(-10px);
  }
}
</style>
