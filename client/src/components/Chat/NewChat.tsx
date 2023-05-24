import { useState, useEffect, useRef } from 'react';
import style from './newchat.module.css';
import { Employee, RootState, useAppSelector } from '../../redux/type';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type Message =
  | {
      name: string;
      text: string;
      isOur: boolean;
    }
  | {
      name: string;
    };

function NewChat() {
  // get user from local storage
  const localData = localStorage.userData;
  const currUserId = JSON.parse(localData).userId;

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const currUser = employees.find((employee: Employee) => employee.id === Number(currUserId));
  const userName = currUser ? `${currUser?.firstName} ${currUser?.lastName}` : 'загрузка...';

  const [ws, setWS] = useState<WebSocket | null>(null);
  const [input, setInput] = useState('');
  const [name, setName] = useState(userName);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    setName(userName);
  }, [employees]);

  const handleConnectButtonClick = () => {
    setShowBtn((prev) => !prev);
    if (ws) return;
    const webSocket = new WebSocket('ws://localhost:4000');
    webSocket.onopen = () => {
      console.log('ws open');
      setWS(webSocket);
      webSocket.send(JSON.stringify({ type: 'Connect', payload: { name } }));
    };

    webSocket.onclose = () => {
      console.log('ws close');
      setWS(null);
      setTimeout(() => {
        handleCloseButtonClick();
        handleConnectButtonClick();
      }, 0);
    };

    webSocket.onmessage = (event) => {
      const evData = JSON.parse(event.data);
      console.log('log from chat');

      switch (evData.type) {
        case 'Connect':
          setMessages((prev) => [...prev, { name: evData.payload.name }]);
          break;
        case 'Message':
          setMessages((prev) => [
            ...prev,
            {
              name: evData.payload.name,
              text: evData.payload.message,
              isOur: false,
            },
          ]);
          break;
        default:
          console.log('UNKNOWN EVENT');
      }
    };
  };

  const handleCloseButtonClick = () => {
    setShowBtn((prev) => !prev);
    if (!ws) return;
    ws.close();
  };

  const handleSendMessage = () => {
    if (!ws) return;
    ws.send(JSON.stringify({ type: 'Message', payload: { name, message: input } }));
    setMessages((prev) => [...prev, { name, text: input, isOur: true }]);
    setInput('');
  };

  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Typography component="span" className={style.container}>
      Имя: <input value={name ? name : 'загрузка...'} onChange={({ target }) => setName(target.value)} className={style.name} />
      <hr />
      <div className={style.message} ref={messageRef}>
        {messages.map((message, index) => (
          <div key={`message-${index}`}>
            {'isOur' in message ? (
              <p>
                {message.isOur ? (
                  <p className={style.our}>
                    <p className={style.p}>
                      <b>{message.name}</b>
                    </p>
                    <p className={style.p}>{message.text}</p>
                  </p>
                ) : (
                  <p className={style.enemy}>
                    <p className={style.p}>
                      <span>{message.name}</span>
                    </p>
                    <p className={style.p}>{message.text}</p>
                  </p>
                )}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className={style.inputMessage}>
        <div className={style.footerbar}>
          {showBtn && (
            <>
              <input value={input} onChange={({ target }) => setInput(target.value)} />
              <Button
                variant="contained"
                disabled={!ws}
                onClick={handleSendMessage}
                sx={{
                  color: 'black',
                  backgroundColor: 'rgb(203, 210, 218)',
                  marginLeft: '10px',
                  '&:hover': {
                    textDecoration: 'none',
                    backgroundColor: 'rgba(25, 118, 210, 0.4)',
                  },
                }}
              >
                <Typography sx={{ color: '#1976d2', display: 'flex' }}>
                  <SendIcon fontSize="small" />
                </Typography>
              </Button>
            </>
          )}
        </div>
        <br />
        <div className={style.btns}>
          {showBtn ? (
            <Button
              variant="contained"
              disabled={!ws}
              onClick={handleCloseButtonClick}
              sx={{
                color: 'black',
                backgroundColor: 'rgb(203, 210, 218)',
                '&:hover': {
                  textDecoration: 'none',
                  backgroundColor: 'rgba(25, 118, 210, 0.4)',
                },
              }}
            >
              <Typography sx={{ color: '#1976d2', display: 'flex' }}>
                ВЫЙТИ
                <ExitToAppIcon />
              </Typography>
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={Boolean(ws)}
              onClick={handleConnectButtonClick}
              sx={{
                color: 'black',
                backgroundColor: 'rgb(203, 210, 218)',
                '&:hover': {
                  textDecoration: 'none',
                  backgroundColor: 'rgba(25, 118, 210, 0.4)',
                },
              }}
            >
              <Typography sx={{ color: '#1976d2', display: 'flex' }}>
                ВОЙТИ
                <LoginIcon />
              </Typography>
            </Button>
          )}
        </div>
      </div>
    </Typography>
  );
}

export default NewChat;
