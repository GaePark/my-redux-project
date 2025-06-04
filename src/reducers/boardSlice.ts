import {PayloadAction,createSlice} from "@reduxjs/toolkit";

interface State {
    no:number;
    name:string;
    subject:string;
    content:string;
    pwd:string;
    regdate:string;
    hit:number;
}

const initialState: {boardList:State[],totalpage:number,boardDetail:State} = {
    boardList:[],
    totalpage:0,
    boardDetail:{
        no:0,
        name:"",
        subject:"",
        content:"",
        pwd:"",
        regdate:"",
        hit:0
    }
}

export const boardSlice = createSlice({
    name:"board",
    initialState,
    reducers:{
        setBoardListData:(state, action: PayloadAction<{ list:State[],totalpage:number }>) => {
            state.boardList=action.payload.list;
            state.totalpage=action.payload.totalpage;
        },
        setBoardDetail:(state, action: PayloadAction<State>) => {
            state.boardDetail=action.payload;
        }
    }
})

export const {setBoardListData,setBoardDetail} = boardSlice.actions;
export default boardSlice.reducer;