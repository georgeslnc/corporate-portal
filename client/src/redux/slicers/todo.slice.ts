import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getTodos, addTodo, delTodo, editTodo, statusTodo } from '../Thunk/Todos';

export interface ITodo {
  id: number;
  time: string;
  todo: string;
  completed: boolean;
  employeeId: number;
}

interface ITodos {
  todos: ITodo[];
}

export const initialState: ITodos = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload.result;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(delTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.todos = state.todos.map((el) => {
        if (el.id === action.payload?.id) {
          return { ...el, todo: action.payload?.todo, time: action.payload?.time };
        }
        return el;
      });
    });
    builder.addCase(statusTodo.fulfilled, (state, action) => {
      state.todos = state.todos.map((el) => {
        if (el.id === action.payload?.id) {
          return { ...el, completed: !el.completed };
        }
        return el;
      });
    });
  },
});

export default todoSlice.reducer;
