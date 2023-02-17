<script lang="ts" setup>
import { NMessageProvider as MessageConfiguration } from 'naive-ui'
const { t } = useLang()

const { status } = useSession()
const router = useRouter()

definePageMeta({
  layout: 'custompage',
  auth: false,
})

onBeforeMount(() => {
  if (status.value === 'authenticated') {
    router.push('/')
  }
})
</script>

<template>
  <PageWrapper class="flex px-[5%] md:px-[15%]">
    <PageBody class="flex mx-auto">
      <PageSection>
        <MessageConfiguration placement="bottom-right">
          <AuthSignInForm />
        </MessageConfiguration>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style scoped></style>
