import React, { useEffect, useState } from 'react';

export default function ChatBar({ socket, currUser }: any) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data: any) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Чат ГОПОТЫ</h2>

      <div>
        <h4 className="chat__header">Сейчас на сайте</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
