import React,{useState} from 'react';

import { NavigationContainer, NavigationList, NavigationListItem, StyledLink } from './styles';

type Props={

}

const Navigation=()=> {
    const [activeTab,setActiveTab]=useState<string>('')

    const navLinks=[{name:'Users',id:''},{name:'Companies',id:'companies'},{name:'Newsletters',id:'newsletters'}]
  return (
    <NavigationContainer>
        <NavigationList>
        {navLinks.map(el=>(  
                <NavigationListItem key={el.id} active={activeTab===el.id}>
                <StyledLink to={el.id} onClick={()=>setActiveTab(el.id)} >{el.name}</StyledLink>
                </NavigationListItem> 
        ))}
  </NavigationList>
    </NavigationContainer>
  )
}


export default Navigation
