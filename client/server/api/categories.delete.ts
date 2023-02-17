export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const response = await fetch(
    `http://backend:5000/api/v1/products/categories/${query.id}`,
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
