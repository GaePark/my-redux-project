import {PayloadAction,createSlice} from "@reduxjs/toolkit";

interface youthTypes{
    구분:string;
    살인:number;
    강도:number;
    성범죄:number;
    절도:number;
    폭력:number;
}
const initialState:{youth:youthTypes,youthItems:number[],youthLocs:string[],youthListData:youthTypes[]} = {
    youth:{
        구분:"",
        살인:0,
        강도:0,
        성범죄:0,
        절도:0,
        폭력:0
    },
    youthItems:[],
    youthLocs:[],
    youthListData:[]
}

export const youthSlice = createSlice({
    name:"youth",
    initialState,
    reducers:{
        setYouthData:(state,action:PayloadAction<youthTypes>) => {
            state.youth = action.payload;
        },
        setYouthItems:(state,action:PayloadAction<{result:number[],category:string[]}>) => {
            state.youthItems = action.payload.result;
            state.youthLocs = action.payload.category;
        },
        setYouthListData:(state,action:PayloadAction<youthTypes[]>) =>{
            state.youthListData = action.payload;
        }
    }
})
export const {setYouthData,setYouthItems,setYouthListData} = youthSlice.actions;
export default youthSlice.reducer;