import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { useProductStore } from '../../hooks';

export const ProductForm = () => {
  const { categories } = useProductStore();

  return (
    <form className="p-6 shadow mx-5 my-12 rounded-md flex flex-col gap-4">
      <TextField
        label="Product Name"
        type="text"
        placeholder="T-Shirt"
        fullWidth
        name="title"
        // value={email}
        // onChange={handleInputChange}
      />

      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          // value={'age'}
          // onChange={handleChange}
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
      />
      <TextField
        label="Units"
        type="text"
        placeholder="units"
        fullWidth
        name="units"
      />
      <TextField
        label="Quantity"
        type="text"
        placeholder="3"
        fullWidth
        name="quantity"
      />
      <TextField
        label="Price"
        type="text"
        placeholder="$21"
        fullWidth
        name="price"
      />

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          // value={'age'}
          // onChange={handleChange}
        >
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Out Of Stock</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};
