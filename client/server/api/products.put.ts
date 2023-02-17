export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const body = await readBody(event)
  const response = await fetch(
    `http://backend:5000/api/v1/products/${query.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (response.status === 200) {
    return {
      status: 200,
      body: await response.json(),
    }
  } else {
    return {
      status: 500,
      body: await response.json(),
    }
  }
})
