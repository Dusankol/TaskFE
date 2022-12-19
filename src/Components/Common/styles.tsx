import styled from 'styled-components';
import {Link} from 'react-router-dom'


export const NavigationContainer=styled.div`
width:100%;
height:50px;
display:flex;
justify-content:flex-end;
align-items:center;
background-color:black;
color:white;
`

export const NavigationList=styled.ul`
display:flex;
`

export const NavigationListItem=styled.li`
margin-right:10px;
color:white;
list-style-type:none;
a{
    color:${({active}:{active:boolean})=>active?'red':'white'};
}
`

export const StyledLink=styled(Link)`

text-decoration:none;
`