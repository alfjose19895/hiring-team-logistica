<script lang="ts" setup>
const { data: session } = useSession()

const { t } = useLang()

useHead({
  title: 'Dashboard',
  meta: [
    {
      name: 'description',
      content: t('pages.dashboard.index.description'),
    },
  ],
})

definePageMeta({
  title: 'Dashboard',
  layout: 'dashboard',
  middleware: ['auth'],
})
</script>

<template>
  <PageWrapper :crumbs="true">
    <PageHeader>
      <PageTitle
        :text="$t('pages.dashboard.index.title')"
        class="font-whitney capitalize"
      />
      <span class="text-gray-400 font-poppins text-[11pt]">
        {{
          capitalizeFirst(
            $t('pages.dashboard.index.current_user', {
              username: session?.user?.username,
            })
          )
        }}
        Last login was
        {{ new Date(session?.user.last_login as Date).toLocaleString() }}
      </span>
    </PageHeader>
    <PageBody>
      <PageSection>
        <!-- TODO: Fetch real data from the API. Data showed in the next component ARE MOCKED-->
        <DashboardDataInfo />
        <!-- End TODO -->
        <span class="text-gray-400 font-inter italic">
          * Note that products value is the number of products created. Also,
          every product has their own stock.
        </span>
      </PageSection>
      <PageSection class="mt-12">
        <div class="flex flex-col">
          <span class="text-xl font-poppins font-bold">Recent activity</span>
          <span class="text-gray-400 dark:text-gray-300 font-inter">
            Track the last recent activity related to the entire system. You can
            view recent changes made by users, recent logins, and much more.
          </span>
        </div>
        <div class="mt-4">
          <LazyDataRecentActivity />
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
