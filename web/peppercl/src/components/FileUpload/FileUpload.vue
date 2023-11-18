<script lang="ts" setup>
import { ref } from 'vue'
import type { LocationQueryRaw, RouteParamsRaw } from 'vue-router'
import { request } from '@/utils/request'

interface IFileUpload {
  url: string
  icon?: string
  wrapperClasses?: string
  multiple?: boolean
  show?: boolean
  diasabled?: boolean
  actionFn?: Function
  params?: RouteParamsRaw
  query?: LocationQueryRaw
}
const props = withDefaults(defineProps<IFileUpload>(), {
  url: '',
  icon: 'bi-plus-lg',
  wrapperClasses: '',
  name: '',
  multiple: false,
  diasabled: false,
  show: true,
  actionFn: undefined,
  params: () => {
    return {}
  },
  query: () => {
    return {}
  }
})

const emit = defineEmits(['upload'])

const file = ref(null)
const submitFile = async () => {
  const files = file.value.files
  const scopedFiles = props.multiple ? files : [files[0]]
  const headers = { 'Content-Type': 'multipart/form-data' }
  for (let file of scopedFiles) {
    const formData = new FormData()
    formData.append('file', file)
    const { status, data } = await request({
      url: props.url,
      query: props.query,
      body: formData,
      headers,
    })

    emit('upload', { status, fileName: data.fileName })
  }
}
</script>

<template>
  <div :class="`add-file-wrapper ${wrapperClasses}`" v-if="show">
    <input
      type="file"
      id="fileElem"
      :multiple="multiple"
      accept="image/*"
      class="visually-hidden"
      ref="file"
      @change="submitFile"
    />
    <label for="fileElem">
      <v-icon :name="'bi-plus-lg'" scale="1" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.add-file-wrapper {
  right: 7px;
  bottom: 7px;
  position: absolute;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: gray;
  border-radius: 100%;
  color: white;
  font-size: 2rem;
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-top: 5px;
    }
  }
}
</style>
