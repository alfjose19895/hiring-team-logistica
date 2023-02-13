import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../../api';
import { onLoadProducts } from '../../store/dashboard';

export const useProductStore = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);

  const startLoadingProducts = async () => {
    try {
      const { data } = await inventoryManagementApi.get('/products');

      dispatch(onLoadProducts(data));
    } catch (error) {
      //
    }
  };

  return {
    products,

    startLoadingProducts,
  };
};
