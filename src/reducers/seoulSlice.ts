import {PayloadAction, createSlice} from "@reduxjs/toolkit";
/*
NO int
    TITLE text
    POSTER text
    MSG text
    ADDRESS text
    HIT int
    LIKECOUNT bigint
    REPLYCOUNT int
 */
interface State {
    no:number,
    title:string,
    poster:string,
    msg:string,
    address:string,
    hit:number
}
const initialState: {seoulList:State[],seoulDetail:State} = {
    seoulList:[],
    seoulDetail:{
        no:0,
        title:"",
        poster:"",
        msg:"",
        address:"",
        hit:0
    }
}
export const seoulSlice = createSlice({
    name:"seoul",
    initialState,
    reducers:{
        setSeoulListData:(state,action:PayloadAction<State[]>) => {
            state.seoulList=action.payload;
        },
        setSeoulDetail:(state,action:PayloadAction<State>) => {
            state.seoulDetail=action.payload;
        },
        clearSeoulDetail: (state) => {
            state.seoulDetail = {
                no: 0,
                title: "",
                poster: "",
                msg: "",
                address: "",
                hit: 0
            };
        }
    }
})

export const {setSeoulListData,setSeoulDetail,clearSeoulDetail} = seoulSlice.actions;
export default seoulSlice.reducer;