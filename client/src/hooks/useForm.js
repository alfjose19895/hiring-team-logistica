import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialState = {}, formValidations = {}) => {
  const [values, setValues] = useState(initialState);
  const [formValidation, setFormValidation] = useState({});

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  useEffect(() => {
    createValidators();
  }, [values]);

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

  // Validations
  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(values[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
    // console.log(formCheckedValues);
  };

  return {
    ...values,
    formValues: values,
    handleInputChange,
    reset,
    setFormValues,
    handleInputChangeNested,
    handleInputChangeArr,

    ...formValidation,
    formValidation: [...Object.values(formValidation)],
    isFormValid,
  };
};
