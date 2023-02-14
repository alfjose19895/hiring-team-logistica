import { Button } from '@mui/material';
import { useUiStore } from '../../../hooks';

export const AddNewBtn = ({ title, color = 'secondary' }) => {
  const { openModal } = useUiStore();

  const handleClick = () => {
    openModal();
  };

  return (
    <Button color={color} onClick={handleClick} variant="contained">
      {title}
    </Button>
  );
};
