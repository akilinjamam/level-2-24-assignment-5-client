import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TSlot = {
  slot: string;
  startTime: string;
};

type TInitialState = {
  date: string;
  slots: TSlot[];
  room: string | undefined;
  user: string;
  isConfirmed: string;
  totalAmount: number;
  roomName: string;
};

const initialState: TInitialState = {
  date: "",
  slots: [],
  room: "",
  user: "",
  isConfirmed: "",
  totalAmount: 0,
  roomName: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBookings: (
      state: TInitialState,
      action: PayloadAction<TInitialState>
    ) => {
      state.date = action.payload.date;
      state.isConfirmed = action.payload.isConfirmed;
      state.room = action.payload.room;
      state.slots = action.payload.slots;
      state.totalAmount = action.payload.totalAmount;
      state.user = action.payload.user;
      state.roomName = action.payload.roomName;
    },
  },
});

export const { addBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
