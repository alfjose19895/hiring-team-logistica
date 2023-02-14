<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
// Icons to be used in Navbar.
import IconHome from '~icons/mdi/home'
import IconSignIn from '~icons/ic/twotone-log-in'
import IconOthers from '~icons/ic/sharp-filter-list'

import OptionProducts from '~icons/ic/twotone-inventory-2'

import ItemCreate from '~icons/ic/outline-plus'
import ItemUpdate from '~icons/ic/round-update'
import ItemDelete from '~icons/ic/round-delete'
import ItemView from '~icons/ic/round-visibility'
// End of icons

export interface IMenuItem {
  icon?: any
  type: 'link' | 'button' | 'dropdown'
  text: string
  options?: IMenuItem[]
  href?: any
  key?: string
  route?: any
}

const { t } = useLang()
const app = useAppConfig() as AppConfigInput

const { status, signOut } = useSession()
const isAuth = computed(() => status.value === 'authenticated')

const productsOptions = computed<string[]>(() =>
  t('pages.products.options').split('[]')
)

const categoriesOptions = computed<string[]>(() =>
  t('pages.categories.options').split('[]')
)

const menus = computed((): IMenuItem[] => [
  {
    icon: IconHome,
    type: 'link',
    text: capitalize(t('pages.index.nav')),
    route: { name: 'index' },
  },
  {
    icon: OptionProducts,
    type: 'dropdown',
    text: capitalize(t('pages.products.nav')),
    route: { name: 'products' },
    options: [
      {
        text: capitalizeFirst(productsOptions.value[0]),
        type: 'link',
        key: 'create',
        icon: ItemCreate,
      },
      {
        text: capitalizeFirst(productsOptions.value[1]),
        type: 'link',
        key: 'update',
        icon: ItemUpdate,
      },
      {
        text: capitalizeFirst(productsOptions.value[2]),
        type: 'link',
        key: 'delete',
        icon: ItemDelete,
      },
      {
        text: capitalizeFirst(productsOptions.value[3]),
        type: 'link',
        key: 'view',
        icon: ItemView,
      },
    ],
  },
  {
    icon: IconOthers,
    type: 'dropdown',
    text: capitalize(t('pages.categories.nav')),
    options: [
      {
        text: capitalizeFirst(categoriesOptions.value[0]),
        type: 'link',
        key: 'create-categories',
        icon: ItemCreate,
      },
      {
        text: capitalizeFirst(categoriesOptions.value[1]),
        type: 'link',
        key: 'update-categories',
        icon: ItemUpdate,
      },
      {
        text: capitalizeFirst(categoriesOptions.value[2]),
        type: 'link',
        key: 'delete-categories',
        icon: ItemDelete,
      },
      {
        text: capitalizeFirst(categoriesOptions.value[3]),
        type: 'link',
        key: 'view-categoriess',
        icon: ItemView,
      },
    ],
  },
  {
    icon: IconSignIn,
    type: 'button',
    text: isAuth.value ? t('pages.auth.logged') : t('pages.auth.nav'),
    route: isAuth.value ? { name: 'dashboard' } : { name: 'auth' },
  },
])
</script>

<template>
  <BuilderNavbar>
    <template #banner>
      <div
        class="text-white text-xs text-center py-1 px-4 lg:px-8 bg-primary-500 font-inter"
      >
        <span class="mr-1">
          {{ capitalizeFirst($t('banners.welcome')) }}

          <Anchor
            class="no-underline font-bold"
            :text="capitalizeFirst($t('others.meet_the_creator'))"
            href="https://github.com/thejaggermaister"
          />
        </span>
      </div>
    </template>
    <template #menu>
      <div class="relative hidden lg:flex items-center ml-auto">
        <nav
          class="text-sm leading-6 font-semibold text-gray-600 dark:text-gray-300"
          role="navigation"
        >
          <ul class="flex items-center space-x-8">
            <li v-for="(item, i) in menus" :key="i">
              <Anchor
                v-if="item.type === 'link'"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
                :icon="item.icon"
                class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
              >
                {{ item.text }}
              </Anchor>
              <Button
                v-else-if="item.type === 'button'"
                :text="item.text"
                size="xs"
                :icon="item.icon"
                class="font-extrabold capitalize"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
              />
              <Dropdown
                v-else-if="item.type === 'dropdown'"
                :text="item.text"
                :icon="item.icon"
                :options="item.options"
                class="hover:no-underline hover:text-slate-900 hover:dark:text-white hover:cursor-pointer"
              />
            </li>
          </ul>
        </nav>
        <div
          class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <Anchor
            v-if="isAuth"
            @click="signOut"
            class="hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center"
            title="Logout"
          >
            <Icon:mdi:logout />
          </Anchor>
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Anchor
            class="hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center"
            href="https://github.com/thejaggermaister"
            title="Github"
          >
            <IconMdi:githubFace />
          </Anchor>
        </div>
      </div>
    </template>
    <template #options="{ toggleOptions }">
      <ActionSheet @on-close="toggleOptions(false)">
        <ActionSheetBody>
          <ActionSheetHeader text="Menu" />
          <nav class="leading-6 font-semibold text-gray-600 dark:text-gray-300">
            <ul class="flex flex-col">
              <li
                v-for="(item, i) in menus"
                :key="i"
                class="flex w-full"
                :class="{
                  'pb-2 mb-2 border-b border-gray-900/10 dark:border-gray-50/[0.2]':
                    item.type === 'link',
                }"
              >
                <Anchor
                  v-if="item.type === 'link'"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                  class="flex-1 hover:no-underline capitalize"
                  >{{ item.text }}</Anchor
                >
                <Button
                  v-else-if="item.type === 'button'"
                  :text="item.text"
                  size="xs"
                  class="flex-1 font-extrabold capitalize"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                />
              </li>
            </ul>
          </nav>
          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t('components.theme_switcher.change_theme') }}
          </div>
          <div class="mt-2">
            <ThemeSwitcher type="select-box" />
          </div>
          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t('components.language_switcher.change_language') }}
          </div>
          <div class="mt-2">
            <LanguageSwitcher type="select-box" />
          </div>
        </ActionSheetBody>
        <Button
          type="secondary"
          title="Github"
          href="https://github.com/thejaggermaister"
        >
          <IconMdi:github-face />
          <span class="ml-1">Github</span>
        </Button>
        <Button
          text="Close"
          type="secondary"
          @click.prevent="toggleOptions(false)"
        />
      </ActionSheet>
    </template>
  </BuilderNavbar>
</template>
