import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatBody({ messages, lastMessageRef, typingStatus, currUser }: any) {
  const navigate = useNavigate();

  return (
    <>
    <div className="message__container">
        {messages.map((message: any) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">{currUser.firstName}{' '}{currUser.lastName}</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          ),
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
}




// const handleLeaveChat = () => {
//   localStorage.removeItem('userName');
//   navigate('/');
//   window.location.reload();
// };


      {/* <header className="chat__mainHeader">
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header> */}

  