import React from 'react';
import {Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

type Props={
    columns:ColumnsType<any>;
    data:any[];
}

const TableComponent = ({columns,data}:Props) => {
  return (
 <Table columns={columns} dataSource={data}/>
  )
}

export default TableComponent