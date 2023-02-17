interface Product {
  id: number
  code: string
  name: string
  in_stock: boolean
  created_at: Date
  category: Object
  measure_type: Object
  quantity: Object
  measures: Object
}

export default defineEventHandler(async () => {
  // fetch from remote API
  const response = await fetch('http://backend:5000/api/v1/products', {
    mode: 'no-cors',
  })

  if (response.ok) {
    const data = await response.json()

    if (data != null) {
      const products: Product[] = data.map((product: any) => ({
        id: product.id,
        code: product.code,
        name: product.name,
        in_stock: product.in_stock,
        created_at: product.created_at,
        updated_at: product.updated_at,
        category: product.category,
        measure_type: product.measure_type.name,
        quantity: product.stock_id.quantity,
        measures: product.measures,
      }))
      return products
    } else return []
    // map to our Product type
  } else if (response.status === 404) {
    return await response.json()
  }
  return null
})
