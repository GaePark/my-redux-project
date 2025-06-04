import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface fireTypes{
    no: number,
    year: number,
    regdate: string,
    sido: string,
    gugun: string,
    ignition_cause_major: string,
    initial_ignition_major: string,
    initial_ignition_minor: string,
    deaths: number,
    injuries: number
}
const initialState:{fireListData:fireTypes[]}= {
    fireListData:[]
}

export const fireSlice = createSlice({
    name:"fire",
    initialState,
    reducers:{
        setFireListData:(state,action: PayloadAction<fireTypes[]>) => {
            state.fireListData = action.payload;
        }
    }
})

export const {setFireListData} = fireSlice.actions;
export default fireSlice.reducer;