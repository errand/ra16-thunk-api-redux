import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    services: [],
    filterKey: null,
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
    deleteService: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.tasks = state.tasks.filter((item) => item.id !== action.payload.id);
      }
    },
    editService: (state, action) => {
      state.tasks.forEach(item => {
        if(item.status === 'editing') {
          item.status = ''
        }
      })
      state.tasks.forEach(item => {
        if(item.id === action.payload.id) {
          item.status = 'editing'
        }
      })
    }
  }
});

export const {deleteService, editService, servicesLoading, servicesReceived} = tasksSlice.actions;

export default tasksSlice.reducer;
