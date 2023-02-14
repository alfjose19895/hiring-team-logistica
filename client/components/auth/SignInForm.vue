<script lang="ts" setup>
import {
  NCard as Card,
  NForm as Form,
  NFormItem as FormItem,
  NInput as Input,
} from 'naive-ui'

import type { FormInst, FormRules } from 'naive-ui'

const { signIn, data } = useSession()

definePageMeta({
  parent: 'auth',
  middleware: ['auth'],
})

// Ref to form state
const formState = ref<FormInst | null>(null)

// Form validation
const validForm = useState('validForm', (): boolean | undefined => {
  return undefined
})

// Login model
const loginModel = useState('login', () => {
  return {
    credential: 'admin',
    password: 'admin',
  }
})

// Regex to validate credential input field (email or username)
const credentialRegex = new RegExp(
  '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
)

// Login rules
const loginRules: FormRules = {
  credential: [
    {
      required: true,
      validator(_: any, value: string) {
        if (!value) {
          return new Error('Enter a valid credential')
        }
        validForm.value = true
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      validator(_: any, value: string) {
        if (!value) {
          return new Error('Enter a valid password')
        }
        validForm.value = true
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
}

const errorMessage = ref()
const login = async () => {
  const res = await fetch('http://localhost:5050/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginModel.value),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.status === 200) {
    const data = await res.json()
    console.log(data)
  } else {
    let message = await res.text()
    errorMessage.value = JSON.parse(message).message
  }
}
</script>

<template>
  <ClientOnly>
    <Card
      class="rounded-md"
      header-style="align-items: flex-start"
      :bordered="false"
    >
      <template #header>
        <div class="flex items-center justify-center gap-x-2">
          <Icon:mdi:badgeAccountHorizontalOutline class="text-primary-500" />
          <h1 class="text-2xl font-bold font-whitney">Authentication</h1>
        </div>
        <span class="text-sm font-walsheim text-gray-500 leading-3">
          Please, provide a valid credential to access to the system.
        </span>
      </template>
      <div>
        <Form
          size="large"
          :model="loginModel"
          :rules="loginRules"
          ref="formState"
        >
          <!-- Credential -->
          <FormItem path="credential">
            <template #label>
              <span
                class="font-inter dark:text-gray-200 font-bold tracking-wide"
              >
                Email or Username
              </span>
            </template>
            <Input
              placeholder="hi@domain.com"
              v-model:value="loginModel.credential"
            />
          </FormItem>
          <!-- Password -->
          <FormItem path="password">
            <template #label>
              <span
                class="font-inter dark:text-gray-200 font-bold tracking-wide"
              >
                Password
              </span>
            </template>
            <Input
              placeholder="Enter your password"
              v-model:value="loginModel.password"
              type="password"
            />
          </FormItem>
        </Form>
        <!-- Error message -->
        <span class="text-red-500 font-inter mx-auto">
          {{ errorMessage }}
        </span>
        <Button
          class="w-full mt-4 rounded-md"
          type="primary"
          :disabled="!validForm"
          @click="
            signIn('credentials', {
              ...loginModel,
              redirect: true,
              callbackUrl: '/dashboard',
            })
          "
        >
          <span class="flex items-center gap-x-2">
            <Icon:mdi:loginVariant />
            Login
          </span>
        </Button>
      </div>
    </Card>
    {{ data }}
  </ClientOnly>
</template>
