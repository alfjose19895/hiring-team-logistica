import React from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import { useUiStore } from '../../../hooks/useUiStore';
import { useProductStore } from '../../hooks';

const dictionary = {
  product: {
    setActive: (cb, product) => cb(product),
    delete: (cb, id) => cb(id),
  },
  category: '',
};

const CrudButtons = ({ row, tag }) => {
  const { openModal } = useUiStore();
  const { setActiveProduct, startDeletingProduct } = useProductStore();

  const handleEdit = original => {
    openModal();
    dictionary[tag]['setActive'](setActiveProduct, original);
  };

  const handleDelete = async original => {
    setActiveProduct(original);

    confirm('Are you shure?') &&
      (await dictionary[tag]['delete'](startDeletingProduct, original.id));
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
