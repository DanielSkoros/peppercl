<script lang="ts" setup>
import { reactive } from 'vue'

const emit = defineEmits(['change'])

interface IInput {
  name: string
  value?: string | number | object | Array<any> | boolean
  type?: string
  isFocused?: boolean
  icon?: string | null
  label?: string
}

const props = withDefaults(defineProps<IInput>(), {
  type: 'text',
  icon: null,
  label: '',
  name: '',
  show: true
})

const genericInput = reactive<IInput>({
  ...props,
  value: '',
  isFocused: false
})

const handleInputChange = (event: Event) => {
  const el = event.target as HTMLInputElement
  genericInput.value = el?.value
  emit('change', genericInput.value)
}
</script>

<template>
  <div class="generic-input__wrapper">
    <label for="generic-input" :class="{ focused: genericInput.isFocused }">
      <span class="capitalize">{{  label || name  }}</span>   
       <span v-if="!genericInput.isFocused">...</span>
    </label>
    <div class="generic-input__container" :class="{ focused: genericInput.isFocused }">
      <v-icon :name="genericInput.icon" class="generic-icon" />
      <input
        name="generic-input"
        type="text"
        @change="(event: Event) => handleInputChange(event)"
        :value="genericInput.value"
        @click="genericInput.isFocused = true"
        class="generic-input"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
