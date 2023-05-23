import React, { useEffect, useState } from 'react';
import { useAppDispatch } from './redux/type';
import { getEmployees } from './redux/Thunk/employees';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Application from './components/Application/Application';
import Handbook from './components/Handbook/Handbook';
import FindEmployee from './components/Handbook/FindEmployee';
import Tree from './components/Tree/Tree';
import LoginForm from './components/Auth/LoginForm';
import FastNavigate from './components/_FastNavigate/FastNavigate';
import OneGroup from './components/Tree/OneGroup';
import Documents from './components/Documents/Documents';
import Room from './components/Room/Room';
import Todo from './components/Todo/Todo';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import NewChat from './components/Chat/NewChat';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';

function App() {
  const dispatch = useAppDispatch();
  const [currUserId, setCurrUserId] = useState(null);
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.userData);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(getEmployees());
    const localData = localStorage.userData;
    const userId = localData ? JSON.parse(localData).userId : null;
    setCurrUserId(userId);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployees());
    setTimeout(() => {
      setUpdate((prev) => !prev);
    }, 2000);
  }, [update]);

  useEffect(() => {
    if (isLoggedIn) {
      setCurrUserId(JSON.parse(localStorage.userData).userId);
    }
  }, [isLoggedIn]);

  return (
    <div style={{ paddingLeft: '266px', paddingTop: '67px', paddingRight: '375px' }}>
      <FastNavigate />
      {isLoggedIn && location.pathname !== '/auth/login' && <NewChat />}
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/handbook" element={<ProtectedRoute element={Handbook} currUserId={currUserId} />} />
        <Route path="/employee/:id" element={<ProtectedRoute element={FindEmployee} currUserId={currUserId} />} />
        <Route path="/tree" element={<ProtectedRoute element={Tree} currUserId={currUserId} />} />
        <Route path="/tree/:id" element={<ProtectedRoute element={OneGroup} currUserId={currUserId} />} />
        <Route path="/applications" element={<ProtectedRoute element={Application} currUserId={currUserId} />} />
        <Route path="/todo" element={<ProtectedRoute element={Todo} currUserId={currUserId} />} />
        <Route path="/" element={<ProtectedRoute element={Home} currUserId={currUserId} />} />
        <Route path="/room" element={<ProtectedRoute element={Room} currUserId={currUserId} />} />
        <Route path="/documents" element={<ProtectedRoute element={Documents} currUserId={currUserId} />} />
        <Route path="/admin/employee" element={<ProtectedRoute element={EmployeeForm} currUserId={currUserId} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
