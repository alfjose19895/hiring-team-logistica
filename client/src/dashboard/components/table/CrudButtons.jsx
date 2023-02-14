import React from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import { useUiStore } from '../../../hooks/useUiStore';
import { useProductStore } from '../../hooks';

const CrudButtons = ({ row }) => {
  const { openModal } = useUiStore();
  const { setActiveProduct, startDeletingProduct } = useProductStore();

  const handleEdit = product => {
    openModal();
    setActiveProduct(product);
  };

  const handleDelete = async product => {
    setActiveProduct(product);

    alert('Are you shure?');
    await startDeletingProduct(product.id);
  };

  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Tooltip arrow placement="left" title="Edit">
        <IconButton onClick={() => handleEdit(row.original)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip arrow placement="right" title="Delete">
        <IconButton color="error" onClick={() => handleDelete(row.original)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CrudButtons;
