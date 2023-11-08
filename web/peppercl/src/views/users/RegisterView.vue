<template>
  <div>
    <img :src="imgSrc" alt="main image" class="main-image" />
    <div class="form-container">
      <GenericInput
        :key="formField.name"
        v-for="formField in formFields"
        :name="formField.name"
        :label="formField.label"
        :type="formField.type"
        :icon="formField.icon"
        :invalid-response="formValidation[formField.name]"
        @change="(v: string | number | any) => (handleInput(v, formField))"
      />
      <span class="register-cta" @click="isRegister = !isRegister">
        {{ isRegister ? 'Already h' : "Don't h" }}ave an account?
        {{ isRegister ? 'Login' : 'Register' }} here</span
      >
    </div>
    <div class="btns-container">
      <button @click="dispatchAction()" class="default-btn">
        {{ isRegister ? 'Sign up' : 'Login' }}
      </button>
    </div>
    <PAlert :text="loginResponse"/>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { request } from '@/utils/request'
import {
  type IFormValidation,
  type IFormValidationResponse,
} from './interfaces.ts'
import { type IInput } from '@/components/input/interfaces.ts'
import GenericInput from '@/components/input/GenericInput.vue'
import PAlert from '@/components/alert/PAlert.vue'
import router from '@/router'

const imgSrc = 'https://img.freepik.com/free-vector/lake-mountain-valley-concept-illustration_114360-14594.jpg?w=1060&t=st=1699119499~exp=1699120099~hmac=45dc39c7fbefd817b517e097958d706cb5da05b9fdb7f7c4f7d0a47d9e3cb39d'

const isRegister = ref<boolean>(false)
const loginResponse = ref<string | undefined>(undefined)
const formValidation = ref<IFormValidation>({})

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
  name: 'name',
  label: "User name",
  type: 'text',
  icon: 'fa-user'
}
watch(isRegister, (state) => {
  if (state) formFields.push(registerField)
  else formFields.pop()
  setFormValidation({})
})

const dispatchAction = async () => {
  loginResponse.value = undefined;
  setFormValidation()
  const body: { [key: string]: any } = {}
  formFields.forEach((field) => {
    body[field.name] = field.value
  })
  const { status, data } = await request({
    url: isRegister.value ? '/users/register' : '/users/login',
    method: 'POST',
    body
  })

  if (isRegister.value) return handleRegisterResponse(status, data)
  handleLoginResponse(status, data)
}

const setFormValidation = async (formValidationData?: IFormValidationResponse | any) => {
  if (!formValidationData) formValidation .value= {}
  Object.entries(formValidationData?.['message']?.errors || {}).forEach(([name, properties]) => {
    if (properties) formValidation.value[name] = properties?.message?.replace('Path', '')
  })
}


const handleLoginResponse = (status: number, data: IFormValidationResponse) => {
  if (data?.token) {
    document.cookie = 'auth=' + data.token;
    router.push({name: 'Home'});
  }
  else if(data?.message) loginResponse.value = data.message
}

const handleRegisterResponse = (status: number, data: IFormValidation) => {
  if (status === 400) return setFormValidation(data)
  isRegister.value = false
}

const handleInput = async (v: string | number | null, formField: IInput) => {
  formField.value = v; 
  formValidation.value[formField.name] = ""
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';
@mixin wrapper-mixin {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-cta {
  margin-top: 15px;
  font-size: 0.75rem;
  color: $light-brown;
}
.main-image {
  width: 100%;
}
.btns-container {
  @include wrapper-mixin;
}
.form-container {
  @include wrapper-mixin;
  padding: 20px 30px;
}
</style>
