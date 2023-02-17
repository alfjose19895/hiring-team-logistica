<script lang="ts" setup>
// micro compiler
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: '',
  },
  icon: {
    type: Object,
    default: undefined,
  },
})

// state
const href = toRef(props, 'href')
const to = toRef(props, 'to')
</script>

<template>
  <NuxtLink
    v-if="to"
    tag="a"
    :to="to"
    :class="`transition-colors duration-300 text-gray-400 dark:hover:text-white hover:text-gray-900 hover:underline flex gap-1.5 items-center font-inter`"
  >
    <component :is="icon" class="w-4" />
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a
    v-else
    :class="`transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline font-inter`"
    :href="href"
  >
    <slot>{{ text }}</slot>
  </a>
</template>
