<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
  title: 'Products',
  layout: 'dashboard',
  middleware: ['auth'],
})

useHead(() => ({
  title: capitalize(t('pages.products.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.products.description'),
    },
  ],
}))

const showCreate = ref(false)
const product_table = ref(0)

const resultMessage = ref('')
const onDeleteMessage = () => {
  product_table.value++
  resultMessage.value = `Product was deleted successfully`
  setTimeout(() => {
    resultMessage.value = ''
  }, 3000)
}

const onUpdateMessage = () => {
  product_table.value++
  resultMessage.value = `Product was updated successfully`
  setTimeout(() => {
    resultMessage.value = ''
  }, 3000)
}
</script>

<template>
  <PageHeader>
    <PageTitle
      :text="$t('pages.products.header')"
      class="font-whitney capitalize"
    />
    <span class="text-gray-400 font-poppins text-[11pt]">
      {{ capitalizeFirst($t('pages.products.description')) }}
    </span>
  </PageHeader>
  <PageSection v-if="!showCreate">
    <div class="flex">
      <Button
        class="bg-blue-500 hover:bg-blue-600 text-white font-poppins"
        type="none"
        @click="showCreate = !showCreate"
      >
        <Icon:mdi:plus class="h-4 w-4" />
        Create new product
      </Button>
    </div>
  </PageSection>
  <Transition>
    <PageSection v-if="showCreate">
      <ProductsCreate
        @cancel="showCreate = !showCreate"
        @create="
          () => {
            showCreate = !showCreate
          }
        "
        @updateTable="
          () => {
            product_table++
          }
        "
      />
    </PageSection>
  </Transition>
  <PageSection>
    <span class="text-green-300 font-inter font-bold">{{ resultMessage }}</span>
    <DataProductTable
      :key="product_table"
      @onDelete="onDeleteMessage()"
      @onUpdate="onUpdateMessage()"
    />
  </PageSection>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
