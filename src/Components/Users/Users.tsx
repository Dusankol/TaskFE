import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../rootReducer'
import { AppDispatch } from '../../store'
import { User } from './types';
import { getUsers } from './UsersSlice';

type Props={
  users:User[];
  onGetUsers:()=>void;
}

const Users=({users,onGetUsers}:Props)=> {

  useEffect(()=>{
onGetUsers()
  },[onGetUsers]);


  return (
   <div style={{width:'100%',height:'100%'}}>
    {users.map(el=>(
      <div style={{width:'200px',height:'50px'}} key={el.id}>{el.firstName}</div>
    ))}
   </div>
  )
}

const mapStateToProps=(state:RootState)=>({
  users:state.users.users
})

const mapDispatchToProps=(dispatch:AppDispatch)=>({
  onGetUsers:()=>dispatch(getUsers())
})

export default connect(mapStateToProps,mapDispatchToProps)(Users)