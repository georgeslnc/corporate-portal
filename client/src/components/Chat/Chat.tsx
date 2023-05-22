import React, { useState, useEffect, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { Link } from 'react-router-dom';
import { Departament, Employee, Group, Profession, RootState, useAppSelector } from '../../redux/type';
import * as io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

//new
import { useLocation } from 'react-router-dom';
// end of new

export default function Chat({ socket }: any) {
  const [messages, setMessages] = useState([]);

  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

    // new
  const location = useLocation()
  console.log(location);
    
  useEffect(() => {
    // socket.emit('join')
  }, [])
  // end of new

  // get user from local storage
  const localData = localStorage.userData;
  const currUserId = JSON.parse(localData).userId;

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const currUser = employees.find((employee: Employee) => employee.id === Number(currUserId));
  // console.log('currUser', currUser);
  // end of get user

  const userName: string = `${currUser?.firstName} ${currUser?.lastName}`


  
  useEffect(() => {
    socket.on('messageResponse', (data: any) => setMessages([...messages, data]));
  }, [socket, messages]);
  // console.log('messages', messages);
  
  useEffect(() => {
    socket.on('vadim', (data: any) => setMessages([...name, data]));
  }, [socket, name]);
  console.log('name', name);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data: any) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} currUser={currUser} />
      <div className="chat__main">
        <ChatBody messages={messages} 
        typingStatus={typingStatus} 
        lastMessageRef={lastMessageRef} 
        currUser={currUser}
        />
        <ChatFooter socket={socket} />
      </div>
      {/* {hasNewMessages ? <div>{showNotification()}</div> : <></>} */}
    </div>
  );
}
 


// Оповещение
  // const [hasNewMessages, setHasNewMessages] = useState(false);

  // function showNotification() {
  //   return (
  //     <Link to={'/chat'}>
  //       <span>🔔</span>
  //     </Link>
  //   );
  // }

  // function handleNewMessage() {
  //   setHasNewMessages(true);
  //   showNotification();
  // }

  // function handlePageFocus() {
  //   setHasNewMessages(false);
  // }

  // useEffect(() => {
  //   window.addEventListener('focus', handlePageFocus);
  //   return () => {
  //     window.removeEventListener('focus', handlePageFocus);
  //   };
  // }, []);
  // // end off alert
