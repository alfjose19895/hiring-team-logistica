import { Button } from '@mui/material';
import CrudButtons from './CrudButtons';

export const columnsStructureProducts = [
  {
    accessorKey: 'null',
    header: 'Actions',
    enableSorting: false,
    Cell: ({ row }) => <CrudButtons row={row} tag="product" />,
  },
  {
    accessorKey: 'title',
    header: 'Product Name',
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
  },
  {
    accessorKey: 'code',
    header: 'SKU',
  },
  {
    accessorKey: 'productMeasurements',
    header: 'Units',
    Cell: ({ cell }) =>
      cell
        .getValue()
        .map(({ unit }) => <span key={Math.random()}>{unit}</span>),
    enableSorting: false,
  },
  {
    accessorKey: 'stockInquiries',
    header: 'Quantity',
    Cell: ({ cell }) =>
      cell
        .getValue()
        .map(({ quantity }) => <span key={Math.random()}>{quantity}</span>),
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    Cell: ({ cell }) => (
      <span className="font-semibold">
        {cell.getValue()?.toLocaleString?.('es-EC', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: 'hasStock',
    header: 'Status',
    Cell: ({ cell }) => {
      const status = cell.getValue();

      return (
        <span
          className={`py-1 px-6 rounded-lg font-semibold ${
            status ? 'bg-green-300 text-green-800' : 'bg-red-200 text-red-800'
          } `}
        >
          {status ? 'Active' : 'Out Of Stock'}
        </span>
      );
    },
  },
];

export const columnsStructureCategories = [
  {
    accessorKey: 'null',
    header: 'Actions',
    enableSorting: false,
    Cell: ({ row }) => <CrudButtons row={row} tag={''} />,
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'z',
    header: 'Actions',
    enableSorting: false,
    Cell: ({ row }) => (
      <Button
        variant="contained"
        style={{ backgroundColor: '#3E92CC', fontWeight: 'bold' }}
      >
        View Products
      </Button>
    ),
  },
];
