<script lang="ts" setup>
import { NConfigProvider as ConfigProvider } from 'naive-ui'
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
const app = useAppConfig() as AppConfigInput

useHead({
  title: 'Home',
  titleTemplate: '%s - Inventory Management System',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Inventory Management System',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>

<template>
  <ConfigProvider :theme="theme">
    <Html :class="`${theme.name === 'dark' ? 'dark' : ''}`" :lang="locale">
      <Body
        class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
      >
        <NuxtLayout>
          <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
          <NuxtPage />
        </NuxtLayout>
      </Body>
    </Html>
  </ConfigProvider>
</template>
