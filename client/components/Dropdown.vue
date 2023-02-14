<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

// micro compiler
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: Object,
    default: undefined,
  },
  type: {
    type: String,
    default: 'dropdown-right-top',
  },
  options: {
    type: Object,
    default: (): any => [],
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
})

const currentStyle = toRef(props, 'type')
</script>

<template>
  <div class="flex items-center">
    <Listbox
      v-if="currentStyle === 'dropdown-right-top'"
      as="div"
      class="relative flex items-center"
    >
      <ListboxButton
        type="button"
        class="transition-colors duration-300 text-gray-400 dark:hover:text-white hover:text-gray-900 flex gap-1.5 items-center font-bold"
      >
        <component :is="icon" class="w-4" />
        <slot>{{ text }}</slot>
      </ListboxButton>
      <ListboxOptions
        class="p-1 absolute z-50 top-full outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-48 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300"
      >
        <ListboxOption v-for="item in options">
          <template #default="{ active }">
            <div
              :class="`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer ${
                active ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`"
              @click="navigateTo(to)"
            >
              <component :is="item.icon" class="w-4 text-primary-500" />
              <span class="font-inter">{{ item.text }}</span>
            </div>
          </template>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>

<style scoped></style>
