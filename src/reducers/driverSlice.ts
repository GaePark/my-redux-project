import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface State {
    구분:string;
    음주운전:number;
    범칙금미납:number;
    난폭보복운전:number;
    그외:number;
}

const initialState: {all:State,man:State,woman:State} = {
    all:{
        구분:"",
        음주운전:0,
        범칙금미납:0,
        난폭보복운전:0,
        그외:0
    },
    man:{
        구분:"",
        음주운전:0,
        범칙금미납:0,
        난폭보복운전:0,
        그외:0
    },
    woman:{
        구분:"",
        음주운전:0,
        범칙금미납:0,
        난폭보복운전:0,
        그외:0
    },
}

export const driverSlice = createSlice({
    name:"driver",
    initialState,
    reducers:{
        setDriverData:(state, action: PayloadAction<{all:State,man:State,woman:State}>) => {
            state.all=action.payload.all;
            state.man=action.payload.man;
            state.woman=action.payload.woman;
        }
    }
})
export const {setDriverData} = driverSlice.actions;
export default driverSlice.reducer;