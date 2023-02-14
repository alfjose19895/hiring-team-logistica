export default defineEventHandler(async () => {
  // fetch from remote API
  const response = await fetch('http://localhost:5050/api/v1/measure', {
    mode: 'no-cors',
  })
  return await response.json()
})
