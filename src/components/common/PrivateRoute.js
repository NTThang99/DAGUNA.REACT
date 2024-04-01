/*
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
*/

import { useState } from "react";
import { Navigate } from "react-router-dom";

const hasAnyRole = (role, authority)=>{
    for(let i =0 ;i <authority.length;i++){
        if(authority[i] === role){
            return true;
        }
    }
    return false;
}
const PrivateRoute = ({ Component, authority }) => {
 
   
// const [isAuthenticated, setIsAuthenticated] = useState(false);
    let user = JSON.parse(localStorage.getItem('user'));
    let isAuthenticated = hasAnyRole(user.roles[0], authority)
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;
