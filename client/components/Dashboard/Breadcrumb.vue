<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const getBreadcrumbs = () => {
  const fullPath = route.path
  const requestPath = fullPath.startsWith('/')
    ? fullPath.substring(1)
    : fullPath
  const crumbs = requestPath.split('/')
  const breadcrumbs: any = []

  let path = ''

  crumbs.forEach((crumb) => {
    if (crumb) {
      path = `${path}/${crumb}`
      const breadcrumb = router.getRoutes().find((r) => r.path === path)

      if (breadcrumb) {
        breadcrumbs.push(breadcrumb)
      }
    }
  })

  return breadcrumbs
}
</script>

<template>
  <nav>
    <ul class="flex space-x-2 items-center">
      <li>
        <NuxtLink to="/">
          <Icon:mdi:home class="text-[13pt]" />
        </NuxtLink>
      </li>
      <li
        v-for="(breadcrumb, index) in getBreadcrumbs()"
        :key="index"
        class="gap-x-3 flex items-center"
      >
        <span class="text-gray-400">/</span>
        <NuxtLink :to="breadcrumb.path">{{ breadcrumb.meta.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
