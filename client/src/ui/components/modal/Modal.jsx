import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useUiStore } from '../../../hooks/useUiStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ children }) => {
  const { isModalOpen, closeModal } = useUiStore();

  return (
    <div>
      <Modal open={isModalOpen} onClose={() => closeModal()}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
