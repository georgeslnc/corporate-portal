import React, { useState } from 'react';
import { Employee, RootState, useAppSelector } from '../../redux/type';
import { Link } from 'react-router-dom';

export default function Handbook() {
  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter((employee: Employee) => {
    const fullName = `${employee.lastName} ${employee.firstName}`;
    const fullNameReversed = `${employee.firstName} ${employee.lastName}`;
    const query = searchQuery.toLowerCase();
    return (
      fullName.toLowerCase().includes(query) ||
      fullNameReversed.toLowerCase().includes(query) ||
      employee.lastName.toLowerCase().includes(query) ||
      employee.firstName.toLowerCase().includes(query)
    );
  });

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
            <Link to={`/employee/${employee.id}`}>
              <p>{employee.firstName}</p>
              <p>{employee.lastName}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
