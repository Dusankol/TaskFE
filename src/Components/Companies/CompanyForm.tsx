import React, { useState, useEffect, FormEvent } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';
import { AppDispatch } from '../../store';
import { editCompany, getCompanyToEdit, saveCompany, setCompanyToEdit } from './CompaniesSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Company } from './types';
import TableComponent from '../Shared/Table';
import { Position, showPosition } from '../Users/utils';
import type { ColumnsType } from 'antd/es/table';
import { Space, Form } from 'antd';
import { deleteUser } from '../Users/UsersSlice';
import Input from '../Shared/Input';
import { toast } from '../Shared/Toast';
import Button from '../Shared/Button';

type Props = {
  companyToEdit: Company | null;
  isLoading: boolean;
  onSaveCompany: (name: string, city: string, country: string) => void;
  onGetCompanyToEdit: (id: string) => void;
  onEditCompany: (id: string, name: string, city: string, country: string) => void;
  onResetCompanyToEdit: () => void;
  onDeleteUser: (id: string) => void;
};

type DataType = {
  key: string;
  firstName: string;
  lastName: string;
  companyName: string;
  position: Position;
  dob: string;
  phoneNumber: string;
};

const CompanyForm = ({ companyToEdit, isLoading, onSaveCompany, onGetCompanyToEdit, onEditCompany, onResetCompanyToEdit, onDeleteUser }: Props) => {
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      onGetCompanyToEdit(params.id);
    }
    return () => onResetCompanyToEdit();
  }, [params.id, onGetCompanyToEdit]);

  useEffect(() => {
    if (companyToEdit) {
      setName(companyToEdit.name);
      setCity(companyToEdit.city);
      setCountry(companyToEdit.country);
    } else {
      setName('');
      setCity('');
      setCountry('');
    }
  }, [companyToEdit]);

  const onSubmit = async (e: FormEvent) => {
    //e.preventDefault();
    params.id ? onEditCompany(params.id, name, city, country) : onSaveCompany(name, city, country);

    setName('');
    setCity('');
    setCountry('');
  };

  const deleteUserAndUpdateList = async (id: string) => {
    await onDeleteUser(id);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob'
    },

    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => navigate(`/${record.key}`)} label='Edit' />
          <Button onClick={() => deleteUserAndUpdateList(record.key)} label='Delete' />
        </Space>
      )
    }
  ];

  const data = companyToEdit?.users?.map(el => ({
    ...el,
    key: el.id,
    dob: new Date(el.dob).toLocaleDateString('en-US'),
    position: showPosition(el.position),
    companyName: companyToEdit.name
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '500px', justifyContent: 'center', margin: '30px auto' }}>
        <Form onFinish={onSubmit}>
          <Form.Item rules={[{ required: true, message: 'Please input Name!' }]}>
            <Input label='Name' name='name' value={name} updateValue={setName} required />
          </Form.Item>

          <Form.Item rules={[{ required: true, message: 'Please input City!' }]}>
            <Input label='City' name='city' value={city} updateValue={setCity} required />
          </Form.Item>

          <Form.Item rules={[{ required: true, message: 'Please input Country!' }]}>
            <Input label='Country' name='country' value={country} updateValue={setCountry} required />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' isLoading={isLoading} type='primary' label='Submit' />
          </Form.Item>
        </Form>
      </div>
      <div>{companyToEdit ? <TableComponent columns={columns} data={data ?? []} title={'Users'} navigateTo='/Add' /> : null}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  companyToEdit: state.companies.companyToEdit,
  isLoading: state.companies.isLoading
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSaveCompany: (name: string, city: string, country: string) => dispatch(saveCompany(name, city, country)),
  onGetCompanyToEdit: (id: string) => dispatch(getCompanyToEdit(id)),
  onEditCompany: (id: string, name: string, city: string, country: string) => dispatch(editCompany(id, name, city, country)),
  onResetCompanyToEdit: () => dispatch(setCompanyToEdit(null)),
  onDeleteUser: (id: string) => dispatch(deleteUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
