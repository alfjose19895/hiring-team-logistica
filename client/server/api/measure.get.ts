export default defineEventHandler(async () => {
  // fetch from remote API
  const response = await fetch('http://backend:5000/api/v1/measure', {
    mode: 'no-cors',
  })
  if (response.status === 200) {
    return await response.json()
  } else {
    return setResponseStatus(400, 'Something went wrong')
  }
})
