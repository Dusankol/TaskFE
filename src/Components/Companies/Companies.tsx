import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';
import { AppDispatch } from '../../store';
import { deleteCompany, getCompanies } from './CompaniesSlice';
import { Company } from './types';
import type { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import TableComponent from '../Shared/Table';
import { useNavigate } from 'react-router-dom';
import Button from '../Shared/Button';

type Props = {
  companies: Company[];
  onGetCompanies: () => void;
  onDeleteCompany: (id: string) => void;
};

type DataType = {
  key: string;
  name: string;
  city: string;
  country: number;
};

const Companies = ({ companies, onGetCompanies, onDeleteCompany }: Props) => {
  useEffect(() => {
    onGetCompanies();
  }, [onGetCompanies]);

  const navigate = useNavigate();

  const deleteCompanyAndUpdateList = async (id: string) => {
    await onDeleteCompany(id);

    onGetCompanies();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city'
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => navigate(`/Companies/${record.key}`)} label='Edit' />
          <Button onClick={() => deleteCompanyAndUpdateList(record.key)} label='Delete' />
        </Space>
      )
    }
  ];

  const data = companies.map(el => ({ ...el, key: el.id }));

  return (
    <div>
      <TableComponent data={data} columns={columns} title='Companies' navigateTo='/Companies/Add' />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  companies: state.companies.companies
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onGetCompanies: () => dispatch(getCompanies()),
  onDeleteCompany: (id: string) => dispatch(deleteCompany(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
