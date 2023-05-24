import ReactFlow from 'reactflow';
import { RootState, useAppSelector } from '../redux/type';

import 'reactflow/dist/style.css';

// const defaultViewport = { x: 200, y: 200, zoom: 1.5 };

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: 'Сотрудник - 1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: 'Сотрудник - 2' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// export default function OrganizationChart() {
//   const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);

//   console.log('|______|  employees:', employees);

//   const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
//   const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);

//   console.log('|______|  professions:', professions);

//   return (
//     <div style={{ width: '800px', height: '600px' }}>
//       <ReactFlow
//         nodes={initialNodes}
//         edges={initialEdges}
//         zoomOnScroll={false}
//         zoomOnPinch={false}
//         defaultViewport={defaultViewport}
//       />
//     </div>
//   );
// }

// Используем эти данные как пример
const employees = [
  {
    id: 1,
    firstName: 'Сергей',
    middleName: 'Александрович',
    lastName: 'Смирнов',
    groupId: 1,
    professionId: 4,
    email: 'smirnov0@example.com',
    phone: '+7 (979) 954-2263',
    birthday: '1986-12-14',
    photoUrl: 'https://i.pravatar.cc/150?img=69',
    createdAt: '2023-05-23T07:55:49.853Z',
    updatedAt: '2023-05-23T07:55:49.853Z',
  },
  {
    id: 2,
    firstName: 'Кирилл',
    middleName: 'Игоревич',
    lastName: 'Кузнецов',
    groupId: 3,
    professionId: 4,
    email: 'kuznetsov1@example.com',
    phone: '+7 (959) 898-1618',
    birthday: '1977-09-17',
    photoUrl: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2023-05-23T07:55:49.853Z',
    updatedAt: '2023-05-23T07:55:49.853Z',
  },
  {
    id: 3,
    firstName: 'Алексей',
    middleName: 'Павлович',
    lastName: 'Соболев',
    groupId: 5,
    professionId: 4,
    email: 'smirnov2@example.com',
    phone: '+7 (973) 800-9921',
    birthday: '1983-06-26',
    photoUrl: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2023-05-23T07:55:49.853Z',
    updatedAt: '2023-05-23T07:55:49.853Z',
  },
  {
    id: 5,
    firstName: 'Елена',
    middleName: 'Васильевна',
    lastName: 'Кислова',
    groupId: 9,
    professionId: 4,
    email: 'kislova4@example.com',
    phone: '+7 (952) 431-9901',
    birthday: '1987-07-15',
    photoUrl: 'https://i.pravatar.cc/150?img=4',
    createdAt: '2023-05-23T07:55:49.853Z',
    updatedAt: '2023-05-23T07:55:49.853Z',
  },
  {
    id: 6,
    firstName: 'Татьяна',
    middleName: 'Алексеевна',
    lastName: 'Морозова',
    groupId: 1,
    professionId: 3,
    email: 'morozova5@example.com',
    phone: '+7 (952) 811-8994',
    birthday: '1985-03-19',
    photoUrl: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2023-05-23T07:55:49.853Z',
    updatedAt: '2023-05-23T07:55:49.853Z',
  },
  {
    id: 8,
    firstName: 'Анна',
    middleName: 'Дмитриевна',
    lastName: 'Федорова',
    groupId: 3,
    professionId: 3,
    email: 'fedorova7@example.com',
    phone: '+7 (907) 778-8690',
    birthday: '1967-03-03',
    photoUrl: 'https://i.pravatar.cc/150?img=7',
    createdAt: '2023-05-23T07:55:49.853Z',
    updatedAt: '2023-05-23T07:55:49.853Z',
  },
];
const professions = [
  {
    id: 1,
    position: 'Специалист',
    rank: 1,
    createdAt: '2023-05-23T07:55:49.806Z',
    updatedAt: '2023-05-23T07:55:49.806Z',
  },
  {
    id: 2,
    position: 'Главный специалист',
    rank: 2,
    createdAt: '2023-05-23T07:55:49.806Z',
    updatedAt: '2023-05-23T07:55:49.806Z',
  },
  {
    id: 3,
    position: 'Начальник отдела',
    rank: 3,
    createdAt: '2023-05-23T07:55:49.806Z',
    updatedAt: '2023-05-23T07:55:49.806Z',
  },
  {
    id: 4,
    position: 'Начальник департамента',
    rank: 4,
    createdAt: '2023-05-23T07:55:49.806Z',
    updatedAt: '2023-05-23T07:55:49.806Z',
  },
  {
    id: 5,
    position: 'Супер-админ',
    rank: 5,
    createdAt: '2023-05-23T07:55:49.806Z',
    updatedAt: '2023-05-23T07:55:49.806Z',
  },
];

const nodes = employees.map((employee) => ({
  id: `${employee.id}`, // id должен быть строкой
  position: {
    x: 0,
    y: (5 - professions.find((p) => p.id === employee.professionId).rank) * 100,
  },
  data: { label: `${employee.firstName} ${employee.lastName} - ${employee.id}` },
}));

// const edges = employees
//   .filter((employee) => employee.professionId > 1) // исключаем сотрудников без начальников
//   .map((employee) => ({
//     id: `e${employee.id}-${employee.id - 1}`, // id должен быть строкой
//     source: `${employee.id}`,
//     target: `${employee.id - 1}`,
//   }));

const edges = employees
  .map((employee, index) => {
    const { professionId } = employee;
    const hasManager = employees.some((e) => e.professionId === professionId && e.id < employee.id);

    if (hasManager) {
      return {
        id: `e${employee.id}-${employee.id - 1}`,
        source: `${employee.id}`,
        target: `${employee.id - 1}`,
      };
    }

    return null;
  })
  .filter((edge) => edge !== null);

export default function OrganizationChart() {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <ReactFlow nodes={nodes} edges={edges} zoomOnScroll={false} zoomOnPinch={false} />
    </div>
  );
}
