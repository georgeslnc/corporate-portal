import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { Employee } from '../../redux/type';

export default function OneGroupChart({
  selectedGroupAll,
  departmentHead,
}: {
  selectedGroupAll: Employee[];
  departmentHead: Employee[];
}) {
  function createFlowData(employees: Employee[]) {
    const offset = 400;
    const groupHead = employees.filter((employee: Employee) => employee.professionId === 3);
    const mainSpecGroup = employees.filter((employee: Employee) => employee.professionId === 2);
    const specGroup = employees.filter((employee: Employee) => employee.professionId === 1);
    const nodes = [
      {
        id: '4',
        type: 'default',
        position: { x: offset, y: -15 },
        data: {
          label: (
            <div>
              <h3 style={{ fontSize: '17px' }}>Начальник департамента</h3>
              <div style={{ background: 'none' }}>
                <img
                  src={departmentHead[0]?.photoUrl}
                  alt={'Photo-dep'}
                  style={{ width: '65px', height: '65px', borderRadius: '50px' }}
                />
                <p style={{ margin: 0, fontSize: '14px' }}>{departmentHead[0]?.firstName}</p>
                <p style={{ margin: 0, fontSize: '14px' }}>{departmentHead[0]?.lastName}</p>
              </div>
            </div>
          ),
          employees: departmentHead,
        },
      },
      {
        id: '3',
        type: 'default',
        position: { x: offset, y: 130 },
        data: {
          label: (
            <div>
              <h3 style={{ fontSize: '17px' }}>Начальник отдела</h3>
              <div style={{ background: 'none' }}>
                <img
                  src={groupHead[0]?.photoUrl}
                  alt={'Photo-dep'}
                  style={{ width: '65px', height: '65px', borderRadius: '50px' }}
                />
                <p style={{ margin: 0, fontSize: '14px' }}>{groupHead[0]?.firstName}</p>
                <p style={{ margin: 0, fontSize: '14px' }}>{groupHead[0]?.lastName}</p>
              </div>
            </div>
          ),
          employees: groupHead,
        },
      },
      {
        id: '2',
        type: 'default',
        position: { x: offset, y: 275 },
        data: {
          label: (
            <div
              style={{
                background: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h3 style={{ fontSize: '17px' }}>Главные специалисты</h3>
              <div
                style={{
                  background: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '25px',
                  justifyContent: 'center',
                  // flexWrap: 'wrap',
                }}
              >
                {mainSpecGroup.map((employee, i) => (
                  <div
                    key={`employee ${i + 100}`}
                    style={{
                      background: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <img
                      src={employee?.photoUrl}
                      alt={'Photo-emp'}
                      style={{ width: '65px', height: '65px', borderRadius: '50px' }}
                    />
                    <p style={{ margin: 0, fontSize: '14px' }}>{employee.firstName}</p>
                    <p style={{ margin: 0, fontSize: '14px' }}>{employee.lastName}</p>
                  </div>
                ))}
              </div>
            </div>
          ),
          employees: mainSpecGroup,
        },
      },
      {
        id: '1',
        position: { x: offset, y: 430 },
        data: {
          label: (
            <div
              style={{
                background: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h3 style={{ fontSize: '17px' }}>Cпециалисты</h3>
              <div
                style={{
                  background: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '25px',
                  justifyContent: 'center',
                }}
              >
                {specGroup.map((employee, i) => (
                  <div
                    key={`employee ${i + 200}`}
                    style={{
                      background: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <img
                      src={employee?.photoUrl}
                      alt={'Photo-emp'}
                      style={{ width: '65px', height: '65px', borderRadius: '50px' }}
                    />
                    <p style={{ margin: 0, fontSize: '14px' }}>{employee.firstName}</p>
                    <p style={{ margin: 0, fontSize: '14px' }}>{employee.lastName}</p>
                  </div>
                ))}
              </div>
            </div>
          ),
          employees: specGroup,
        },
      },
    ];

    const edges = [
      { id: 'e4-3', source: '4', target: '3' },
      { id: 'e3-2', source: '3', target: '2' },
      { id: 'e2-1', source: '2', target: '1' },
    ];

    return { nodes, edges };
  }

  const flowData = createFlowData(selectedGroupAll);

  return (
    <div style={{ width: '900px', height: '670px', pointerEvents: 'none' }}>
      <ReactFlow
        nodes={flowData.nodes}
        snapToGrid={false}
        edges={flowData.edges}
        minZoom={1.05}
        maxZoom={1.05}
        nodesDraggable={true}
        zoomOnScroll={false}
        zoomOnPinch={false}
      />
    </div>
  );
}
