import { Position } from './utils';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  position: Position;
  companyId: string;
  companyName: string;
  dob: Date;
  phoneNumber: string;
};

export type UserToSave = Omit<User, 'id' | 'companyName'>;

export type Identification = {
  value: string;
  label: string;
};

export type InitialState = {
  users: User[];
  userToEdit: User | null;
  companies: Identification[];
  isLoading: boolean;
};
