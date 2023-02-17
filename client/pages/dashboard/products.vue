<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
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
  <PageWrapper>
    <NuxtPage />
  </PageWrapper>
</template>
