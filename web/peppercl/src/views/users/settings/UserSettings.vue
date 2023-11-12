<script lang="ts" setup>
import { ref } from 'vue'
import FileUpload from "@/components/FileUpload/FileUpload.vue"

interface ISettingItem {
  name: string
  label: string
}
const settingItems: Array<ISettingItem> = [
  {
    name: 'details',
    label: 'Account details'
  },
  {
    name: 'history',
    label: 'Activity history'
  },
  {
    name: 'notifications',
    label: 'Notifications'
  },
  {
    name: 'blocked',
    label: 'Bloked users'
  },
  {
    name: 'favourites',
    label: 'Favourites'
  }
]

const selectedView = ref<string>()
const logoFile = null
</script>

<template>
  <div class="settings-wrapper">
    <div class="settings-menu" v-if="!selectedView">
      <div class="logo-wrapper">
        <div class="logo-item relative">
          <v-icon v-if="!logoFile" name="co-user" scale="4" />
          <FileUpload />
        </div>
      </div>
      <div class="select-wrapper">
        <div
          v-for="settingItem in settingItems"
          :key="settingItem.name"
          @click="selectedView = settingItem.name"
        >
          {{ settingItem.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-item {
    width: 150px;
    height: 150px;

    border: 1px solid black;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.select-wrapper {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}


</style>
