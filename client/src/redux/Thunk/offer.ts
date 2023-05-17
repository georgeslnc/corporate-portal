import { createAsyncThunk } from "@reduxjs/toolkit";


export const postOffer = createAsyncThunk("offer/fetchOffer", async () => {
  try {
    const response = await fetch("http://localhost:3000/application");
      const data = await response.json();
      console.log(data)
      return data 
  } catch (error) {
    return Promise.reject(new Error("400"));
  }
});