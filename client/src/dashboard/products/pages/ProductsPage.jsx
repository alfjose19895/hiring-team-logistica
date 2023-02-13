import { useEffect } from 'react';
import { useProductStore } from '../../hooks';

const ProductsPage = () => {
  const { startLoadingProducts, products } = useProductStore();

  console.log(products.products);

  useEffect(() => {
    startLoadingProducts();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">Products</h1>

      <ul>
        {products?.products?.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <div className="bg-white shadow mt-10 rounded-lg">Some title</div>
    </>
  );
};

export default ProductsPage;
