<script lang="ts" setup>
import {
  NCard as Card,
  NForm as Form,
  NFormItem as FormItem,
  NInput as Input,
  NSwitch as Switch,
  NSelect as SelectableOptions,
  NInputNumber as InputNumber,
  NDivider as Divider,
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { FormInst, FormRules } from 'naive-ui'

import { useMeasurementsStore } from '~~/stores/measurements'
import { useCategoriesStore } from '~~/stores/categories'

const { getMeasures } = useMeasurementsStore()
const { measurements } = storeToRefs(useMeasurementsStore())

const { getCategories } = useCategoriesStore()
const { categories } = storeToRefs(useCategoriesStore())

// emit a cancel button click event
const emit = defineEmits(['cancel', 'create', 'updateTable'])

// function called when press cancel button
const cancel = () => {
  emit('cancel')
}

const measureOptions = ref<any[]>([])
const categoryOptions = ref<any[]>([])

onBeforeMount(async () => {
  await getMeasures()
  await getCategories()
  // map the measurements to the SelectableOptions component
  measureOptions.value = measurements.value.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  // map the categories to the SelectableOptions component
  categoryOptions.value = categories.value.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
})

// form state
const formState = ref<FormInst | null>(null)

// model for the form to create a new product
const productModel = useState('product', () => {
  return {
    code: '',
    name: '',
    in_stock: false,
    quantity: 0,
    category_id: 0,
    type_measure: 0,
    cost: 0,
    weight: 0,
    volume: 0,
    width: 0,
    height: 0,
    depth: 0,
  }
})

const productRules: FormRules = {
  code: [
    {
      required: true,
      validator(_: any, value: string) {
        if (value.length < 3) {
          return new Error('The code must be at least 3 characters long')
        } else if (value.length > 15) {
          return new Error('The code must be at most 15 characters long')
        } else if (!value.match(/^[a-zA-Z0-9-]+$/)) {
          return new Error('The code must be alphanumeric')
        }

        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  name: [
    {
      required: true,
      validator(_: any, value: string) {
        if (value.length < 3) {
          return new Error('The name must be at least 3 characters long')
        } else if (value.length > 50) {
          return new Error('The name must be at most 50 characters long')
        } else if (!value.match(/^[a-zA-Z0-9 ]+$/)) {
          return new Error('The name must be alphanumeric')
        }

        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  category_id: [
    {
      required: true,
      validator(_: any, value: number) {
        if (value === 0) {
          return new Error('Please, select a category')
        }

        return true
      },
      trigger: ['blur', 'change'],
    },
  ],
  measure_id: [
    {
      required: true,
      validator(_: any, value: number) {
        if (value === 0) {
          return new Error('Please, select a measure')
        }

        return true
      },
      trigger: ['blur', 'change'],
    },
  ],
  quantity: [
    {
      required: true,
      validator(_: any, value: number) {
        if (productModel.value.in_stock === false) {
          return true
        } else {
          if (value < 1) {
            return new Error('The quantity must be greater than 0')
          }
        }
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  cost: [
    {
      required: true,
      validator(_: any, value: number) {
        if (value <= 0) {
          return new Error('The cost must be greater than 0')
        } else return true
      },
      trigger: ['input', 'blur'],
    },
  ],
}

const clearForm = () => {
  productModel.value.code = ''
  productModel.value.name = ''
  productModel.value.in_stock = false
  productModel.value.quantity = 0
  productModel.value.category_id = 0
  productModel.value.type_measure = 0
  productModel.value.cost = 0
  productModel.value.weight = 0
  productModel.value.volume = 0
  productModel.value.width = 0
  productModel.value.height = 0
  productModel.value.depth = 0
}

const data = ref<any>([])
const errorMessage = ref('')
const successMessage = ref('')

// function to create a new product
const createProduct = async () => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productModel.value),
  })
  if (response.ok) {
    data.value = await response.json()
    if (data.value.status >= 400) {
      errorMessage.value = data.value.message
      setTimeout(() => {
        errorMessage.value = ''
      }, 3000)
    } else {
      emit('updateTable')
      successMessage.value = 'Product created successfully'

      setTimeout(() => {
        successMessage.value = ''
        emit('create')
      }, 900)
      clearForm()
    }
  }
}
</script>

<template>
  <Card>
    <template #header>
      <h3 class="text-xl font-bold text-gray-900 font-whitney">
        Create new product
      </h3>
    </template>
    <Form
      size="large"
      :model="productModel"
      :rules="productRules"
      ref="formState"
    >
      <div class="md:grid grid-cols-2 gap-x-6">
        <div>
          <div class="flex gap-x-2">
            <FormItem label="Code" path="code">
              <Input
                placeholder="Enter a product code"
                v-model:value="productModel.code"
              />
            </FormItem>
            <FormItem label="Category" class="flex-1" path="category_id">
              <SelectableOptions
                placeholder="Select a product category"
                :options="categoryOptions"
                v-model:value="productModel.category_id"
              />
            </FormItem>
          </div>
          <FormItem label="Name" path="name">
            <Input
              placeholder="Name your product"
              v-model:value="productModel.name"
            />
          </FormItem>
          <FormItem label="Measurement" path="measure_id">
            <SelectableOptions
              placeholder="Please, select a measure for your product"
              :options="measureOptions"
              v-model:value="productModel.type_measure"
            />
          </FormItem>
          <span
            :class="{
              'text-red-500': errorMessage,
              'text-green-500': successMessage,
            }"
            class="font-inter font-bold"
          >
            {{ errorMessage || successMessage }}
          </span>
        </div>
        <div>
          <div class="flex items-center gap-x-6 md:grid grid-cols-3">
            <FormItem label="Has stock?">
              <Switch v-model:value="productModel.in_stock" />
            </FormItem>
            <FormItem label="Quantity" class="flex-1" path="quantity">
              <InputNumber
                :disabled="!productModel.in_stock"
                placeholder="Set the quantity"
                v-model:value="productModel.quantity"
              />
            </FormItem>
            <FormItem label="Cost per unit" class="flex-1" path="cost">
              <InputNumber
                placeholder="Set the cost per unit"
                v-model:value="productModel.cost"
              >
                <template #prefix> $ </template>
              </InputNumber>
            </FormItem>
          </div>
          <Divider>
            <span class="font-poppins text-gray-400"> Product measures </span>
          </Divider>
          <div class="flex gap-x-3">
            <FormItem label="Weight">
              <InputNumber
                placeholder="Weight"
                v-model:value="productModel.weight"
              >
                <template #suffix> kg </template>
              </InputNumber>
            </FormItem>

            <FormItem label="Volume">
              <InputNumber
                placeholder="Volume"
                v-model:value="productModel.volume"
              >
                <template #suffix> cm³ </template>
              </InputNumber>
            </FormItem>
          </div>

          <div class="md:grid grid-cols-3 gap-x-3">
            <FormItem label="Width">
              <InputNumber
                placeholder="Width"
                v-model:value="productModel.width"
              >
                <template #suffix> cm </template>
              </InputNumber>
            </FormItem>
            <FormItem label="Height">
              <InputNumber
                placeholder="Height"
                v-model:value="productModel.height"
              >
                <template #suffix> cm </template>
              </InputNumber>
            </FormItem>
            <FormItem label="Depth">
              <InputNumber
                placeholder="Depth"
                v-model:value="productModel.depth"
              >
                <template #suffix> cm </template>
              </InputNumber>
            </FormItem>
          </div>
        </div>
      </div>
    </Form>

    <template #footer>
      <div class="flex justify-end gap-x-2">
        <Button type="secondary" @click="cancel()">Cancel</Button>
        <Button
          type="primary"
          @click="
            () => {
              formState?.validate(async (errors) => {
                if (!errors) {
                  await createProduct()
                }
              })
            }
          "
        >
          Create
        </Button>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 0.5rem;
  margin-bottom: 0.35rem;
}
</style>
