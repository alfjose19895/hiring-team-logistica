import { useEffect } from 'react';

import { Table } from '../../components/table';
import { useProductStore } from '../../hooks';
import { ProductForm } from '../components';
import { CustomModal } from '../../../ui/components/modal';

const ProductsPage = () => {
  const { startLoadingProducts, products, startLoadingCategories } =
    useProductStore();

  useEffect(() => {
    startLoadingProducts();
    startLoadingCategories();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">Products</h1>

      <div className="mt-16 p-9">
        {products?.products?.length > 0 && <Table data={products.products} />}
      </div>

      <CustomModal>
        <ProductForm />
      </CustomModal>
    </>
  );
};

export default ProductsPage;
