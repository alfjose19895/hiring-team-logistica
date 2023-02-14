import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../../api';
import {
  onAddNewProduct,
  onDeleteProduct,
  onLoadCategories,
  onLoadProducts,
  onSetActiveProduct,
  onUpdateProduct,
} from '../../store/dashboard';
import { parseCreateProduct, parseUpdateProduct } from '../products/helpers';

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
      console.log(error);
      console.log(error?.response?.data);
    }
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
    products,
    categories,
    activeProduct,

    startLoadingProducts,
    startLoadingCategories,
    setActiveProduct,
    startSavingProduct,
    startDeletingProduct,
  };
};
