import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/type';
import { Navigate, Outlet } from 'react-router-dom';
import { getEmployees } from '../../redux/Thunk/employees';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = Boolean(localStorage.userData);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getEmployees());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Component {...rest}>
      <Outlet />
    </Component>
  );
};

export default ProtectedRoute;
