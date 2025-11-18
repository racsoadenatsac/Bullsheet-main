import { createSlice } from '@reduxjs/toolkit';

const defaultFile = { name: '', path: null, size: 0 };

export const slice = createSlice({
  name: 'file',
  initialState: {
    page: 0,
    file: defaultFile,
    timestamp: -1
  },
  reducers: {
    nextPage: state => { 
      state.page += 1;
      if (state.page > 5) { state.page = 0; }
    },
    reset: state => { 
      state.page = 0;
      state.file = defaultFile;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setTimestamp: (state, action) => {
      state.timestamp = action.payload;
    },
  },
});

export const { setFile, nextPage, reset, setTimestamp } = slice.actions;

export const selectFile = state => state.file.file;
export const selectPage = state => state.file.page;
export const selectTimestamp = state => state.file.timestamp;

export default slice.reducer;
