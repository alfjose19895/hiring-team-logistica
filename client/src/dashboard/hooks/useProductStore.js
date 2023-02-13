import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../../api';
import {
  onLoadCategories,
  onLoadProducts,
  onSetActiveProduct,
} from '../../store/dashboard';

export const useProductStore = () => {
  const dispatch = useDispatch();
  const { products, categories, activeProduct } = useSelector(
    state => state.products
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
    const { data } = await inventoryManagementApi.get('/categories');

    dispatch(onLoadCategories(data));
  };

  const setActiveProduct = product => {
    dispatch(onSetActiveProduct(product));
  };

  return {
    products,
    categories,
    activeProduct,

    startLoadingProducts,
    startLoadingCategories,
    setActiveProduct,
  };
};
