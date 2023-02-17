export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await fetch('http://backend:5000/api/v1/measure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'no-cors',
  })
  return await response.json()
})
