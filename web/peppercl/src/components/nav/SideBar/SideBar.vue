<template>
  <div class="sidebar__wrapper relative">
    <div @click.stop="() => setIsOpen()" class="nav-burger__icon" :class="{ open: isOpen }">
      <div class="nav-burger__bar" :class="{ open: isOpen }"></div>
      <div class="nav-burger__bar" v-show="!isOpen"></div>
      <div class="nav-burger__bar" :class="{ open__reverse: isOpen }"></div>
    </div>
  </div>
  <div class="sidebar__backdrop" :class="{ visible: isOpen }"></div>
  <div class="sidebar" :class="{ visible: isOpen }">
    <div class="sidebar__search-wrapper">
      <SearchBar :key="`search_${isOpen}`" />
    </div>
    <nav>
      <div class="nav__item-wrapper">
        <NavItem v-for="navItem in navRoutes" :key="navItem.name" v-bind="navItem" :active="navItem.name === route.name"/>
      </div>
      <div class="nav__item-wrapper lower">
        <div class="separator"></div>
        <NavItem v-for="navItem in lowerRoutes" :key="navItem.name" v-bind="navItem" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '../NavItem/SearchBar.vue'
import NavItem from '../NavItem/NavItem.vue'
import { getBottomNav, getMainNav, type INavItem } from '@/constants/nav'
import { getCookie } from '@/utils/request'

const route = useRoute()
const emit = defineEmits(['open'])

const isOpen = ref<Boolean>(false)
const setIsOpen = (state: boolean | undefined = undefined) => {
  if (state != undefined) isOpen.value = state
  else isOpen.value = !isOpen.value
  emit('open', isOpen.value)
}

const isAuthenticated = ref<string | null>(getCookie('auth'));
const navRoutes = ref<Array<INavItem>>(getMainNav(!!isAuthenticated.value, route.name))
const lowerRoutes = ref<Array<INavItem>>(getBottomNav(!!isAuthenticated.value))

watch(
  () => route.name,
  () => {
    setIsOpen(false)
    isAuthenticated.value = getCookie('auth');
    lowerRoutes.value = getBottomNav(!!isAuthenticated.value)
  }
)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
