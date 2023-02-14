import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../../api';
import { onClearGlobalAlert, onShowGlobalAlert } from '../../store';
import {
  onAddNewProduct,
  onDeleteProduct,
  onLoadCategories,
  onLoadProducts,
  onSetActiveCategory,
  onSetActiveProduct,
  onUpdateProduct,
} from '../../store/dashboard';
import { parseCreateProduct, parseUpdateProduct } from '../products/helpers';

export const useProductStore = () => {
  const dispatch = useDispatch();
  const { products, activeProduct, isLoadingProducts } = useSelector(
    state => state.products
  );
  const { categories, activeCategory, isLoadingCategories } = useSelector(
    state => state.categories
  );

  const startLoadingProducts = async () => {
    try {
      const { data } = await inventoryManagementApi.get('/products');

      dispatch(onLoadProducts(data));
    } catch (error) {
      //
    }
  };

  const startLoadingCategories = async () => {
    try {
      const { data } = await inventoryManagementApi.get('/categories');

      dispatch(onLoadCategories(data));
    } catch (error) {
      console.log(error);
    }
  };

  const setActiveProduct = product => {
    dispatch(onSetActiveProduct(product));
  };

  const setActiveCategory = category => {
    dispatch(onSetActiveCategory(category));
  };

  const startSavingProduct = async product => {
    try {
      // updating
      if (product.id) {
        const prodToUpdate = parseUpdateProduct(product);
        const { data } = await inventoryManagementApi.patch(
          `/products/${product.id}`,
          prodToUpdate
        );

        return dispatch(onUpdateProduct(data));
      }

      // creating
      const prodToAdd = parseCreateProduct(product);
      const { data } = await inventoryManagementApi.post(
        '/products',
        prodToAdd
      );

      dispatch(onAddNewProduct(data));
    } catch (error) {
      dispatch(
        onShowGlobalAlert({ msg: error?.response?.data?.message, error: true })
      );
    }

    setTimeout(() => {
      dispatch(onClearGlobalAlert());
    }, 1400);
  };

  const startDeletingProduct = async id => {
    try {
      await inventoryManagementApi.delete(`/products/${id}`);

      dispatch(onDeleteProduct());
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };

  return {
    isLoadingProducts,
    products,
    activeProduct,

    startLoadingProducts,
    setActiveProduct,
    startSavingProduct,
    startDeletingProduct,

    isLoadingCategories,
    categories,
    activeCategory,
    startLoadingCategories,
    setActiveCategory,
  };
};
