import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import React from 'react';
import { useAuthStore } from '../../hooks';

const CustomAlert = () => {
  const { errorMessage } = useAuthStore();

  return (
    <Stack sx={{ width: '100%' }} spacing={2} className="mb-5">
      {errorMessage?.map((err, i) => (
        <Alert key={i} severity="error">
          {err}
        </Alert>
      ))}
    </Stack>
  );
};

export default CustomAlert;
