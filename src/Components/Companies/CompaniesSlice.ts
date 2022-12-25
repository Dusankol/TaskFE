import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import { InitialState, Company } from './types';
import axios from 'axios';
import { toast } from '../Shared/Toast';

const initialState: InitialState = {
  companies: [],
  companyToEdit: null,
  isLoading: false
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
    },
    setCompanyToEdit(state, action: PayloadAction<Company | null>) {
      state.companyToEdit = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const { setCompanies, setCompanyToEdit, setIsLoading } = companiesSlice.actions;

export const getCompanies = (): AppThunk => async (dispatch, getState) => {
  try {
    const response = await axios.get<Company[]>(`http://localhost:5141/api/Companies`);
    dispatch(setCompanies(response.data));
  } catch (err) {
    console.error(err);
  }
};

export const saveCompany =
  (name: string, city: string, country: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.post(`http://localhost:5141/api/Companies`, { name, city, country });
      if (response.data) {
        toast({ message: 'Company wasa succesfully saved', type: 'success' });
      }
    } catch (err) {
      console.error(err);
      toast({ message: 'An error occured, please try again', type: 'error' });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getCompanyToEdit =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await axios.get<Company>(`http://localhost:5141/api/Companies/${id}`);
      dispatch(setCompanyToEdit(response.data));
    } catch (err) {
      console.error(err);
    }
  };

export const editCompany =
  (id: string, name: string, city: string, country: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.put(`http://localhost:5141/api/Companies/${id}`, { id, name, city, country });

      toast({ message: 'Company wasa succesfully edited', type: 'success' });
    } catch (err) {
      console.error(err);
      toast({ message: 'An error occured, please try again', type: 'error' });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const deleteCompany =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await axios.delete(`http://localhost:5141/api/Companies/${id}`);
      toast({ message: 'Company was succesfully deleted', type: 'success' });
    } catch (err) {
      console.error(err);
      toast({ message: 'An error occured, please try again', type: 'error' });
    }
  };

export default companiesSlice.reducer;
