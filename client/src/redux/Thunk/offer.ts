import { createAsyncThunk } from "@reduxjs/toolkit";
import { OfferData } from "../../components/Application/Application";


export const postOffer = createAsyncThunk("offer/fetchOffer", async (offerData: OfferData) => {
  const { title, groupId, deadline } = offerData;
  console.log(offerData)
  const employeesId = 1;
  try {
    const response = await fetch("http://localhost:3000/application", {
      method: "Post",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  title, groupId, employeesId, deadline }),
    });
      const resilt = response.json()
      return resilt;
  } catch (error) {
    return Promise.reject(new Error("400"));
  }
});