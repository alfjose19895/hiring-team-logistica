<script lang="ts" setup>
import { NDataTable as DataTable, DataTableColumns } from 'naive-ui'
import type { PaginationProps } from 'naive-ui'
import { RowData } from 'naive-ui/es/data-table/src/interface'
import Button from '../Button.vue'

interface CategoryType {
  id: number
  name: string
  created_at: string
}

const { data } = await useFetch<CategoryType[]>('/api/categories', {
  onResponse({ response }) {
    if (response.ok) {
      response._data.forEach((item: CategoryType) => {
        item.name = item.name
        item.created_at = new Date(item.created_at).toLocaleString()
      })
    }
  },
  mode: 'no-cors',
})

/**
 * Data table fields
 */
const createColumns = ({
  play,
}: {
  play: (row: CategoryType) => void
}): DataTableColumns<CategoryType> => {
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
      title: 'Created at',
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

const categoryAboutDelete = ref<CategoryType | null>(null)
const emit = defineEmits(['onDelete'])

const deleteCategory = async () => {
  const response = await useFetch('/api/categories', {
    method: 'DELETE',
    params: {
      id: categoryAboutDelete.value?.id,
    },
  })
  if (response.data) {
    emit('onDelete')
  }
}

const columns = createColumns({
  play: (row: CategoryType) => {
    categoryAboutDelete.value = row
    deleteCategory()
  },
})
const pagination = ref<PaginationProps | false>({
  pageSize: 20,
})
</script>

<template>
  <span class="font-walsheim text-gray-400">
    There are
    <span class="text-primary-500 font-bold">{{ data?.length }}</span>
    categories created that you can use to categorize your products.
  </span>
  <DataTable
    :columns="columns"
    class="font-inter mt-2"
    :data="(data as RowData[])"
  />
</template>

<style scoped></style>
