<script lang="ts">
export default defineComponent({
  props: {
    mode: {
      type: String,
      default: 'normal',
    },
  },
  setup() {
    const sidebar = ref(null)

    onMounted(() => {
      // const { onScroll } = useSticky(sidebar.value, -1000)
      // setTimeout(() => onScroll(), 50)
    })

    return {
      sidebar,
    }
  },
})
</script>

<template>
  <div
    ref="sidebar"
    :class="{
      'fixed top-0 hidden pt-12 lg:flex lg:w-60 xl:w-80 h-screen':
        mode === 'normal',
      'relative flex-1 flex flex-col w-full': mode === 'mobile',
    }"
  >
    <div class="flex-1 overflow-y-auto pl-4 lg:pl-0 pr-4 py-4">
      <Anchor
        href="/dashboard/products"
        class="group flex items-center mb-4 hover:no-underline"
        v-slot="{ products }"
      >
        <div
          class="flex items-center mr-4 px-2 py-2 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"
          :class="{
            'text-white dark:text-white group-hover:bg-sky-500 bg-sky-500':
              products,
            'text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700':
              !products,
          }"
        >
          <IconUil:shopping-cart class="text-xs" />
        </div>
        <span
          class="font-sm font-poppins font-bold"
          :class="{
            'font-extrabold text-sky-500 dark:text-sky-400': products,
          }"
        >
          {{ capitalize($t('pages.products.title')) }}
        </span>
      </Anchor>
      <!-- Products categories -->

      <Anchor
        href="/dashboard/products/categories"
        class="group flex items-center mb-4 hover:no-underline"
        v-slot="{ productCategories }"
      >
        <div
          class="flex items-center mr-4 px-2 py-2 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"
          :class="{
            'text-white dark:text-white group-hover:bg-sky-500 bg-sky-500':
              productCategories,
            'text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700':
              !productCategories,
          }"
        >
          <Icon:bx:category class="text-xs" />
        </div>
        <span
          class="font-sm font-poppins font-bold"
          :class="{
            'font-extrabold text-sky-500 dark:text-sky-400': productCategories,
          }"
        >
          {{ capitalize($t('pages.products.categories.title')) }}
        </span>
      </Anchor>

      <!-- Measurement type -->
      <Anchor
        href="/dashboard/measure"
        class="group flex items-center mb-4 hover:no-underline"
        v-slot="{ typeMeasurement }"
      >
        <div
          class="flex items-center mr-4 px-2 py-2 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"
          :class="{
            'text-white dark:text-white group-hover:bg-sky-500 bg-sky-500':
              typeMeasurement,
            'text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700':
              !typeMeasurement,
          }"
        >
          <Icon:arcticons:body-measures class="text-xs" />
        </div>
        <span
          class="font-sm font-poppins font-bold"
          :class="{
            'font-extrabold text-sky-500 dark:text-sky-400': typeMeasurement,
          }"
        >
          {{ capitalize($t('pages.measure.title')) }}
        </span>
      </Anchor>
    </div>
  </div>
</template>
