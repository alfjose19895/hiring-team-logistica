<script lang="ts" setup>
import { h } from 'vue'
import { NDataTable as DataTable, DataTableColumns, NButton } from 'naive-ui'
import Button from '../Button.vue'
import type { PaginationProps } from 'naive-ui'

interface MeasureType {
  id: number
  name: string
  abbreviation: string
  description: string
  created_at: string
}

const emit = defineEmits(['onDelete'])

const { pending, data, execute, error } = await useFetch<MeasureType[]>(
  '/api/measure',
  {
    onResponse({ response }) {
      if (response.ok) {
        response._data.forEach((item: MeasureType) => {
          item.name = item.name
          item.created_at = new Date(item.created_at).toLocaleString()
        })
      }
    },
    mode: 'no-cors',
  }
)

const measureAboutDelete = ref<MeasureType | null>(null)

const deleteField = async () => {
  const response = await useFetch('/api/measure', {
    method: 'DELETE',
    params: {
      id: measureAboutDelete.value?.id,
    },
  })
  if (response.data) {
    resultMessage.value = 'Deleted successfully'
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
      title: 'ID',
      key: 'id',
      defaultSortOrder: 'descend',
    },
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
  <div v-if="!data">
    <DataTable
      :columns="columns"
      class="font-inter mt-2"
      :pagination="pagination"
    />
  </div>

  <div v-else>
    <span class="font-walsheim text-gray-400">
      There are
      <span class="text-primary-500 font-bold">{{ data?.length }}</span>
      measure types created that you can use with your products.
    </span>
    <DataTable :columns="columns" class="font-inter mt-" :data="data" />
  </div>
</template>

<style scoped></style>
