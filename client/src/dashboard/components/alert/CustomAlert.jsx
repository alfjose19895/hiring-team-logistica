import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import React from 'react';
import { useUiStore } from '../../../hooks';

const CustomDashBoardAlert = () => {
  const { alertUi } = useUiStore();

  return (
    <Stack sx={{ width: '100%' }} spacing={2} className="mb-5">
      {typeof alertUi?.msg === 'object' ? (
        alertUi?.msg?.map((msg, i) => {
          if (msg)
            return (
              <Alert key={i} severity="error">
                {msg}
              </Alert>
            );
        })
      ) : alertUi.msg ? (
        <Alert severity="error">{alertUi?.msg}</Alert>
      ) : (
        <span></span>
      )}
    </Stack>
  );
};

export default CustomDashBoardAlert;
