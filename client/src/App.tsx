import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from './redux/type';
import { getEmployees } from './redux/Thunk/employees';
import { Route, Routes } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Home from './components/Chat/Home';
import * as io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');
import Application from "./components/Application/Application"
import Handbook from "./components/Handbook/Handbook"
import FindEmployee from "./components/Handbook/FindEmployee"
import Tree from "./components/Tree/Tree"
import News from "./components/News/News"
import LoginForm from './components/Auth/LoginForm';
import FastNavigate from './components/_FastNavigate/FastNavigate';
import OneGroup from './components/Tree/OneGroup';
import Documents from './components/Documents/Documents';



function App() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getEmployees())
  },[])

  return (
    <>
      <FastNavigate />
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/handbook"  element={<Handbook />}/>
        <Route path="/employee/:id"  element={<FindEmployee />}/>
        <Route path="/tree"  element={<Tree />}/>
        <Route path="/tree/:id"  element={<OneGroup />}/>
        <Route path="/applications"  element={<Application />}/>
        <Route path="/newslist"  element={<News />}/>
        {/* <Route path="/info"  element={<info />}/> */}
        {/* Chat */}
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </>
  );
}

export default App;
