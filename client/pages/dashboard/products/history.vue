<script lang="ts" setup>
import { NInput as Input } from 'naive-ui'

import { useMeasurementsStore } from '~~/stores/measurements'
import { useCategoriesStore } from '~~/stores/categories'

const { getCategories } = useCategoriesStore()
const { getMeasures } = useMeasurementsStore()
const search = ref('')

const fetchedData = ref([])

const onErrorMessage = ref('')
const getProductHistory = async () => {
  await getCategories()
  await getMeasures()
  const { data, pending } = await useFetch('/api/history', {
    method: 'GET',
    params: {
      code: search.value,
    },
  })
  if (data.value.status >= 400) {
    search.value = ''
    onErrorMessage.value =
      'Error, product does not exist. Or the request is invalid.'
    setTimeout(() => {
      onErrorMessage.value = ''
    }, 3000)
  } else {
    fetchedData.value = data.value
  }
}
</script>

<template>
  <PageHeader>
    <PageTitle
      :text="$t('pages.products.history.title')"
      class="font-whitney capitalize"
    />
    <span class="text-gray-400 font-poppins text-[11pt]">
      {{ capitalizeFirst($t('pages.products.history.description')) }}
    </span>
  </PageHeader>
  <PageSection>
    <div class="flex flex-col">
      <span class="font-poppins font-semibold">
        Search the history of a product by product code
      </span>
      <div class="flex gap-x-2">
        <div class="flex w-[40%]">
          <Input v-model:value="search" placeholder="Search by product code" />
        </div>
        <Button
          type="none"
          class="bg-primary-500 hover:bg-primary-600"
          @click="getProductHistory()"
        >
          <Icon:mdi:magnify class="w-4 h-4 text-white" />
        </Button>
      </div>
      <span class="text-red-500 font-poppins font-semibold">
        {{ onErrorMessage }}
      </span>
    </div>
  </PageSection>
  <PageSection>
    <DataProductHistory :data="fetchedData" />
  </PageSection>
</template>

<style scoped></style>
