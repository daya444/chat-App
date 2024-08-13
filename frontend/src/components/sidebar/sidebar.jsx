import React from 'react'
import SearchInput from './searchInput'
import {ListOfUser} from "./listOfUser"
import Logout from './logout'


 const SideBar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex  flex-col'>
        <SearchInput/>
        <div className='divider px-3'/>
        <ListOfUser/>
        <Logout/>
    </div>
  )
}

export default  SideBar