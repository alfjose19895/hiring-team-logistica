import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';

//nested data is ok, see accessorKeys in ColumnDef below

export const Table = ({ data }) => {
  //should be memoized or stable

  const columns = useMemo(
    () => [
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
      },
      {
        accessorKey: 'stockInquiries',
        header: 'Quantity',
        Cell: ({ cell }) =>
          cell
            .getValue()
            .map(({ quantity }) => <span key={Math.random()}>{quantity}</span>),
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
                status
                  ? 'bg-green-300 text-green-800'
                  : 'bg-red-200 text-red-800'
              } `}
            >
              {status ? 'Active' : 'Out Of Stock'}
            </span>
          );
        },
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} />;
};
