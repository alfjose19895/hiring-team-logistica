<script lang="ts" setup>
definePageMeta({
  title: 'Account',
  layout: 'dashboard',
  middleware: ['auth'],
})

const { data: session } = useSession()
</script>

<template>
  <PageWrapper :crumbs="true">
    <PageHeader>
      <PageTitle
        :text="capitalizeFirst($t('pages.dashboard.account.title'))"
        class="font-whitney"
      />
      <span class="text-gray-400 font-poppins text-[11pt]">
        You can view a resumed information about this account.
      </span>
    </PageHeader>
    <PageBody>
      <PageSection>
        <div class="flex flex-col">
          <span class="text-xl font-poppins font-bold">
            This is my user name 👀
          </span>
          <span class="text-gray-400 dark:text-gray-300 font-inter">
            Hi, my name is {{ session?.user?.username }}. I was designed as a
            unique user name for this account. And the unique user available for
            this system.
          </span>
        </div>
        <div class="flex flex-col mt-8">
          <span class="text-xl font-poppins font-bold">
            Here is my email address 📧
          </span>
          <span class="text-gray-400 dark:text-gray-300 font-inter">
            My email address is {{ session?.user?.email }}. Yes, it's not real.
            😊
          </span>
        </div>
        <div class="flex flex-col mt-8">
          <span class="text-xl font-poppins font-bold">
            This is my last login 🕒
          </span>
          <span class="text-gray-400 dark:text-gray-300 font-inter">
            My last login was
            {{
              session?.user.last_login
                ? new Date(session?.user.last_login as Date).toLocaleString()
                : 'never'
            }}
          </span>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style scoped></style>
