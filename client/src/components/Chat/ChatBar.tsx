// import React, { useEffect, useState } from 'react';

// export default function ChatBar({ socket, currUser }: any) {
//   // const [users, setUsers] = useState([]);
//   const [presUsers, setUsers] = useState([]);

//    // check inside
//   //  const presUsers: any[] = []
//    // componentDidMount() {
//    //   if (this.props.history.location.pathname === '/chat') {
//      //     presUsers.push(userName)
//      //   }
//      // }
// const userName: string = `${currUser?.firstName} ${currUser?.lastName}`
// function pushArr() {
//   presUsers.push(userName)
//   return presUsers
// }
// pushArr()
// console.log('presUsers', presUsers);
   
//    // end check


//   useEffect(() => {
//     socket.on('newUserResponse', (data: any) => setUsers(data));
//   }, [socket, presUsers]);

//   return (
//     <div className="chat__sidebar">
//       <h2>Чат ГОПОТЫ</h2>

//       <div>
//         <h4 className="chat__header">Сейчас на сайте</h4>
//         <div className="chat__users">
//           {presUsers.map((user:any) => (
//             <p key={user.socketID}>{user}</p>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useLocale } from 'antd/es/locale';
import React, { useEffect, useState } from 'react';

export default function ChatBar({ socket, currUser }: any) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data: any) => setUsers(data));
  }, [socket]);

  const userName: string = `${currUser?.firstName} ${currUser?.lastName}`;

  return (
    <div className="chat__sidebar">
      <h2>Чат ГОПОТЫ</h2>

      <div>
        <h4 className="chat__header">Сейчас на сайте</h4>
        <div className="chat__users">
          {users.map((user:any) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
          <p>{userName}</p>
          <hr />
        </div>
      </div>
    </div>
  );
}