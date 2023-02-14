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
    <div className="mt-1 px-6">
      <h1 className="text-4xl font-black">Products</h1>

      <div className="pt-7">
        {products?.products?.length > 0 && (
          <Table data={products.products} titleBtn={'Create New Product'} />
        )}
      </div>

      <CustomModal>
        <ProductForm />
      </CustomModal>
    </div>
  );
};

export default ProductsPage;
