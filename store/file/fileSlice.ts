import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "files",
  initialState: [] as IFilesAndChat[],
  reducers: {
    setFilesAndChat: (state, action: PayloadAction<IFilesAndChat>) => [
      ...state,
      action.payload,
    ],
  },
});

export const { setFilesAndChat } = fileSlice.actions;

export default fileSlice.reducer;
