import { User } from '../Users/types';

export type Company = {
  id: string;
  name: string;
  city: string;
  country: string;
  users: User[] | null;
};

export type InitialState = {
  companies: Company[];
  companyToEdit: Company | null;
  isLoading: boolean;
};
