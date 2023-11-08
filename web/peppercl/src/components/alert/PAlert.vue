<script lang="ts" setup>
import { ref, watch } from 'vue'

interface PAlertProps {
  text?: string
  color?: string
  icon?: string
  initShow?: boolean
}

const props = withDefaults(defineProps<PAlertProps>(), {
  text: undefined,
  icon: undefined,
  color: 'warning',
  initShow: true
})

const show = ref<Boolean>(props.initShow)

watch(
  () => props.text,
  () => {
    show.value = true;
  }
)
</script>

<template>
  <div :class="`alert-wrapper ${show && text ? 'show' : ''}`">
    <div :class="`alert ${color} relative`">
      <v-icon :name="icon" class="generic-icon" fill="black" v-if="icon" />
      <div class="text-wrapper">
        <span class="font-weight-bold capitalize">{{ color }}</span>
        <span class="alert-text">{{ text }}</span>
      </div>
      <v-icon
        name="fa-times"
        class="generic-icon close-icon pointer"
        fill="black"
        @click="show = false"
      />
    </div>
  </div>
</template>

<style lang="scss">
.alert-wrapper {
  position: absolute;
  opacity: 0;
  bottom: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out, opacity 1s ease;
  &.show {
    transform: translateX(0);
    opacity: 1;
  }
  .alert {
    display: flex;
    align-items: center;
    width: 90%;
    padding: 10px 20px;

    &.warning {
      background-color: #fdf7dc;
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
    }
    .close-icon {
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }
}
</style>
