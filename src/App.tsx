import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navigation from './Components/Common/Navigation'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Users from './Components/Users/Users'
import Companies from './Components/Companies/Companies'
import Newsletters from './Components/Newsletters/Newsletters'
import {Provider} from 'react-redux';
import store from './store';

function App() {


  return (
    <div className="App">
      <Provider store={store}>
          <BrowserRouter>
      <Navigation />
      
  
      <Routes>


        <Route path='/' element={<Users />}/>

        <Route path='/companies' element={<Companies />}/>
        
        <Route path='/newsletters' element={<Newsletters />}/>
      </Routes>


      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
