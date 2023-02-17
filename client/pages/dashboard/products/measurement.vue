<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
  title: 'Measurement',
  layout: 'dashboard',
  middleware: ['auth'],
})

useHead(() => ({
  title: capitalizeFirst(t('pages.products.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.products.description'),
    },
  ],
}))
</script>

<template>
  <PageHeader>
    <PageTitle
      :text="capitalizeFirst($t('pages.products.measurement.header'))"
      class="font-whitney"
    />
    <span class="flex text-gray-400 font-poppins leading-5">
      {{ capitalizeFirst($t('pages.products.measurement.description')) }}
    </span>
  </PageHeader>
</template>

<style scoped></style>
