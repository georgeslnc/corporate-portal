import { createAsyncThunk } from '@reduxjs/toolkit';

const localData = localStorage.userData;
const currUserId = localData ? JSON.parse(localData).userId : null;

export const getTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${currUserId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const delTodo = createAsyncThunk('todos/delTodos/', async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/deleteTodos/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log(id);
      return id;
    }
  } catch (error) {
    console.log(error);
  }
});

export const addTodo = createAsyncThunk('todos/AddTodo', async (arr: [string, string, number]) => {
  const [todo, time, employeeId] = arr;
  try {
    const response = await fetch('http://localhost:3000/todos/newTodo', {
      method: 'Post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo, time, employeeId }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return Promise.reject(new Error('400'));
  }
});

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async ({ id, todo, time }: { id: number; todo: string; time: string }) => {
    try {
      const response = await fetch('http://localhost:3000/todos/editTodo', {
        method: 'Post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, todo, time }),
      });
      if (response.ok) {
        return { id, todo, time };
      }
    } catch (error) {
      return Promise.reject(new Error('400'));
    }
  },
);

export const statusTodo = createAsyncThunk('todos/statusTodo', async ({ id }: { id: number }) => {
  console.log(id)
  try {
    const response = await fetch('http://localhost:3000/todos/statusTodo', {
      method: 'Post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      return { id };
    }
  } catch (error) {
    return Promise.reject(new Error('400'));
  }
});
