<script lang="ts" setup>
import {type InputProps, type IInput} from "./interfaces.ts"
import { reactive } from 'vue'

const emit = defineEmits(['change'])

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  icon: null,
  label: '',
  name: '',
  show: true
})

const genericInput = reactive<IInput>({
  name: props.name,
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
      <v-icon :name="icon" class="generic-icon" fill="black"/>
      <input
        name="generic-input"
        :type="type"
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
