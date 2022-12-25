import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Navigation from './Components/Common/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Components/Users/Users';
import Companies from './Components/Companies/Companies';
import Newsletters from './Components/Newsletters/Newsletters';
import { Provider } from 'react-redux';
import store from './store';
import CompanyForm from './Components/Companies/CompanyForm';
import UserForm from './Components/Users/UserForm';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />

          <Routes>
            <Route path='/' element={<Users />} />

            <Route path='/companies' element={<Companies />} />

            <Route path='/companies/:id' element={<CompanyForm />} />

            <Route path='/companies/add' element={<CompanyForm />} />

            <Route path='/:id' element={<UserForm />} />

            <Route path='/add' element={<UserForm />} />

            <Route path='/newsletters' element={<Newsletters />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
