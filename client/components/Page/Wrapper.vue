<template>
  <div
    :class="{
      'flex-1 relative py-8': !crumbs,
      'flex-1 relative': crumbs,
    }"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  crumbs: {
    type: Boolean,
    default: true,
  },
})
</script>
