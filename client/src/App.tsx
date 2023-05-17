import { useEffect } from 'react';
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
import Room from './components/Room/Room';



function App() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(
    (state: RootState) => state.employeesSlice.employees
  );
  

  useEffect(()=>{
    dispatch(getEmployees())
  },[])

  return (
    <>
      <Routes>

        <Route path="/handbook"  element={<Handbook />}/>
        <Route path="/employee/:id"  element={<FindEmployee />}/>
        <Route path="/tree"  element={<Tree />}/>
        <Route path="/applications"  element={<Application />}/>
        <Route path="/newslist"  element={<News />}/>
        {/* <Route path="/info"  element={<info />}/> */}
        {/* Chat */}
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/room"  element={<Room />}/>
      </Routes>
    </>
  );
}

export default App;
