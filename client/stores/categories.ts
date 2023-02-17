import { defineStore } from 'pinia'

interface CategoryType {
  id: number
  name: string
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([] as CategoryType[])

  const getCategories = async () => {
    const { data } = await useFetch('/api/categories', {
      onResponse({ response }) {
        if (response.ok) {
          categories.value = response._data
        }
      },
    })
  }

  const getCategoryNameById = (id: number) => {
    const category = categories.value.find((category) => category.id === id)
    return category?.name
  }

  return {
    categories,
    getCategories,
    getCategoryNameById,
  }
})
