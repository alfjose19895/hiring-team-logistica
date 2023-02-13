import { useEffect } from 'react';
import { Table } from '../../components/table';
import { useProductStore } from '../../hooks';

const ProductsPage = () => {
  const { startLoadingProducts, products } = useProductStore();

  useEffect(() => {
    startLoadingProducts();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">Products</h1>

      <div className="mt-16 p-9">
        {products?.products?.length > 0 && <Table data={products.products} />}
      </div>
    </>
  );
};

export default ProductsPage;
