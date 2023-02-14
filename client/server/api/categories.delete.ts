export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const response = await fetch(
    `http://localhost:5050/api/v1/products/categories/${query.id}`,
    {
      method: 'DELETE',
    }
  )
  if (!response.ok) {
    throw new Error('Failed to delete category')
  } else {
    return { id: query.id }
  }
})
