// import React from 'react';
// import {Table} from 'antd';
// import type { ColumnsType } from 'antd/es/table';

// type Props={
//     columns:ColumnsType<any>;
//     data:any[];
// }

// const TableComponent = ({columns,data}:Props) => {
//   return (
//  <Table columns={columns} dataSource={data}/>
//   )
// }

// export default TableComponent

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

type Props = {
  columns: ColumnsType<any>;
  data: any[];
  title: string;
  navigateTo: string;
};

const TableComponent = ({ columns, data, title, navigateTo }: Props) => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>{title}</h1>
        <Button label='Add' onClick={() => navigate(navigateTo)} />
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default TableComponent;
