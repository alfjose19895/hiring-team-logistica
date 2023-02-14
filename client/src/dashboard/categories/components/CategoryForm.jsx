import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';

import { useForm, useUiStore } from '../../../hooks';
import { useCategoryStore } from '../../hooks';
import { CustomAlert } from './../../components/alert';

const formFields = {
  name: '',
};

const CategoryForm = () => {
  const { activeCategory, setActiveCategory, startSavingCategory } =
    useCategoryStore();
  const { closeModal, setErrorMessages, isThereAnyMsg } = useUiStore();
  const { name, formValues, handleInputChange, setFormValues } =
    useForm(formFields);

  useEffect(() => {
    if (activeCategory?.id) setFormValues({ ...activeCategory });
  }, [activeCategory]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.values(formValues).some(field => field.length < 3))
      return setErrorMessages([
        'Name must be longer than or equal to 3 characters',
      ]);

    await startSavingCategory(formValues);

    closeModal();
    setActiveCategory(null);
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
