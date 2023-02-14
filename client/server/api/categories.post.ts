export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await fetch(
    'http://localhost:5050/api/v1/products/categories',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      mode: 'no-cors',
    }
  )
  return await response.json()
})
