import { useEffect } from 'react';

import { CustomModal } from '../../../ui/components/modal';
import { LoaderSpinner } from '../../../ui/loaders';
import { Table } from '../../components/table';
import { useProductStore } from '../../hooks';
import { ProductForm } from '../components';

const ProductsPage = () => {
  const {
    startLoadingProducts,
    products,
    startLoadingCategories,
    isLoadingProducts,
  } = useProductStore();

  useEffect(() => {
    startLoadingProducts();
    startLoadingCategories();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">Products</h1>

      <div className="pt-7">
        {!isLoadingProducts ? (
          <Table data={products.products} titleBtn={'Create New Product'} />
        ) : (
          <LoaderSpinner />
        )}
      </div>

      <CustomModal>
        <ProductForm />
      </CustomModal>
    </>
  );
};

export default ProductsPage;
