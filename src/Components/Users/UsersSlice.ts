import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import { InitialState, User } from './types';
import axios from 'axios';


const initialState:InitialState={
users:[]
}

const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
     setUsers(state,action:PayloadAction<User[]>){
        state.users=action.payload;
     }
    }
})


export const getUsers=():AppThunk=>async(dispatch,getState)=>{


    try{
const response=await axios.get<User[]>(`http://localhost:5141/api/Users`);
dispatch(setUsers(response.data))

    }
    catch(err){
        console.error(err)
    }

}

export const {setUsers}=usersSlice.actions;




export default usersSlice.reducer