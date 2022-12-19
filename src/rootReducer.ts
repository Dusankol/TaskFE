
import {combineReducers} from '@reduxjs/toolkit';
import usersReducer from './Components/Users/UsersSlice';
import companiesReducer from './Components/Companies/CompaniesSlice';
import newslettersReducer from './Components/Newsletters/NewslettersSlice';


const rootReducer=combineReducers({
users:usersReducer,
companies:companiesReducer,
newsletters:newslettersReducer
});

export type RootState=ReturnType<typeof rootReducer>;

export default rootReducer;