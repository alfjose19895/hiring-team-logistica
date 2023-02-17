export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const response = await fetch(
    `http://backend:5000/api/v1/products/categories/${query.id}`,
    {
      method: 'DELETE',
    }
  )
  if (response.status === 204) {
    return {
      status: 204,
      body: 'Deleted',
    }
  } else if (response.status >= 400 && response.status < 500) {
    return await response.json()
  }
})
