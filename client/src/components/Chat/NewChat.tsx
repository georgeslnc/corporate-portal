import { useState } from 'react';
import style from './newchat.module.css';
import { Employee, RootState, useAppSelector } from '../../redux/type';
import React from 'react';

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
  let userName = `${currUser?.firstName} ${currUser?.lastName}`;

  const [ws, setWS] = useState<WebSocket | null>(null);
  const [input, setInput] = useState('');
  const [name, setName] = useState(userName);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleConnectButtonClick = () => {
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
    };

    webSocket.onmessage = (event) => {
      const evData = JSON.parse(event.data);
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
    if (!ws) return;
    ws.close();
  };

  const handleSendMessage = () => {
    if (!ws) return;
    ws.send(JSON.stringify({ type: 'Message', payload: { name, message: input } }));
    setMessages((prev) => [...prev, { name, text: input, isOur: true }]);
    setInput('');
  };

  return (
    <div className={style.container}>
      Имя: <input value={name} onChange={({ target }) => setName(target.value)} className={style.name} />
      <hr />
      {messages.map((message) => (
        <p>
          {'isOur' in message ? (
            <div>
              {message.isOur ? (
                <div className={style.our}>
                  <p>
                    <b>{message.name}</b>
                  </p>
                  <p>{message.text}</p>
                </div>
              ) : (
                <div className={style.enemy}>
                  <p>
                    <span>{message.name}</span>
                  </p>
                  <p>{message.text}</p>
                </div>
              )}
            </div>
          ) : (
            <i>{message.name} вошел/вошла в чат</i>
          )}
        </p>
      ))}
      <div className={style.footerbar}>
        <input value={input} onChange={({ target }) => setInput(target.value)} />
        <button disabled={!ws} onClick={handleSendMessage}>
          Отправить
        </button>
      </div>
      <br />
      <div className={style.btns}>
        <button disabled={!ws} onClick={handleCloseButtonClick} className={style.exit}>
          Выйти
        </button>
        <button disabled={Boolean(ws)} onClick={handleConnectButtonClick} className={style.enter}>
          Войти
        </button>
      </div>
    </div>
  );
}

export default NewChat;
