import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import { InitialState, Company } from './types';
import axios from 'axios';


const initialState:InitialState={
companies:[]
}

const usersSlice=createSlice({
    name:'companies',
    initialState,
    reducers:{
     setCompanies(state,action:PayloadAction<Company[]>){
        state.companies=action.payload;
     }
    }
})


export const getCompanies=():AppThunk=>async(dispatch,getState)=>{


    try{
const response=await axios.get<Company[]>(`http://localhost:5141/api/Companies`);
dispatch(setCompanies(response.data))

    }
    catch(err){
        console.error(err)
    }

}

export const {setCompanies}=usersSlice.actions;




export default usersSlice.reducer