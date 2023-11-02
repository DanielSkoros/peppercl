<script lang="ts" setup>
import { reactive } from 'vue'

const emit = defineEmits(['search'])

interface ISearchInput {
  value: string | number
  isFocused: boolean
  icon?: string | null
}

const searchInput = reactive<ISearchInput>({
  value: '',
  icon: 'bi-search',
  isFocused: false
})

const handleInputChange = (event: Event) => {
  const el = event.target as HTMLInputElement
  searchInput.value = el?.value
  emit('search', searchInput.value)
}
</script>

<template>
  <div class="search-input__wrapper">
    <label for="search-input" :class="{ 'focused': searchInput.isFocused }">
      Search<span v-if="!searchInput.isFocused">...</span>
    </label>
    <div class="search-input__container" :class="{ focused: searchInput.isFocused }">
      <v-icon :name="searchInput.icon" class="search-icon" />
      <input
        name="search-input"
        type="text"
        @change="(event: Event) => handleInputChange(event)"
        :value="searchInput.value"
        @click="searchInput.isFocused = true"
        class="search-input"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
