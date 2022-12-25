import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import { Identification, InitialState, User, UserToSave } from './types';
import axios from 'axios';
import { Company } from '../Companies/types';
import { toast } from '../Shared/Toast';

const initialState: InitialState = {
  users: [],
  userToEdit: null,
  companies: [],
  isLoading: false
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setUserToEdit(state, action: PayloadAction<User | null>) {
      state.userToEdit = action.payload;
    },
    setCompanies(state, action: PayloadAction<Identification[]>) {
      state.companies = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const { setUsers, setUserToEdit, setCompanies, setIsLoading } = usersSlice.actions;

export const getUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    const response = await axios.get<User[]>(`http://localhost:5141/api/Users`);
    dispatch(setUsers(response.data));
  } catch (err) {
    console.error(err);
  }
};

export const getCompanies = (): AppThunk => async (dispatch, getState) => {
  try {
    const response = await axios.get<Company[]>(`http://localhost:5141/api/Companies`);
    const data = response.data.map(el => ({ value: el.id, label: el.name }));
    dispatch(setCompanies(data));
  } catch (err) {
    console.error(err);
  }
};

export const saveUser =
  (user: UserToSave): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.post(`http://localhost:5141/api/Users`, user);
      console.log(response.data);
      if (response.data) {
        toast({ message: 'User was succesfully saved', type: 'success' });
      }
    } catch (err) {
      console.error(err);
      toast({ message: 'An error occured, please try again', type: 'error' });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getUserToEdit =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await axios.get<User>(`http://localhost:5141/api/Users/${id}`);
      dispatch(setUserToEdit(response.data));
    } catch (err) {
      console.error(err);
    }
  };

export const editUser =
  (id: string, user: UserToSave): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.put(`http://localhost:5141/api/Users/${id}`, user);

      toast({ message: 'User was succesfully edited', type: 'success' });
    } catch (err) {
      console.error(err);
      toast({ message: 'An error occured, please try again', type: 'error' });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const deleteUser =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await axios.delete(`http://localhost:5141/api/Users/${id}`);
      if (response.data) {
        toast({ message: 'User was succesfully deleted', type: 'success' });
      }
    } catch (err) {
      console.error(err);
      toast({ message: 'An error occured, please try again', type: 'error' });
    }
  };

export default usersSlice.reducer;
