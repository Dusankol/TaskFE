import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../rootReducer'
import { AppDispatch } from '../../store'
import { getCompanies } from './CompaniesSlice'
import { Company } from './types';
import type { ColumnsType } from 'antd/es/table';
import {Space} from 'antd';
import TableComponent from '../Shared/Table'

type Props={
  companies:Company[];
  onGetCompanies:()=>void;
}

type DataType ={
  key: string;
  name: string;
  city: string;
  country: number;
}

const Companies=({companies,onGetCompanies}:Props)=> {

  useEffect(()=>{
onGetCompanies()
  },[onGetCompanies]);



  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Add</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


  const data=companies.map(el=>({...el,key:el.id}))

  return (
    <div>
      <TableComponent data={data} columns={columns}/>

    </div>
  )
}

const mapStateToProps=(state:RootState)=>({
  companies:state.companies.companies
})

const mapDispatchToProps=(dispatch:AppDispatch)=>({
  onGetCompanies:()=>dispatch(getCompanies())
})

export default connect(mapStateToProps,mapDispatchToProps)(Companies)