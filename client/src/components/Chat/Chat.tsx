import React, { useState, useEffect, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { Link } from 'react-router-dom';

export default function Chat({ socket }:any) {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  // Оповещение
  const [hasNewMessages, setHasNewMessages] = useState(false);

  function showNotification() {
    return (
    <Link to={'/chat'}><span>🔔</span></Link>)
  }

  function handleNewMessage() {
    setHasNewMessages(true);
    showNotification();
  }

  function handlePageFocus() {
    setHasNewMessages(false);
  }

  useEffect(() => {
    window.addEventListener('focus', handlePageFocus);
    return () => {
      window.removeEventListener('focus', handlePageFocus);
    }
  }, []);
  // end off alert

  useEffect(() => {
    socket.on('messageResponse', (data:any) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data: any) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className="chat__main">
        <ChatBody 
        messages={messages}
        typingStatus={typingStatus}
        lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
      {
      hasNewMessages 
      ? <div>{showNotification()}</div>
      : <>{showNotification()}</>
      }
    </div>
  );
}

