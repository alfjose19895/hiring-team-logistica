import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';
import { AddNewBtn } from './AddNewBtn';

export const Table = ({ data, titleBtn , columnsStructure}) => {
  const columns = useMemo(() => columnsStructure, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      renderTopToolbarCustomActions={() => <AddNewBtn title={titleBtn} />}
    />
  );
};
