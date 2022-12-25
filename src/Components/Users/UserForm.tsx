import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';
import { AppDispatch } from '../../store';
import { editUser, getCompanies, getUserToEdit, saveUser, setUserToEdit } from './UsersSlice';
import { useParams } from 'react-router-dom';
import { Identification, User, UserToSave } from './types';
import { Position } from './utils';
import { DatePicker, Form } from 'antd';
import Select from '../Shared/Select';
import Input from '../Shared/Input';
import { Company } from '../Companies/types';
import Button from '../Shared/Button';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type Props = {
  userToEdit: User | null;
  companies: Identification[];
  companyToEdit: Company | null;
  isLoading: boolean;
  onSaveUser: (user: UserToSave) => void;
  onGetUserToEdit: (id: string) => void;
  onEditUser: (id: string, user: UserToSave) => void;
  onResetUserToEdit: () => void;
  onGetCompanies: () => void;
};

const UserForm = ({
  userToEdit,
  companies,
  companyToEdit,
  isLoading,
  onSaveUser,
  onGetUserToEdit,
  onEditUser,
  onResetUserToEdit,
  onGetCompanies
}: Props) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [position, setPosition] = useState<Position>(Position.SoftwareDeveloper);
  const [companyName, setCompanyName] = useState<Identification>({ label: '', value: '' });
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const params = useParams();

  useEffect(() => {
    onGetCompanies();
    if (params.id) {
      onGetUserToEdit(params.id);
    }

    return () => onResetUserToEdit();
  }, [params.id, onGetUserToEdit]);

  useEffect(() => {
    if (userToEdit) {
      setFirstName(userToEdit.firstName);
      setLastName(userToEdit.lastName);
      setDob(new Date(userToEdit.dob).toLocaleDateString('en-US'));
      setPosition(userToEdit.position);
      setCompanyName({ label: userToEdit.companyName, value: userToEdit.companyId });
      setPhoneNumber(userToEdit.phoneNumber);
    } else if (companyToEdit) {
      setCompanyName({ label: companyToEdit.name, value: companyToEdit.id });
    } else {
      setFirstName('');
      setLastName('');
      setDob(new Date().toLocaleDateString('en-US'));
      setPosition(Position.SoftwareDeveloper);
      setCompanyName({ label: '', value: '' });
      setPhoneNumber('');
    }
  }, [userToEdit]);

  const onSubmit = async () => {
    const user = { firstName, lastName, dob: new Date(dob), position, companyId: companyName?.value, phoneNumber };

    params.id ? onEditUser(params.id, user) : onSaveUser(user);

    setFirstName('');
    setLastName('');
    setDob(new Date().toLocaleDateString('en-US'));
    setPosition(Position.SoftwareDeveloper);
    setCompanyName({ label: '', value: '' });
    setPhoneNumber('');
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '500px', justifyContent: 'center', margin: '30px auto' }}>
        <Form onFinish={onSubmit}>
          <Form.Item rules={[{ required: true }]}>
            <Input label='First Name' name='firstName' value={firstName} updateValue={setFirstName} required />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Input label='Last Name' name='lastName' value={lastName} updateValue={setLastName} required />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <label htmlFor='dob' style={{ marginBottom: '10px' }}>
                DOB
              </label>
              <DatePicker
                value={dayjs(dob)}
                onChange={(value: any, dateString: string) => setDob(dateString)}
                format={'MM/DD/YYYY'}
                clearIcon={false}
              />
            </div>
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Select
              label='Position'
              value={position}
              defaultValue={Position.SoftwareDeveloper}
              updateValue={setPosition}
              name='position'
              options={[
                {
                  value: Position.Manager,
                  label: 'Manager'
                },
                {
                  value: Position.QAEngeneer,
                  label: 'QA Engineer'
                },
                {
                  value: Position.SoftwareDeveloper,
                  label: 'Software Developer'
                },
                {
                  value: Position.Stuff,
                  label: 'Stuff'
                }
              ]}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Select updateValue={setCompanyName} options={companies} value={companyName} label='Company Name' name='companyName' />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Input label='Phone Number' name='phoneNumber' value={phoneNumber} updateValue={setPhoneNumber} required />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              isLoading={isLoading}
              type='primary'
              label='Submit'
              // onClick={onSubmit}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  userToEdit: state.users.userToEdit,
  companies: state.users.companies,
  companyToEdit: state.companies.companyToEdit,
  isLoading: state.users.isLoading
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSaveUser: (user: UserToSave) => dispatch(saveUser(user)),
  onGetUserToEdit: (id: string) => dispatch(getUserToEdit(id)),
  onEditUser: (id: string, user: UserToSave) => dispatch(editUser(id, user)),
  onResetUserToEdit: () => dispatch(setUserToEdit(null)),
  onGetCompanies: () => dispatch(getCompanies())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
