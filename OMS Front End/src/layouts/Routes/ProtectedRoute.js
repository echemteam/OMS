import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
 
  const { isLogedin,isAuthenticated } = useSelector((state) => state.auth)
  

  if(!isLogedin && !isAuthenticated )
  {
    return <Navigate to="/login" />;
    
  }
  return  children;
}

export default ProtectedRoute