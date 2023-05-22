import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from './redux/type';
import { getEmployees } from './redux/Thunk/employees';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import * as io from 'socket.io-client';
import Application from './components/Application/Application';
import Handbook from './components/Handbook/Handbook';
import FindEmployee from './components/Handbook/FindEmployee';
import Tree from './components/Tree/Tree';
import News from './components/News/News';
import LoginForm from './components/Auth/LoginForm';
import FastNavigate from './components/_FastNavigate/FastNavigate';
import OneGroup from './components/Tree/OneGroup';
import Documents from './components/Documents/Documents';
import Room from './components/Room/Room';

import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import NewChat from './components/Chat/NewChat';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <div style={{ paddingLeft: '266px', paddingTop: '66px' }}>
      <FastNavigate />
      {/* <NewChat /> */}
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/handbook" element={<Handbook />} />
        <Route path="/employee/:id" element={<FindEmployee />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/tree/:id" element={<OneGroup />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/newslist" element={<News />} />
        {/* <Route path="/info"  element={<info />}/> */}
        {/* Chat */}
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<NewChat />} />
        <Route path="/room" element={<Room />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/admin/employee" element={<EmployeeForm />} />
      </Routes>
    </div>
  );
}

export default App;
