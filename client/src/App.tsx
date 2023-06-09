import React, { useEffect, useState } from 'react';
import { useAppDispatch } from './redux/type';
import { getEmployees, getOffer } from './redux/Thunk/employees';
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
import './App.css';
import { fetchNews } from './redux/Thunk/news';

function App() {
  const dispatch = useAppDispatch();
  const [currUserId, setCurrUserId] = useState(null);
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.userData);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(fetchNews());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setCurrUserId(JSON.parse(localStorage.userData).userId);
    }
  }, [isLoggedIn]);

  return (
    <div
      className="mainDiv"
      style={{
        paddingLeft: '298px',
        paddingTop: '77px',
        paddingRight: '400px',
        height: '91.1vh',
        position: 'relative',
      }}
    >
      <FastNavigate />
      <div
        style={{
          position: 'fixed',
          top: '80px',
          right: '0px',
        }}
      >
        {isLoggedIn && location.pathname !== '/auth/login' && <NewChat />}
      </div>
      <div
        className="background"
        style={{
          position: 'fixed',
          top: '150px',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '-1',
          backgroundImage: 'url(/backgroundLines1.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/handbook" element={<ProtectedRoute element={Handbook} currUserId={currUserId} />} />
        <Route path="/employee/:id" element={<ProtectedRoute element={FindEmployee} currUserId={currUserId} />} />
        <Route path="/tree" element={<ProtectedRoute element={Tree} currUserId={currUserId} />} />
        <Route path="/tree/:id" element={<ProtectedRoute element={OneGroup} currUserId={currUserId} />} />
        <Route path="/applications" element={<ProtectedRoute element={Application} currUserId={currUserId} />} />
        <Route path="/todo" element={<ProtectedRoute element={Todo} currUserId={currUserId} />} />
        <Route path="/" element={<ProtectedRoute element={Home} currUserId={currUserId} />} />
        <Route path="/chat" element={<ProtectedRoute element={NewChat} />} />
        <Route path="/room" element={<ProtectedRoute element={Room} currUserId={currUserId} />} />
        <Route path="/documents" element={<ProtectedRoute element={Documents} currUserId={currUserId} />} />
        <Route path="/admin/employee" element={<ProtectedRoute element={EmployeeForm} currUserId={currUserId} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
