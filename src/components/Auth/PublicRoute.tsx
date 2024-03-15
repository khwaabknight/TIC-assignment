import React from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


// when the account is signed in
const PublicRoute = ({children}:{children:React.ReactNode}) => {
    const {token} = useSelector((state : RootState) => state.auth);
    if(!token) return children
    else return <Navigate to={'/'} />
}

export default PublicRoute