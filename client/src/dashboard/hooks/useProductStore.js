import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../../api';
import {
  onAddNewProduct,
  onLoadCategories,
  onLoadProducts,
  onSetActiveProduct,
} from '../../store/dashboard';
import { parseCreateProduct } from '../products/helpers';

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

  const startSavingProduct = async product => {
    try {
      // updating
      if (product.id) {
        console.log(product);
        return;
      }

      // creating
      const prodToAdd = parseCreateProduct(product);
      const { data } = await inventoryManagementApi.post(
        '/products',
        prodToAdd
      );
      console.log(prodToAdd);
      dispatch(onAddNewProduct(data));
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
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
    startSavingProduct,
  };
};
