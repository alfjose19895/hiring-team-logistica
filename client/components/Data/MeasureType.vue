<script lang="ts" setup>
import { h } from 'vue'
import { NDataTable as DataTable, DataTableColumns } from 'naive-ui'
import Button from '../Button.vue'
import type { PaginationProps } from 'naive-ui'

import { useMeasurementsStore } from '~~/stores/measurements'
import { storeToRefs } from 'pinia'

const { getMeasures } = useMeasurementsStore()
const { measurements } = storeToRefs(useMeasurementsStore())

onBeforeMount(async () => {
  await getMeasures()
  await getMeasurements()
  measures.value.forEach((item) => {
    item.name = item.name
    item.created_at = new Date(item.created_at).toLocaleString()
  })
})

interface MeasureType {
  id: number
  name: string
  abbreviation: string
  description: string
  created_at: string
}

const emit = defineEmits(['onDelete'])
const measures = ref<MeasureType[]>([])

const getMeasurements = async () => {
  const response = await useFetch('/api/measure')
  if (response.data.value.status >= 400) {
    resultMessage.value = response.data.value.message
    setTimeout(() => {
      resultMessage.value = ''
    }, 3000)
  } else {
    measures.value = await response.data.value
  }
}

const measureAboutDelete = ref<MeasureType | null>(null)

const deleteField = async () => {
  const response = await useFetch('/api/measure', {
    method: 'DELETE',
    params: {
      id: measureAboutDelete.value?.id,
    },
  })
  if (response.data.value.status >= 400) {
    resultMessage.value = response.data.value.message
    setTimeout(() => {
      resultMessage.value = ''
    }, 3000)
  } else {
    resultMessage.value = 'Measure type deleted successfully'
    setTimeout(() => {
      resultMessage.value = ''
    }, 3000)
    measurements.value = await response.data.value
    emit('onDelete')
  }
}

const resultMessage = ref<string | null>(null)

const createColumns = ({
  play,
}: {
  play: (row: MeasureType) => void
}): DataTableColumns<MeasureType> => {
  return [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Abbreviation',
      key: 'abbreviation',
    },
    {
      title: 'Description',
      key: 'description',
    },
    {
      title: 'Date',
      key: 'created_at',
      sorter: (a, b) => {
        return a.created_at.localeCompare(b.created_at)
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render(row) {
        return h(
          Button,
          {
            size: 'xs',
            type: 'none',
            class: 'bg-red-500 text-white',

            onClick: () => play(row),
          },
          {
            default: () => 'Delete',
          }
        )
      },
    },
  ]
}

const columns = createColumns({
  play: (row: MeasureType) => {
    measureAboutDelete.value = row
    deleteField()
  },
})
const pagination = ref<PaginationProps | false>({
  pageSize: 20,
})
</script>

<template>
  <span class="font-inter text-green-500 font-bold">{{ resultMessage }}</span>
  <div>
    <span class="font-walsheim text-gray-400">
      There are
      <span class="text-primary-500 font-bold">{{ measures?.length }}</span>
      measure types created that you can use with your products.
    </span>
    <DataTable :columns="columns" class="font-inter mt-" :data="measures" />
  </div>
</template>
