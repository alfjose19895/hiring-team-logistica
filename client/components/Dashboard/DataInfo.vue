<script lang="ts" setup>
import type { NumberAnimationInst } from 'naive-ui'

const { t } = useLang()

const dataProducts = useState('data-products', () => {
  return {
    products: 0,
    cost: 0,
    categories: 0,
    stock: 0,
  }
})

const animatedLoadedNumber = ref<NumberAnimationInst | null>(null)

const { data } = await useFetch('/api/stats', {
  onResponse({ response }) {
    if (response.ok) {
      dataProducts.value.products = response._data.products
      dataProducts.value.cost = response._data.cost
      dataProducts.value.categories = response._data.categories
      dataProducts.value.stock = response._data.in_stock
    }
  },
  mode: 'no-cors',
})
</script>

<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-flow-row gap-3"
  >
    <DataCardInfo
      :quantity="dataProducts.products"
      :title="capitalize($t('pages.products.data_cards.products'))"
    >
      <template #icon>
        <Icon:ic:twotone-inventory-2 />
      </template>
    </DataCardInfo>

    <DataCardInfo
      precise
      :quantity="dataProducts.cost"
      :title="capitalize($t('pages.products.data_cards.cost'))"
    >
      <template #icon>
        <Icon:ic:twotone-attach-money />
      </template>
    </DataCardInfo>

    <DataCardInfo
      :quantity="dataProducts.categories"
      :title="capitalize($t('pages.products.data_cards.categories'))"
    >
      <template #icon>
        <Icon:ic:twotone-category />
      </template>
    </DataCardInfo>

    <DataCardInfo
      :quantity="dataProducts.stock"
      :title="capitalize($t('pages.products.data_cards.stock'))"
    >
      <template #icon>
        <Icon:fluent-mdl2:product-variant />
      </template>
    </DataCardInfo>
  </div>
</template>

<style scoped></style>
