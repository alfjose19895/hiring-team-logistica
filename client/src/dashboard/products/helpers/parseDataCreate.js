export const parseCreateProduct = product => ({
  title: product.title,
  category_id: product.category.id,
  unit: product.productMeasurements[0].unit,
  quantity: +product.stockInquiries[0].quantity,
  price: +product.price,
  ...(product.code && { code: product.code }),
});
