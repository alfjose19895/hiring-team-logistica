export default defineEventHandler(async () => {
  // fetch from remote API
  const response = await fetch('http://backend:5000/api/v1/stats', {
    mode: 'no-cors',
  })
  return await response.json()
})
