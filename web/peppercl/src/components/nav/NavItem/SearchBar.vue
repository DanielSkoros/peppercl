<script lang="ts" setup>
import { reactive } from 'vue'

interface ISearchInput {
  value: string | number
  icon?: string | null
}

const searchInput = reactive<ISearchInput>({
  value: '',
  icon: 'bi-search'
})

const handleInputChange = (event: Event) => {
  const el = event.target as HTMLInputElement
  searchInput.value = el?.value
  console.log(searchInput.value)
}
</script>

<template>
  <div class="input-wrapper">
    <label for="search-input"></label>
    <v-icon :name="searchInput.icon" class="search-icon"/>
    <input
      name="search-input"
      type="text"
      @change="(event: Event) => handleInputChange(event)"
      :value="searchInput.value"
      class="search-input"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss"
</style>
