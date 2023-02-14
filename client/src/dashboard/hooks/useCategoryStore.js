import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../../api';
import { onClearGlobalAlert, onShowGlobalAlert } from '../../store';
import {
  onAddNewCategory,
  onLoadCategories,
  onSetActiveCategory,
  onUpdateCategory,
} from '../../store/dashboard';

export const useCategoryStore = () => {
  const dispatch = useDispatch();

  const { categories, activeCategory, isLoadingCategories } = useSelector(
    state => state.categories
  );

  const startLoadingCategories = async () => {
    try {
      const { data } = await inventoryManagementApi.get('/categories');

      dispatch(onLoadCategories(data));
    } catch (error) {
      console.log(error);
    }
  };

  const setActiveCategory = category => {
    dispatch(onSetActiveCategory(category));
  };

  const startSavingCategory = async category => {
    try {
      // updating
      if (category.id) {
        const { data } = await inventoryManagementApi.patch(
          `/categories/${category.id}`,
          category
        );
        return dispatch(onUpdateCategory(data));
      }

      // creating
      const { data } = await inventoryManagementApi.post(
        '/categories',
        category
      );

      dispatch(onAddNewCategory(data));
    } catch (error) {
      dispatch(
        onShowGlobalAlert({ msg: error?.response?.data?.message, error: true })
      );
    }

    setTimeout(() => {
      dispatch(onClearGlobalAlert());
    }, 1400);
  };

  // const startDeletingCategory = async id => {
  //   try {
  //     await inventoryManagementApi.delete(`/categories/${id}`);

  //     dispatch(onDeleteCategory());
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error?.response?.data);
  //   }
  // };

  return {
    isLoadingCategories,
    categories,
    activeCategory,

    startLoadingCategories,
    setActiveCategory,
    startSavingCategory,
  };
};
