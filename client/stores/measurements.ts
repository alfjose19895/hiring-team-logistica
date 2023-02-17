import { defineStore } from 'pinia'

interface MeasureType {
  id: number
  name: string
  abbreviation: string
  created_at: string
}

export const useMeasurementsStore = defineStore('measurement', () => {
  const measurements = ref([] as MeasureType[])

  const getMeasures = async () => {
    await useFetch('/api/measure', {
      onResponse({ response }) {
        if (response.ok) {
          measurements.value = response._data
        }
      },
    })
  }

  const getMeasureNameById = (id: number) => {
    const measure = measurements.value.find((m) => m.id === id)
    return measure ? measure.name : ''
  }

  return {
    measurements,
    getMeasures,
    getMeasureNameById,
  }
})
