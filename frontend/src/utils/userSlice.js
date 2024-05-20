import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        theme:'light',
        userData:null,
        loader: false,
        
    },
    reducers:{
        addUserData: (state,action)=>{
            state.userData = action.payload;
        },
        removeUserData: ()=>{
            return {theme:'light',userData:null,loader:false};
        },
        updateTheme: (state,action)=>{
            state.theme = action.payload;
        },
        updateLoader:(state,action)=>{
            state.loader = action.payload;
        }

    }
});
export const {addUserData, removeUserData,updateTheme,updateLoader} = userSlice.actions;
export default userSlice.reducer;