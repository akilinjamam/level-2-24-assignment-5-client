import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  open: boolean;
  id?: string;
  name?: string;
  type?: string;
};

const initialState: TInitialState = {
  open: false,
  id: "",
  name: "",
  type: "",
};

const controllModalSlice = createSlice({
  name: "controllModal",
  initialState,
  reducers: {
    controllModal: (
      state: TInitialState,
      action: PayloadAction<TInitialState>
    ) => {
      state.open = action.payload.open;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.type = action.payload.type;
    },
  },
});

export const { controllModal } = controllModalSlice.actions;

export default controllModalSlice.reducer;
