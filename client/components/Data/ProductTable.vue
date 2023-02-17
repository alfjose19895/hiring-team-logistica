<script lang="ts" setup>
import { h } from 'vue'
import {
  NDataTable as DataTable,
  DataTableColumns,
  NInput as Input,
  NInputNumber as InputNumber,
  NSelect as Select,
  NSwitch as Switch,
} from 'naive-ui'
import type { PaginationProps } from 'naive-ui'
import { RowData } from 'naive-ui/es/data-table/src/interface'
// icons
import IconTrash from '~icons/ic/round-delete'
import IconEdit from '~icons/ic/round-edit'
import IconSend from '~icons/ic/round-send'
import IconView from '~icons/ic/outline-remove-red-eye'
// stores
import { useCategoriesStore } from '~~/stores/categories'
import { useMeasurementsStore } from '~~/stores/measurements'
import { storeToRefs } from 'pinia'

const { categories } = storeToRefs(useCategoriesStore())
const { measurements } = storeToRefs(useMeasurementsStore())
const { getCategories } = useCategoriesStore()
const { getMeasures } = useMeasurementsStore()

interface Product {
  id: number
  code: string
  name: string
  in_stock: boolean
  created_at: string
  updated_at: string
  category: any
  measure_type: any
  quantity: any
  measures: any
}

// instance of data table
const dataTableInstance = ref(0)

const { data } = await useFetch<Product[]>('/api/products', {
  onResponse({ response }) {
    if (response.ok) {
      if (response._data.length > 0) {
        response._data.forEach((item: Product) => {
          item.name = item.name
          item.category = item.category.name
          item.created_at = new Date(item.created_at).toLocaleString()
          item.updated_at = new Date(item.updated_at).toLocaleString()
          item.in_stock = item.in_stock
          item.measures = item.measures.cost
        })
      } else {
        response._data = []
      }
    }
    return
  },
  mode: 'no-cors',
})

// group data by 'category'
const groupData = computed(() => {
  const groupedData = data.value?.reduce((acc: any, item: any) => {
    const key = item.category
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {})
  return groupedData
})

// categories options

const categoriesOptions = computed(() => {
  return categories.value.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
})

// measure options

const measureOptions = computed(() => {
  return measurements.value.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
})

/**
 * Data table fields
 */

const createColumns = ({
  play,
  delete: deleteRow,
  edit,
}: {
  play: (row: Product) => void
  delete: (row: Product) => void
  edit: (row: Product) => void
}): DataTableColumns<Product> => {
  return [
    // ID probably not needed to show, because it's not editable and it's four internal usage 🤔
    /*{
      title: 'ID',
      key: 'id',
      defaultSortOrder: 'descend',
    },*/
    {
      title: 'Product code',
      key: 'code',
      align: 'center',
      render(row: Product, index) {
        // if row and productAboutToEdit are the same, show the input
        /*if (productAboutEdit.value && productAboutEdit.value.id === row.id) {
          return h(Input, {
            onKeyup: (e: KeyboardEvent) => {
              if (e.key === 'Escape') {
                editMode.value = false
                productAboutEdit.value = [] as any
              }
            },
            value: productAboutEdit.value.code,
            onUpdateValue: (value: string) => {
              productAboutEdit.value!.code = value
            },
          })
        } else {
          return h(
            'div',
            {
              class:
                'text-sm font-mono font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-center',
            },
            row.code
          )
        }*/
        return h(
          'div',
          {
            class:
              'text-sm font-mono font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-center',
          },
          row.code
        )
      },
    },
    {
      title: 'Product Name',
      key: 'name',
      resizable: true,
      render(row: Product, index) {
        // if row and productAboutToEdit are the same, show the input
        if (productAboutEdit.value && productAboutEdit.value.id === row.id) {
          return h(Input, {
            onKeyup: (e: KeyboardEvent) => {
              if (e.key === 'Escape') {
                editMode.value = false
                productAboutEdit.value = [] as any
              }
            },
            value: productAboutEdit.value.name,
            onUpdateValue: (value: string) => {
              productAboutEdit.value!.name = value
            },
          })
        } else {
          return h(
            'span',
            {
              class: 'text-sm',
            },
            row.name
          )
        }
      },
    },
    {
      title: 'Category',
      key: 'category',
      align: 'center',
      render(row: Product) {
        // if row and productAboutToEdit are the same, show the input
        if (productAboutEdit.value && productAboutEdit.value.id === row.id) {
          return h(Select, {
            value: productAboutEdit.value.category,
            onUpdateValue: (value: string) => {
              productAboutEdit.value!.category = value
            },
            options: categoriesOptions.value,
          })
        } else {
          return h(
            'span',
            {
              class: 'text-sm',
            },
            row.category
          )
        }
      },
      sorter: (a: Product, b: Product) => {
        return a.category.localeCompare(b.category)
      },
    },
    {
      title: 'Measure type',
      key: 'measure_type',
      align: 'center',
      sorter: (a: Product, b: Product) => {
        return a.measure_type.localeCompare(b.measure_type)
      },
      render(row: Product) {
        // if row and productAboutToEdit are the same, show the input
        if (productAboutEdit.value && productAboutEdit.value.id === row.id) {
          return h(Select, {
            value: productAboutEdit.value.measure_type,
            onUpdateValue: (value: string) => {
              productAboutEdit.value!.measure_type = value
            },
            options: measureOptions.value,
          })
        } else {
          return h(
            'span',
            {
              class: 'text-sm',
            },
            row.measure_type
          )
        }
      },
    },
    {
      title: 'In stock?',
      key: 'in_stock',
      render(row: Product) {
        if (productAboutEdit.value && productAboutEdit.value.id === row.id) {
          return h(Switch, {
            value: productAboutEdit.value.in_stock as boolean,
            onUpdateValue: (value: boolean) => {
              productAboutEdit.value!.in_stock = value
            },
          })
        } else {
          return h(
            'span',
            {
              class: `text-sm font-bold px-2 py-1 rounded-full ${
                row.in_stock ? 'bg-green-100 text-green-800' : 'text-red-800'
              }`,
            },
            row.in_stock ? 'Yes' : 'No'
          )
        }
      },
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render(row: Product) {
        if (productAboutEdit.value && productAboutEdit.value.id === row.id) {
          // @ts-expect-error
          return h(InputNumber, {
            // ☝🏽 cause and unknown error, but this works pretty fine
            class: 'w-24',
            placeholder: 'Quantity',
            value: productAboutEdit.value.quantity,
            onUpdateValue: (value: number) => {
              productAboutEdit.value!.quantity = value
            },
          })
        } else {
          return h(
            'span',
            {
              class: `text-sm font-bold px-2 py-1 rounded-full ${
                row.quantity > 40
                  ? 'bg-green-200 dark:text-gray-800 text-green-800'
                  : row.quantity > 20 && row.quantity < 40 // 20 < x < 40
                  ? 'bg-yellow-500 text-gray-200'
                  : 'bg-red-300 text-red-800'
              }}`,
            },
            row.quantity
          )
        }
      },
      align: 'center',
    },
    {
      title: 'Price',
      key: 'measures',
      align: 'center',
      render(row: Product) {
        if (productAboutEdit.value && productAboutEdit.value.id == row.id) {
          // @ts-expect-error
          return h(InputNumber, {
            class: 'w-22',
            placeholder: 'Price',
            value: productAboutEdit.value.measures,
            onUpdateValue: (value: number) => {
              productAboutEdit.value!.measures = value
            },
          })
        } else {
          return h(
            'span',
            {
              class: `text-sm font-inter font-bold ${
                row.measures > 40
                  ? 'text-green-300'
                  : row.measures > 20 && row.measures < 40 // 20 < x < 40
                  ? 'text-yellow-800'
                  : 'text-red-600'
              }`,
            },
            `${formatMoney(row.measures)}`
          )
        }
      },
    },
    /*{
      title: 'Created at',
      key: 'created_at',
      render(row: Product) {
        return h('span', { class: 'text-gray-400' }, row.created_at)
      },
      align: 'center',
    },*/
    {
      title: 'Actions',
      key: 'actions',
      render(row: Product) {
        return h(
          'div',
          {
            class: 'flex justify-center items-center gap-x-2',
          },
          [
            h(IconTrash, {
              class:
                'font-inter text-red-500 hover:text-red-700 cursor-pointer',
              type: 'none',
              onClick: () => {
                deleteRow(row)
              },
            }),

            h(IconEdit, {
              class: `font-inter text-primary-500 hover:text-primary-700 cursor-pointer ${
                productAboutEdit.value != row && editMode ? 'flex' : 'hidden'
              }`,
              type: 'none',
              onClick: () => {
                userWantToEdit(row)
              },
            }),

            h(IconSend, {
              class: `font-inter text-green-500 hover:text-green-700 cursor-pointer ${
                productAboutEdit.value == row ? 'flex' : 'hidden'
              }`,
              type: 'none',
              onClick: () => {
                play(row)
              },
            }),

            h(IconView, {
              class: `font-inter text-blue-500 hover:text-blue-700 cursor-pointer`,
              type: 'none',
              onClick: () => {
                if (
                  productSelected.value &&
                  productSelected.value.id == row.id
                ) {
                  productSelected.value = null
                } else {
                  productSelected.value = row
                }
              },
            }),
          ]
        )
      },
      align: 'center',
    },
  ]
}

// Refs to reference the data, and then use it in the request
const productAboutDelete = ref<Product | null>(null)
const productAboutEdit = ref<Product>()
const productSelected = ref<Product | null>(null)

// ref to render an alternative view filtered by category
const byCategory = ref(false) // toggle to filter by category

// if user is editing a product
const editMode = ref(false) // toggle to edit a product

// Methods to handle the actions (we format the data before send it to the API)

const userWantToEdit = (row: Product) => {
  editMode.value = true
  productAboutEdit.value = row
  // get the category id by the name
  const category = categories.value?.find(
    (category) => category.name == row.category
  )
  productAboutEdit.value!.category = category?.id
  // get the measure type id by the name
  const measureType = measurements.value?.find(
    (measureType) => measureType.name == row.measure_type
  )
  productAboutEdit.value!.measure_type = measureType?.id
  emit('onEdit', row)
}

// Emits to pass actions to the parent component
const emit = defineEmits(['onDelete', 'onEdit', 'onUpdate'])

// Columns props to play with rows
const columns = createColumns({
  play: async (row: Product) => {
    await updateField()
  },
  delete: async (row: Product) => {
    productAboutDelete.value = row
    await deleteField()
  },
  edit: (row: Product) => {
    userWantToEdit(row)
  },
})

// Pagination props
const pagination = ref<PaginationProps | false>({
  pageSize: 20,
})

// Function for delete a row
const deleteField = async () => {
  const response = await useFetch('/api/products', {
    method: 'DELETE',
    params: {
      id: productAboutDelete.value?.id,
    },
  })
  if (response.data?.value.status === 204) {
    emit('onDelete')
  }
}

// Function to update a row
const updateField = async () => {
  const response = await useFetch('/api/products', {
    method: 'PUT',
    params: {
      id: productAboutEdit.value?.id,
    },
    body: JSON.stringify(productAboutEdit.value),
  })
  if (response.data?.value.status === 200) {
    emit('onUpdate')
  }
}

const categoryOptions = ref<any[]>([])
// Fetch data before mount the component => we use the async/await syntax
onBeforeMount(async () => {
  await getCategories()
  await getMeasures()

  // map the categories to the SelectableOptions component
  categoryOptions.value = categories.value.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
})

// Styling for the table
const formatMoney = (value: number) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="font-walsheim text-2xl font-bold">Your products 😊</h2>
      <div>
        <span class="font-poppins font-bold text-gray-400 tracking-wider">
          Sort by category?
        </span>
        <Switch v-model:value="byCategory" class="ml-2" size="small" />
      </div>
    </div>
  </div>
  <span class="font-walsheim text-gray-400">
    {{
      data?.length === 0
        ? 'There are no products created yet 😥'
        : `You have ${data?.length} products created at the moment.`
    }}
  </span>
  <div v-if="!byCategory">
    <DataTable
      :columns="columns"
      size="small"
      class="font-inter mt-2"
      :data="(data as RowData[])"
    />
  </div>

  <ul v-else>
    <li v-for="item in Object.keys(groupData)" class="mt-2">
      <span class="font-bold text-gray-400 font-inter text-lg">{{ item }}</span>
      <ul>
        <DataTable
          :columns="columns"
          size="small"
          class="font-inter"
          :data="(groupData[item] as RowData[])"
        />
      </ul>
    </li>
  </ul>
  <div v-if="editMode" class="flex flex-col leading-5">
    <span class="text-red-400 font-walsheim">
      * Note that you are not allowed to edit de Product code, because it is
      supposed to be unique field. If you are not satisfied with the code, you
      can delete the product and create a new one.
    </span>
    <span class="font-walsheim text-gray-400 leading-4">
      If you want to cancel edition, press
      <span class="font-bold">ESC</span> while you are on the input to cancel,
      or
    </span>
    <Button
      class="mt-2 w-[15%]"
      type="secondary"
      @click="() => {
        editMode = false
        productAboutEdit = [] as any
      }"
    >
      Cancel edit
    </Button>
  </div>
  <div v-if="productSelected" class="flex flex-col">
    <span class="font-bold font-walsheim text-gray-400 text-lg">
      Product information
    </span>
    <div class="flex gap-x-2">
      <span class="font-poppins text-gray-600 font-bold"> Product name: </span>
      <span class="font-poppins text-gray-400">
        {{ productSelected.name }}
        -
        {{
          `(${productSelected.quantity} ${
            productSelected.measure_type
          } x ${formatMoney(productSelected.measures)}) = ~ ${formatMoney(
            productSelected.quantity * productSelected.measures
          )} USD total cost`
        }}
      </span>
    </div>
    <div class="flex gap-x-2">
      <span class="font-poppins text-gray-600 font-bold"> Created at: </span>
      <span class="font-poppins text-gray-400"
        >{{ productSelected.created_at }}
      </span>
    </div>
    <div class="flex gap-x-2">
      <span class="font-poppins text-gray-600 font-bold">
        Last update was at:
      </span>
      <span class="font-poppins text-gray-400"
        >{{ productSelected.updated_at }}
      </span>
    </div>
  </div>
</template>
