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
</template>

<style scoped></style>
