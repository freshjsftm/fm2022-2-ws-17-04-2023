import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMessages } from '../api';

export const getAllMessages = createAsyncThunk(
  'chat/getAllMessages',
  async (params = {}, { rejectWithValue }) => {
    try {
      const {data:{data}} = await getMessages(params);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isFetching: false,
    error: null,
  },
  reducers: {
    createMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    errorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMessages.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.messages.push(...action.payload);
      state.error = null;
      state.isFetching = false;
    });
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    });
  },
});

export const { createMessage, errorMessage } = chatSlice.actions;
export default chatSlice.reducer;
