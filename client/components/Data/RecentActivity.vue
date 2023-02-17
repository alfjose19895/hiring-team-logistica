<script lang="ts" setup>
import { NDataTable as DataTable, DataTableColumns } from 'naive-ui'
import type { PaginationProps } from 'naive-ui'

interface RecentActivity {
  id: number
  username: string
  email: string
  activity: string
  type: string
  ip: string
  created_at: string
}

const { pending, data, execute, error } = await useFetch<RecentActivity[]>(
  '/api/activities',
  {
    onResponse({ response }) {
      // format the 'date' field
      response._data.forEach((item: RecentActivity) => {
        item.username = `${item.username} (${item.email})`
        item.created_at = new Date(item.created_at).toLocaleString()
        //item.success = item.success ? 'Yes' : 'No'
        //item.reason_if_failed = item.reason_if_failed || 'N/A'
      })
    },
    mode: 'no-cors',
  }
)
watch(
  () => data,
  (newVal) => {
    console.log(newVal)
  }
)

const createColumns = ({
  play,
}: {
  play: (row: any) => void
}): DataTableColumns<any> => {
  return [
    {
      title: 'ID',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: 'Credentials',
      key: 'username',
    },
    {
      title: 'Description',
      key: 'activity',
    },
    {
      title: 'Type',
      key: 'type',
    },
    {
      title: 'From IP',
      key: 'ip',
    },

    {
      title: 'Date',
      key: 'created_at',
    },
  ]
}

const columns = createColumns({
  play: (row: any) => {},
})
const pagination = ref<PaginationProps | false>({
  pageSize: 6,
})

onMounted(() => {})
</script>

<template>
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
      recent activities pulled from the registry. The order by default is by
      DESC order.
    </span>
    <DataTable
      :columns="columns"
      class="font-inter mt-2"
      :data="data"
      :pagination="pagination"
    />
  </div>
</template>

<style scoped></style>
