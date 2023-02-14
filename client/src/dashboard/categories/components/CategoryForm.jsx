import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';

import { useForm, useUiStore } from '../../../hooks';
import { useProductStore } from '../../hooks';

const formFields = {
  name: '',
};

const CategoryForm = () => {
  const { activeCategory, setActiveCategory } = useProductStore();
  const { closeModal } = useUiStore();
  const { name, formValues, handleInputChange, setFormValues } =
    useForm(formFields);

  useEffect(() => {
    if (activeCategory?.id) setFormValues({ ...activeCategory });
  }, [activeCategory]);

  const handleSubmit = async e => {
    e.preventDefault();

    // await startSavingProduct(formValues);
    console.log(formValues);

    closeModal();
    setActiveCategory(null);
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
        name="name"
        value={name}
        onChange={handleInputChange}
      />

      <Button variant="contained" type="submit">
        {activeCategory?.id ? 'Update' : 'Create'}
      </Button>
    </form>
  );
};

export default CategoryForm;
