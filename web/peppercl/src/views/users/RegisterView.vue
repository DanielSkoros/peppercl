<template>
  <div>
    <img :src="imgSrc" alt="main image" class="main-image" />
    <div class="form-container">
      <GenericInput
        :key="formField.name"
        v-for="formField in formFields"
        :name="formField.name"
        :type="formField.type"
        :icon="formField.icon"
        @change="(v: string | number | any) => formField.value = v"
      />
      <span class="register-cta" @click="isRegister=!isRegister"> {{ isRegister ? 'Already h' : "Don't h"}}ave an account? {{ isRegister ? 'Login' : 'Register' }} here</span>
    </div>
    <div class="btns-container">
      <button @click="dispatchAction()" class="default-btn">
        {{ isRegister ? 'Sign up' : 'Login'  }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { request } from "@/utils/request"
import { type IInput } from '@/components/input/interfaces.ts'
import GenericInput from '@/components/input/GenericInput.vue'
import { reactive, ref, watch } from 'vue'

const imgSrc =
  'https://img.freepik.com/free-vector/lake-mountain-valley-concept-illustration_114360-14594.jpg?w=1060&t=st=1699119499~exp=1699120099~hmac=45dc39c7fbefd817b517e097958d706cb5da05b9fdb7f7c4f7d0a47d9e3cb39d'

const isRegister = ref<boolean>(false)

const formFields: Array<IInput> = reactive([
  {
    name: 'email',
    type: 'email',
    icon: 'la-envelope'
  },
  {
    name: 'password',
    type: 'password',
    icon: 'bi-lock'
  }
])

const registerField = {
  name: 'user',
  type: 'text',
  icon: 'fa-user'
}
watch(isRegister, (state) => {
  if (state) formFields.push(registerField)
  else formFields.pop()
})

const dispatchAction = async () => {
  const payload: { [key: string]: any } = {};
  formFields.forEach(field => {    
    payload[field.name] = field.value 
  })
  await request({url: isRegister.value ? '/users/register' : '/users/login', method: "POST"})
}
</script>


<style lang="scss" scoped>
@import "@/assets/colors.scss";
@mixin wrapper-mixin {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-cta {
  margin-top: 15px;
  font-size: 0.75rem;
  color: $light-brown
}
.main-image {
  width: 100%;
}
.btns-container { 
  @include wrapper-mixin
}
.form-container {
  @include wrapper-mixin;
  padding: 20px 30px;
}
</style>
