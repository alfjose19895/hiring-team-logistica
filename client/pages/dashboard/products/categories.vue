<script lang="ts" setup>
import { h } from 'vue'
import { NForm as Form, NFormItem as FormItem, NInput as Input } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
const { t } = useLang()

useHead({
  title: capitalizeFirst(t('pages.products.categories.title')),
})
definePageMeta({
  title: 'Categories',
  parent: 'Products',
})

// ref tho show the form to create a new category
const showForm = ref(false)

/**
 * Defining the mini form to create a new category
 */
const formState = ref<FormInst | null>(null)
const isValidForm = useState('isValidForm', (): boolean | undefined => {
  return undefined
})

const categoryModel = useState('category', () => {
  return {
    name: '',
  }
})

// regex must be accept letters, numbers and spaces (spaces are not allowed at the beginning or end of the string)
const categoryNameRegex = new RegExp('^[a-zA-Z0-9 ]+$')

const categoryRules: FormRules = {
  name: [
    {
      required: true,
      validator(_: any, value: string) {
        if (value.length === 0) {
          return Promise.reject(new Error('The name is required'))
        } else if (
          /* starts with space */ value[0] === ' ' ||
          /* ends with space */ value[value.length - 1] === ' '
        ) {
          return Promise.reject(
            new Error('The name must not start or end with a space')
          )
        } else if (value.length > 30) {
          return Promise.reject(
            new Error('The name must be at most 50 characters long')
          )
        } else if (!categoryNameRegex.test(value)) {
          return Promise.reject(
            new Error('The name must contain only letters, numbers and spaces')
          )
        }
        return Promise.resolve()
      },
      trigger: ['input', 'change'],
    },
  ],
}

// key for update the data
const data_categories = ref(0)

// calback to update the form state
const onUpdate = () => {
  if (
    formState.value?.validate() &&
    categoryModel.value.name.match(/^[a-zA-Z0-9 ]+$/)
  ) {
    isValidForm.value = true
  } else if (categoryModel.value.name.length === 0) {
    isValidForm.value = false
  } else {
    isValidForm.value = false
  }
}

// simple function to reload the data by incrementing the key
const reload = () => {
  data_categories.value++
}

// push to api server
const successMessage = ref('')
const errorMessage = ref('')

const data = ref<any>([])
const createCategory = async () => {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryModel.value),
  })
  data.value = await response.json()
  if (data.value.status >= 400) {
    errorMessage.value = data.value.message
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } else {
    showForm.value = false
    successMessage.value = 'Category created successfully'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    data_categories.value++
    categoryModel.value.name = ''
    showForm.value = false
  }
}
</script>

<template>
  <PageHeader>
    <PageTitle
      :text="$t('pages.products.categories.title')"
      class="font-whitney capitalize"
    />
    <span class="text-gray-400 font-poppins text-[11pt]">
      {{ capitalizeFirst($t('pages.products.categories.description')) }}
    </span>
  </PageHeader>
  <PageSection>
    <div class="flex gap-x-4 items-center">
      <Button
        :text="$t('pages.products.categories.create')"
        type="none"
        class="hover:bg-green-600"
        :class="{
          'bg-green-500 hover:bg-green-600': !showForm,
          'bg-primary-500 hover:bg-primary-600': showForm,
        }"
        @click="showForm = !showForm"
      >
        <Icon:mdi:plus class="w-4 h-4 text-white" v-if="!showForm" />
        <span class="text-white font-poppins tracking-wide">
          {{ showForm ? 'Cancel' : 'Create new category' }}
        </span>
      </Button>
    </div>
    <span v-if="successMessage" class="text-green-500 font-poppins font-bold">
      {{ successMessage }}
    </span>
    <span v-if="errorMessage" class="text-red-500 font-poppins font-bold">
      {{ errorMessage }}
    </span>
  </PageSection>
  <Transition>
    <PageSection v-if="showForm">
      <Form
        size="large"
        :model="categoryModel"
        :rules="categoryRules"
        ref="formState"
      >
        <div class="w-[50%]">
          <FormItem path="name" :show-require-mark="false">
            <template #label>
              <span class="font-poppins font-bold">
                Insert the name of the new category:
              </span>
            </template>
            <div class="flex flex-1 items-center gap-x-6">
              <Input
                v-model:value="categoryModel.name"
                placeholder="Enter the name of the category"
                :on-update-value="onUpdate"
              >
                <template #prefix>
                  <Icon:mdi:tag class="w-5 h-5 text-gray-400" />
                </template>
              </Input>

              <Button
                text="Create"
                type="none"
                class="bg-green-500 hover:bg-green-600 font-poppins"
                :class="{
                  'bg-green-500 hover:bg-green-600': isValidForm,
                  'bg-gray-400 cursor-not-allowed':
                    !isValidForm || categoryModel.name.length === 0,
                }"
                @click="
                  () => {
                    if (isValidForm) {
                      createCategory()
                    }
                  }
                "
              />
            </div>
          </FormItem>
        </div>
      </Form>
    </PageSection>
  </Transition>
  <PageSection>
    <DataCategoriesTable :key="data_categories" @onDelete="reload" />
  </PageSection>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
