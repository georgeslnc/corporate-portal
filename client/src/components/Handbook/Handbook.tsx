import React, { useState } from 'react';
import { Employee, RootState, useAppSelector } from '../../redux/type';

export default function Handbook() {
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter((employee: Employee) => {
    const fullName = `${employee.lastName} ${employee.firstName}`;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  console.log(employees);
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Введите фамилию или имя сотрудника"
      />
      {searchQuery && (
        filteredEmployees.map((employee: Employee) => (
          <div key={employee.id}>
            <p>{employee.firstName}</p>
            <p>{employee.lastName}</p>
          </div>
        ))
      )}
    </div>
  );
}


