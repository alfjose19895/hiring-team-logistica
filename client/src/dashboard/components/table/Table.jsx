import { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { columnsStructure } from './colums';

export const Table = ({ data }) => {
  const columns = useMemo(() => columnsStructure, []);

  return <MaterialReactTable columns={columns} data={data} />;
};
