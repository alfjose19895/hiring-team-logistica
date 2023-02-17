<script lang="ts" setup>
import { h } from 'vue'
import { NDataTable as DataTable, DataTableColumns } from 'naive-ui'

import { useMeasurementsStore } from '~~/stores/measurements'
import { useCategoriesStore } from '~~/stores/categories'

const { getMeasureNameById } = useMeasurementsStore()
const { getCategoryNameById } = useCategoriesStore()

interface ProductHistory {
  id: number
  created_at: string
  action: string
  product_name: string
  product: any
  quantity_id: number
  category_id: number
  category_name: string
  measure: string
  type_measurement_id: number
}

const props = defineProps({
  data: {
    type: Array<any>(),
    required: true,
  },
})

// Map the data to the table before rendering
const data = computed(() => {
  return props.data.map((item: ProductHistory) => {
    item.created_at = new Date(item.created_at).toLocaleString()
    item.product_name = item.product.name
    item.measure = getMeasureNameById(item.type_measurement_id)
    item.category_name = getCategoryNameById(item.category_id) as string
    return item
  })
})

// Data fields

/**
 * Data table fields
 */
const createColumns = ({
  play,
}: {
  play: (row: ProductHistory) => void
}): DataTableColumns<ProductHistory> => {
  return [
    {
      title: 'Product',
      key: 'product_name',
    },
    {
      title: 'Measure',
      key: 'measure',
    },
    {
      title: 'Category',
      key: 'category_name',
    },
    {
      title: 'Action',
      key: 'action',
      render(row) {
        return h('span', { class: 'text-green-500' }, row.action)
      },
    },
    {
      title: 'Last updated',
      key: 'created_at',
    },
  ]
}

const columns = createColumns({
  play: (row: ProductHistory) => {},
})
</script>

<template>
  <div class="flex flex-col" v-if="data.length > 0">
    <span class="font-poppins font-bold">
      {{ data[0].product.code }}
    </span>
    <span class="text-bold font-poppins text-gray-400 font-semibold">
      {{ data.length }} {{ data.length > 1 ? 'results' : 'result' }}
    </span>
  </div>
  <DataTable v-if="data.length > 0" :columns="columns" :data="data" />
</template>

<style scoped></style>
