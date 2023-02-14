import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useForm } from '../../../hooks';
import { useProductStore } from '../../hooks';

const productFormFields = {
  title: '',
  category: '',
  sku: '',
  productMeasurements: '',
  stockInquiries: '',
  price: 0,
  hasStock: true,
};

export const ProductForm = () => {
  const { categories, activeProduct } = useProductStore();
  const { handleInputChange, setFormValuesFx } = useForm(productFormFields);
  const {
    title,
    category,
    sku,
    productMeasurements,
    stockInquiries,
    price,
    hasStock,
  } = activeProduct;

  useEffect(() => {
    if (activeProduct !== null) setFormValuesFx({ ...activeProduct });
  }, [activeProduct]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('sent');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 shadow mx-5 my-12 rounded-md flex flex-col gap-4"
    >
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
          value={category.id}
          onChange={handleInputChange}
          defaultValue=""
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
        name="sku"
        value={sku}
        onChange={handleInputChange}
      />
      <TextField
        label="Units"
        type="text"
        placeholder="units"
        fullWidth
        name="units"
        value={productMeasurements[0].unit}
        onChange={handleInputChange}
      />
      <TextField
        label="Quantity"
        type="text"
        placeholder="3"
        fullWidth
        name="quantity"
        value={stockInquiries[0].quantity}
        onChange={handleInputChange}
      />
      <TextField
        label="Price"
        type="text"
        placeholder="$21"
        fullWidth
        name="price"
        value={price}
        onChange={handleInputChange}
      />

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          defaultValue=""
          value={hasStock}
          onChange={handleInputChange}
        >
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Out Of Stock</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" type="submit">
        Update
      </Button>
    </form>
  );
};
