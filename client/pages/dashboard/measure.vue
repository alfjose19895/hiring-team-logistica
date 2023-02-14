<script lang="ts" setup>
const { t } = useLang()

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})

useHead(() => ({
  title: capitalize(t('pages.measure.title')),
}))
</script>

<template>
  <PageWrapper>
    <NuxtPage />
  </PageWrapper>
</template>
