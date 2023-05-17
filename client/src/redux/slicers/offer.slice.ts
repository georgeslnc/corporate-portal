import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InititalStateOffer, Offer } from '../type'
import { postOffer } from '../Thunk/offer';

const initialState: InititalStateOffer = {
  offer: []
}

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(postOffer.fulfilled, (state, action: any) => {
      state.offer.push(action.payload)
    })}
})

export default offerSlice.reducer