import { useEffect } from 'react';
import { useUiStore } from '../../../hooks';
import { CustomGlobalAlert } from '../../../ui';

import { CustomModal } from '../../../ui/components/modal';
import { LoaderSpinner } from '../../../ui/loaders';
import { columnsStructureProducts, Table } from '../../components/table';
import { useProductStore } from '../../hooks';
import { ProductForm } from '../components';

const ProductsPage = () => {
  const {
    startLoadingProducts,
    products,
    startLoadingCategories,
    isLoadingProducts,
  } = useProductStore();
  const { isThereAnyGlobalMsg } = useUiStore();

  useEffect(() => {
    startLoadingProducts();
    startLoadingCategories();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">Products</h1>
        {isThereAnyGlobalMsg && <CustomGlobalAlert />}
      </div>

      <div className="pt-14">
        {!isLoadingProducts ? (
          <Table
            data={products.products}
            titleBtn={'Create New Product'}
            columnsStructure={columnsStructureProducts}
          />
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
