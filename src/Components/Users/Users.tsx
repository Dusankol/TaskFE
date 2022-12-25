import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';
import { AppDispatch } from '../../store';
import TableComponent from '../Shared/Table';
import { User } from './types';
import { deleteUser, getUsers } from './UsersSlice';
import { Position, showPosition } from './utils';
import type { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from '../Shared/Button';

type Props = {
  users: User[];
  onGetUsers: () => void;
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

const Users = ({ users, onGetUsers, onDeleteUser }: Props) => {
  useEffect(() => {
    onGetUsers();
  }, [onGetUsers]);

  const navigate = useNavigate();

  const deleteUserAndUpdateList = async (id: string) => {
    await onDeleteUser(id);

    onGetUsers();
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

  const data = users.map(el => ({ ...el, key: el.id, dob: new Date(el.dob).toLocaleDateString('en-US'), position: showPosition(el.position) }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <TableComponent columns={columns} data={data} title='Users' navigateTo='/Add' />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.users.users
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onGetUsers: () => dispatch(getUsers()),
  onDeleteUser: (id: string) => dispatch(deleteUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
