import CircularProgress from '@mui/material/CircularProgress';

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default LoaderSpinner;
