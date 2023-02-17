<script lang="ts" setup>
import { NCard as Card, NNumberAnimation as NumberAnimation } from 'naive-ui'
const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  precise: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <Card class="rounded-md">
    <div class="flex gap-x-2">
      <div class="flex text-primary-500 dark:text-white text-[28pt]">
        <slot name="icon" />
      </div>
      <div class="flex flex-col font-inter leading-4">
        <span class="text-lg font-bold">
          <NumberAnimation
            v-if="!precise"
            :from="0"
            :to="quantity"
            show-separator
          />
          <NumberAnimation
            v-else
            :precision="2"
            :from="0"
            :to="quantity"
            show-separator
          />
        </span>
        <span class="text-xs text-gray-500 uppercase font-bold">
          <slot>{{ title }}</slot>
        </span>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
