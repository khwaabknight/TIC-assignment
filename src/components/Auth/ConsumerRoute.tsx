import React from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { accountTypes } from '@/data/constants';

// when the route is consumer only
const AdminRoute = ({children}:{children:React.ReactNode}) => {

    const {accountType} = useSelector((state : RootState) => state.user.user);
    if(accountType === accountTypes.consumer) return children
    else {
        return <Navigate to={'/'} />
    }
}

export default AdminRoute