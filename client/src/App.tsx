
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


function App() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(
    (state: RootState) => state.employeesSlice.employees
  );
  // console.log(employees);


  const dispatch = useAppDispatch()

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
        {/* News */}
        {/* <Route path="/info"  element={<info />}/> */}
        {/* Chat */}
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </>
  );
}

export default App;
