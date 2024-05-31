import { createSlice } from "@reduxjs/toolkit";
import { kem } from "node-forge";

const toasterSlice = createSlice({
    name:"toaster",
    initialState:{
        isToaster: false,
        type: 'alert',    // info , success, alert, warning
        message: '',
    },
    reducers:{
        updateToaster: (state,action)=>{
            state.isToaster = action.payload.isToaster;
            state.type = action.payload.type;
            state.message = action.payload.message;
           
        },
        removeToaster: (state,action)=>{
            state.isToaster = action.payload
        }
    }
});

export const {updateToaster, removeToaster} =  toasterSlice.actions;
export default toasterSlice.reducer;