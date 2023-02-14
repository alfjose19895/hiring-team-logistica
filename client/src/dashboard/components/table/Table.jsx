import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';
import { AddNewBtn } from './AddNewBtn';
import { columnsStructure } from './colums';

export const Table = ({ data, titleBtn }) => {
  const columns = useMemo(() => columnsStructure, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      renderTopToolbarCustomActions={() => <AddNewBtn title={titleBtn} />}
    />
  );
};
