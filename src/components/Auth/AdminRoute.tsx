import React from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

// when the route is admin
const AdminRoute = ({children}:{children:React.ReactNode}) => {
    const {accountType} = useSelector((state : RootState) => state.user);
    if(token != null) return children
    else return <Navigate to={'/login'} />
}

export default AdminRoute