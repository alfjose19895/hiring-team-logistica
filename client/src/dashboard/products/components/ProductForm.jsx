import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, useUiStore } from '../../../hooks';
import { CustomAlert } from '../../components/alert';
import { useProductStore } from '../../hooks';

const productFormFields = {
  title: '',
  code: '',
  price: '',
  hasStock: true,
  category: { id: '', name: '' },
  productMeasurements: [{ id: '', unit: '' }],
  stockInquiries: [{ id: '', quantity: '' }],
};

const formValidations = {
  title: [
    value => value.length >= 4,
    'Title must be longer than or equal to 3 characters',
  ],
  category: [value => +value.id > 0, 'Category is required'],
  price: [value => +value >= 1, 'Price must be a positive number'],

  productMeasurements: [
    value => value[0]?.unit?.length >= 1,
    'Product Measurements is required',
  ],
  stockInquiries: [
    value => +value[0]?.quantity > 0,
    'Stock Inquiries must be a positive number',
  ],
};

export const ProductForm = () => {
  const { categories, activeProduct, startSavingProduct, setActiveProduct } =
    useProductStore();
  const { closeModal, setErrorMessages, isThereAnyMsg } = useUiStore();
  const {
    formValues,
    handleInputChange,
    setFormValues,
    handleInputChangeNested,
    handleInputChangeArr,
    formValidation,
    isFormValid,
  } = useForm(productFormFields, formValidations);
  const {
    title,
    code,
    price,
    hasStock,
    category,
    productMeasurements,
    stockInquiries,
  } = formValues;

  useEffect(() => {
    if (activeProduct?.id) setFormValues({ ...activeProduct });
  }, [activeProduct]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isFormValid) return setErrorMessages(formValidation);

    await startSavingProduct(formValues);
    closeModal();
    setActiveProduct(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 shadow mx-5 my-12 rounded-md flex flex-col gap-4"
    >
      {isThereAnyMsg && <CustomAlert />}

      <TextField
        label="Product Name"
        type="text"
        placeholder="T-Shirt"
        fullWidth
        name="title"
        value={title}
        onChange={handleInputChange}
      />

      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          defaultValue={''}
          value={category?.id}
          name="category"
          onChange={handleInputChangeNested}
        >
          {categories?.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="SKU"
        type="text"
        placeholder="TS29931"
        fullWidth
        name="code"
        value={code}
        onChange={handleInputChange}
      />

      <TextField
        label="Units"
        type="text"
        placeholder="units"
        fullWidth
        defaultValue=""
        name="productMeasurements"
        value={productMeasurements[0]?.unit}
        onChange={e => handleInputChangeArr(e, 'unit')}
      />

      <TextField
        label="Quantity"
        type="number"
        placeholder="3"
        fullWidth
        defaultValue=""
        name="stockInquiries"
        value={stockInquiries[0]?.quantity}
        onChange={e => handleInputChangeArr(e, 'quantity')}
      />

      <TextField
        label="Price"
        type="number"
        placeholder="$21"
        fullWidth
        name="price"
        value={price}
        onChange={handleInputChange}
        min={'1'}
      />

      {activeProduct?.id && (
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            defaultValue=""
            name="hasStock"
            value={hasStock}
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Out Of Stock</MenuItem>
          </Select>
        </FormControl>
      )}

      <Button variant="contained" type="submit">
        {activeProduct?.id ? 'Update' : 'Create'}
      </Button>
    </form>
  );
};
