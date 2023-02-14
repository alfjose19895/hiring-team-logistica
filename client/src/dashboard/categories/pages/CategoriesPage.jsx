import { useEffect } from 'react';
import { useUiStore } from '../../../hooks';
import { CustomGlobalAlert } from '../../../ui';

import { CustomModal } from '../../../ui/components/modal';
import { LoaderSpinner } from '../../../ui/loaders';
import { useProductStore } from '../../hooks';
import { CategoryForm } from '../components';

import { columnsStructureCategories, Table } from './../../components/table';

const CategoriesPage = () => {
  const { startLoadingCategories, isLoadingCategories, categories } =
    useProductStore();
  const { isThereAnyGlobalMsg } = useUiStore();

  useEffect(() => {
    startLoadingCategories();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">Products</h1>
        {isThereAnyGlobalMsg && <CustomGlobalAlert />}
      </div>

      <div className="pt-7">
        <div className="pt-7">
          {!isLoadingCategories ? (
            <Table
              data={categories}
              titleBtn={'Create New Category'}
              columnsStructure={columnsStructureCategories}
            />
          ) : (
            <LoaderSpinner />
          )}
        </div>
      </div>

      <CustomModal>
        <CategoryForm />
      </CustomModal>
    </>
  );
};

export default CategoriesPage;
