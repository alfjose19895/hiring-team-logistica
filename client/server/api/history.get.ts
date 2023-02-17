interface ProductHistory {
  id: number
  created_at: Date
  action: string
  product: Object
  quantity_id: number
  category_id: number
  measure_id: number
  type_measurement_id: number
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // fetch from remote API
  const response = await fetch(
    `http://backend:5000/api/v1/products/history/${query.code}`,
    {
      method: 'GET',
      mode: 'no-cors',
    }
  )

  if (response.ok) {
    const data = await response.json()

    if (data != null) {
      const products: ProductHistory[] = data.map((product: any) => ({
        id: product.id,
        created_at: product.created_at,
        action: product.action,
        product: product.product,
        quantity_id: product.quantity_id,
        category_id: product.category_id,
        measure_id: product.measure_id,
        type_measurement_id: product.type_measurement_id,
      }))
      return products
    } else return []
    // map to our Product type
  } else if (response.status === 404) {
    return await response.json()
  }
  return null
})
