import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/type';
import { getEmployees } from './redux/Thunk/employees';
import { Route, Routes } from 'react-router-dom';
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
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import NewChat from './components/Chat/NewChat';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <div style={{ paddingLeft: '266px', paddingTop: '67px' }}>
      <FastNavigate />
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/handbook" element={<ProtectedRoute element={Handbook} />} />
        <Route path="/employee/:id" element={<ProtectedRoute element={FindEmployee} />} />
        <Route path="/tree" element={<ProtectedRoute element={Tree} />} />
        <Route path="/tree/:id" element={<ProtectedRoute element={OneGroup} />} />
        <Route path="/applications" element={<ProtectedRoute element={Application} />} />
        {/* <Route path="/info"  element={<info />}/> */}
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="/chat" element={<ProtectedRoute element={NewChat} />} />
        <Route path="/room" element={<ProtectedRoute element={Room} />} />
        <Route path="/documents" element={<ProtectedRoute element={Documents} />} />
        <Route path="/admin/employee" element={<ProtectedRoute element={EmployeeForm} />} />
        {/* Добавленный маршрут для отображения страницы "Page Not Found" */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
