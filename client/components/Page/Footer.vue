<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import p from './../../package.json'
const app = useAppConfig() as AppConfigInput
</script>

<template>
  <footer
    class="border-t lg:border-gray-900/10 dark:border-gray-50/[0.2] font-poppins"
  >
    <section
      class="max-w-8xl mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20"
    >
      <div class="w-full py-4 text-center md:text-left">
        <div class="mb-1">
          {{ app.name }}
        </div>
        <div class="text-xs text-gray-600 dark:text-gray-400">
          Copyright &copy; {{ new Date().getFullYear() }}. Funiber

          <div
            class="flex flex-col md:flex-row space-x-2 items-center md:float-right"
          >
            <span class="text-center md:text-right">
              developed by
              <a target="_blank" href="https://francoislopez.vercel.app/">
                François López (a.k.a {{ p.author }}) ☕
              </a>
            </span>
            <span
              class="block bg-blue-500 rounded px-1 py-0.5 text-white text-xs"
            >
              {{ p.version }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>
