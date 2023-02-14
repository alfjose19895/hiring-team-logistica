import { useState } from 'react';

export const useForm = initialState => {
  const [values, setValues] = useState(initialState);

  const reset = () => setValues(initialState);

  const setFormValues = formValues => setValues(formValues);

  const handleInputChange = ({ target }) =>
    setValues({
      ...values,
      [target.name]: target.value,
    });

  const handleInputChangeNested = ({ target }) => {
    setValues({
      ...values,
      [target.name]: { ...values[target.name], id: target.value },
    });
  };

  const handleInputChangeArr = ({ target }, key) => {
    setValues({
      ...values,
      [target.name]: [{ ...values[target.name][0], [key]: target.value }],
    });
  };

  return {
    ...values,
    formValues: values,
    handleInputChange,
    reset,
    setFormValues,
    handleInputChangeNested,
    handleInputChangeArr,
  };
};
