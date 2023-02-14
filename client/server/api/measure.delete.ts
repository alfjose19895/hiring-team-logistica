export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const response = await fetch(
    `http://localhost:5050/api/v1/measure/${query.id}`,
    {
      method: 'DELETE',
    }
  )
  if (!response.ok) {
    throw new Error('Failed to delete measure')
  } else {
    return { id: query.id }
  }
})
