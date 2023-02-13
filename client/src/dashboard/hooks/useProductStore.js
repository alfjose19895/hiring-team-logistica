import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../../api';
import { onLoadCategories, onLoadProducts } from '../../store/dashboard';

export const useProductStore = () => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector(state => state.products);

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

  return {
    products,
    categories,

    startLoadingProducts,
    startLoadingCategories,
  };
};
