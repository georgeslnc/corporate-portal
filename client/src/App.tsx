import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from './redux/type';
import { getEmployees } from './redux/Thunk/employees';
import { Route, Routes } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Home from './components/Chat/Home';
import * as io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

function App() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(
    (state: RootState) => state.employeesSlice.employees
  );
  // console.log(employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <>
      <Routes>
        {/* <Route path="/handbook"  element={<HandBook />}/> */}
        {/* <Route path="/tree"  element={<tree />}/> */}
        {/* <Route path="/applications"  element={<applications />}/> */}
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
