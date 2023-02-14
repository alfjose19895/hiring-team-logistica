import { darkTheme, lightTheme } from 'naive-ui'

export type IThemeSettingsOptions = 'light' | 'dark' | 'system' | 'realtime'

export type ITheme = typeof lightTheme | typeof darkTheme

export const availableThemes: {
  key: IThemeSettingsOptions
  label: string
}[] = [
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
  { key: 'system', label: 'System' },
  { key: 'realtime', label: 'Realtime' },
]

export function ThemeManager() {
  // composables
  const themeUserSettings = useCookie<IThemeSettingsOptions>('theme')

  // methods and computed
  const getUserSettings = () => {
    return themeUserSettings.value || 'system'
  }

  const getSystemTheme = (): ITheme => {
    try {
      return window
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? darkTheme
          : lightTheme
        : lightTheme
    } catch (error) {
      return lightTheme
    }
  }

  const getRealtimeTheme = (): ITheme => {
    const now = new Date()
    const hour = now.getHours()
    const isNigth = hour >= 19 || hour <= 6 ? darkTheme : lightTheme
    return isNigth
  }

  // state

  const themeSetting = useState<IThemeSettingsOptions>('theme.setting', () =>
    getUserSettings()
  )

  const themeCurrent = useState<ITheme>('theme.current', () =>
    process.client ? getSystemTheme() : lightTheme
  )

  // watchers

  const onThemeSettingsChange = (themeSetting: IThemeSettingsOptions) => {
    themeUserSettings.value = themeSetting
    if (themeSetting === 'realtime') {
      themeCurrent.value = getRealtimeTheme()
    } else if (themeSetting === 'system') {
      themeCurrent.value = getSystemTheme()
    } else {
      themeCurrent.value = themeSetting === 'light' ? lightTheme : darkTheme
    }
  }
  watch(themeSetting, (val) => onThemeSettingsChange(val))
  const onSystemThemeChange = () => {
    if (themeSetting.value === 'system') {
      themeCurrent.value = getSystemTheme()
    }
  }

  const onRealtimeCheck = () => {
    if (themeSetting.value === 'realtime') {
      themeCurrent.value = getRealtimeTheme()
    }
  }

  // init theme

  const init = () => {
    themeSetting.value = getUserSettings()
  }
  onThemeSettingsChange(themeSetting.value)

  // lifecycle

  let intervalCheckTime: NodeJS.Timer | null = null
  onBeforeMount(() => {
    init()
  })

  onMounted(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onSystemThemeChange)
    intervalCheckTime = setInterval(onRealtimeCheck, 1000)
  })

  onBeforeUnmount(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', onSystemThemeChange)
    if (intervalCheckTime) clearInterval(intervalCheckTime)
  })

  return {
    themeSetting,
    themeCurrent,

    getUserSettings,
    getSystemTheme,
    getRealtimeTheme,
  }
}
