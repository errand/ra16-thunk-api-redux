import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    services: [],
    error: '',
    loading: 'idle',
  },
  reducers: {
    servicesLoading: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    servicesReceived: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.services = action.payload
      }
    },
    servicesError: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.payload
      }
    },
    deleteService: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.services = state.services.filter((item) => item.id !== action.payload.id);
      }
    },
    editService: (state, action) => {
      state.services.forEach(item => {
        if(item.status === 'editing') {
          item.status = ''
        }
      })
      state.services.forEach(item => {
        if(item.id === action.payload.id) {
          item.status = 'editing'
        }
      })
    }
  }
});

export const {deleteService, editService, servicesLoading, servicesReceived, servicesError} = tasksSlice.actions;

export default tasksSlice.reducer;
