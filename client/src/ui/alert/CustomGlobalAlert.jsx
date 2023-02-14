import { Alert, Stack } from '@mui/material';
import { useUiStore } from '../../hooks';

const CustomGlobalAlert = () => {
  const { globalAlert } = useUiStore();

  return (
    <div className="relative z-0 w-1/3">
      <div className="absolute inset-0 flex justify-end z-10">
        <Stack sx={{ width: '100%' }} spacing={2} className="mb-5">
          {typeof globalAlert?.msg === 'object' ? (
            globalAlert?.msg?.map((msg, i) => {
              if (msg)
                return (
                  <Alert key={i} severity="error">
                    {msg}
                  </Alert>
                );
            })
          ) : globalAlert.msg ? (
            <Alert severity="error">{globalAlert?.msg}</Alert>
          ) : (
            <span></span>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default CustomGlobalAlert;
