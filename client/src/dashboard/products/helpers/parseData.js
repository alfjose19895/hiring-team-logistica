export const parseCreateProduct = product => ({
  title: product.title,
  category_id: product.category.id,
  unit: product.productMeasurements[0].unit,
  quantity: +product.stockInquiries[0].quantity,
  price: +product.price,

  // opts
  // ...(product.code && { code: product.code }),
  code: product.code,
});

export const parseUpdateProduct = product => {
  const n = {
    title: product.title,
    price: +product.price,

    // opts
    category_id: product.category.id,

    measurementUnitId: product.productMeasurements[0].id,
    unit: product.productMeasurements[0].unit,

    quantityId: product.stockInquiries[0].id,
    quantity: +product.stockInquiries[0].quantity,

    hasStock: product.hasStock,
    code: product.code,
  };

  return n;
};
