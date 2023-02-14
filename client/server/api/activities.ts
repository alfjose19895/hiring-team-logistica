export default defineEventHandler(async () => {
  // fetch from remote API
  const response = await fetch(`http://localhost:5050/api/v1/activity/recent`, {
    mode: 'no-cors',
  })
  if (!response.ok) {
    throw new Error('Failed to fetch activities')
  }
  const activities = await response.json()
  return activities
})
