import React from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import { useUiStore } from '../../../hooks/useUiStore';
import { useCategoryStore, useProductStore } from '../../hooks';

const dictionary = {
  product: {
    setActive: (cb, product) => cb(product),
    delete: (cb, id) => cb(id),
  },
  category: {
    setActive: (cb, product) => cb(product),
    delete: (cb, id) => cb(id),
  },
};

const CrudButtons = ({ row, tag }) => {
  const { openModal } = useUiStore();
  const { setActiveProduct, startDeletingProduct } = useProductStore();
  const { setActiveCategory, startDeletingCategory } = useCategoryStore();

  const handleEdit = original => {
    openModal();
    (tag === 'product' &&
      dictionary[tag]['setActive'](setActiveProduct, original)) ||
      dictionary[tag]['setActive'](setActiveCategory, original);
  };

  const handleDelete = async original => {
    setActiveProduct(original);

    (confirm('Are you shure?') &&
      tag === 'product' &&
      (await dictionary[tag]['delete'](startDeletingProduct, original.id))) ||
      (await dictionary[tag]['delete'](startDeletingCategory, original.id));
  };

  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Tooltip arrow placement="left" title="Edit">
        <IconButton onClick={() => handleEdit(row.original)}>
          <Edit />
        </IconButton>
      </Tooltip>
      {tag !== 'category' && (
        <Tooltip arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row.original)}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default CrudButtons;
