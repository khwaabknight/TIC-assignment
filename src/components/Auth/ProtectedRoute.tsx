import React from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


// when the account is signed in
const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const {token} = useSelector((state : RootState) => state.auth);
    if(token != null) return children
    else return <Navigate to={'/login'} />
}

export default ProtectedRoute