<script lang="ts" setup>
import {
  NModal as Modal,
  NCard as Card,
  NForm as Form,
  NFormItem as FormItem,
  NInput as Input,
} from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'

const { t } = useLang() // for use some internationalization

/**
 * Define the page meta
 */
definePageMeta({
  title: 'Measure Types',
  layout: 'dashboard',
  middleware: ['auth'],
})

/**
 * Define the page head
 */
useHead(() => ({
  title: capitalize(t('pages.measure.title')),
}))

// showModal is a reactive variable, if false, the modal is not shown
const showModal = ref(false)

// data_measure is a key, so when a key is changed, the componet is re-rendered :)
const data_measure = ref(0)

// modal form stuff :)
const formState = ref<FormInst | null>(null)
const isValidForm = useState('isValidForm', (): boolean | undefined => {
  return undefined
})

// this model is how the data is required to be sent to the server
const measureModel = useState('measure', () => {
  return {
    name: '',
    abbreviation: '',
    description: '',
  }
})

/** Some regex lol
 *
 */

// only letters
const lettersOnly = new RegExp('^[a-zA-Z]+$')

// regex to validate measure description, allow spaces, numbers and letters
const measureDescriptionRegex = new RegExp('^[a-zA-Z0-9 ]+$')

// measure form rules
const measureRules: FormRules = {
  name: [
    {
      required: true,
      validator(_: any, value: string) {
        if (!value) {
          return new Error('The name cannot be empty')
        } else if (!lettersOnly.test(value)) {
          return new Error('Enter a valid measure name')
        }
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  abbreviation: [
    {
      required: true,
      validator(_: any, value: string) {
        if (!value) {
          return new Error('The abbreviation cannot be empty')
        } else if (!lettersOnly.test(value)) {
          return new Error('Enter a valid measure abbreviation')
        }
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],

  description: [
    {
      required: true,
      validator(_: any, value: string) {
        if (!value) {
          return new Error('The description cannot be empty')
        } else if (!measureDescriptionRegex.test(value)) {
          return new Error('Enter a valid measure description')
        }
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
}

/**
 * Functions and callbacks
 */

// simple function to reload the data by incrementing the key
const reload = () => {
  data_measure.value++
}

/**
 * This function is called when the form is updated. Will check the form with regex and set the isValidForm
 * variable to enable or disable the submit button
 */
const onUpdate = () => {
  if (
    measureModel.value.name.match(lettersOnly) &&
    measureModel.value.abbreviation.match(lettersOnly) &&
    measureModel.value.description.match(measureDescriptionRegex)
  ) {
    isValidForm.value = true
  } else {
    isValidForm.value = false
  }
}

// simple clear form function
const clearForm = () => {
  measureModel.value.name = ''
  measureModel.value.abbreviation = ''
  measureModel.value.description = ''
}

// ref to an error message
const errorMessage = ref('') // if the server returns an error, it will be shown here
const createSuccessMessage = ref('') // if measure is created successfully, we show this message

const data = ref<any>([]) // data from the server

const createMeasure = async () => {
  const response = await fetch('/api/measure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(measureModel.value),
  })
  if (response) {
    data.value = await response.json()
    if (data.value.status >= 400) {
      // if we get an error from the server
      errorMessage.value = data.value.message
      clearForm()
      setTimeout(() => {
        errorMessage.value = ''
      }, 3000)
    } else {
      // if not, ok... passed:)
      createSuccessMessage.value = 'Measure created successfully'
      clearForm()
      reload() // data reloaded
      showModal.value = false
      setTimeout(() => {
        createSuccessMessage.value = ''
      }, 5000) // clear the message after 5 seconds
    }
  }
}
</script>

<template>
  <PageHeader>
    <PageTitle
      :text="$t('pages.measure.header')"
      class="font-whitney capitalize"
    />
    <span class="text-gray-400 font-poppins text-[11pt]">
      {{ capitalizeFirst($t('pages.measure.description')) }}
    </span>
  </PageHeader>
  <PageSection>
    <div class="flex gap-x-4 items-center">
      <Button type="primary" @click="showModal = !showModal">
        Create new measure
      </Button>
    </div>
    <span class="flex text-green-500 font-poppins mt-2 font-bold">
      {{ createSuccessMessage }}
    </span>
    <Modal v-model:show="showModal">
      <PageBody>
        <Card
          closable
          :on-close="
            () => {
              showModal = !showModal
            }
          "
          class="rounded-md"
          header-style="border-bottom: 1px solid #e5e7eb; padding: .75rem .80rem;"
          content-style="padding: .75rem .80rem;"
        >
          <template #header>
            <div class="flex flex-col w-[90%]">
              <span class="font-whitney font-bold font-md">
                Add new measure
              </span>
              <span class="font-poppins text-gray-400 text-[13px]">
                To add a new measure, please fill the following inputs with data
                required.
              </span>
            </div>
          </template>
          <span>Please, enter information in the next fields: </span>
          <div class="mt-2">
            <Form
              size="large"
              :model="measureModel"
              :rules="measureRules"
              ref="formState"
            >
              <div class="flex justify-between gap-x-3">
                <FormItem path="name" class="flex-1">
                  <template #label>
                    <span class="font-poppins text-gray-400 text-sm font-bold">
                      Measure name
                    </span>
                  </template>
                  <Input
                    v-model:value="measureModel.name"
                    :on-update-value="onUpdate"
                    placeholder="Enter the name, piece, pounds, etc"
                  />
                </FormItem>

                <FormItem path="abbreviation">
                  <template #label>
                    <span class="font-poppins text-gray-400 text-sm font-bold">
                      Measure abbreviation
                    </span>
                  </template>
                  <Input
                    v-model:value="measureModel.abbreviation"
                    :on-update-value="onUpdate"
                    placeholder="pcs, kgs, lb"
                  />
                </FormItem>
              </div>

              <div class="mt-2">
                <FormItem path="description">
                  <template #label>
                    <span class="font-poppins text-gray-400 text-sm font-bold">
                      Measure description
                    </span>
                  </template>
                  <Input
                    v-model:value="measureModel.description"
                    :on-update-value="onUpdate"
                    placeholder="Provide a valid description for your measure"
                    type="textarea"
                  />
                </FormItem>
              </div>
            </Form>
            <span class="text-red-500 font-poppins text-sm">
              {{ errorMessage }}
            </span>
            <Button
              type="primary"
              class="mt-4"
              @click="
                () => {
                  formState?.validate(async (errors) => {
                    if (!errors) {
                      await createMeasure()
                    }
                  })
                }
              "
              :class="{
                'cursor-not-allowed opacity-40': !isValidForm,
                'cursor-pointer': isValidForm,
              }"
            >
              Create measure
            </Button>
          </div>
        </Card>
      </PageBody>
    </Modal>
  </PageSection>
  <PageSection>
    <LazyDataMeasureType :key="data_measure" @onDelete="reload" />
  </PageSection>
</template>

<style scoped></style>
