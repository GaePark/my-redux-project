import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface moveTypes {
    경찰서: string;
    y2011: number;
    y2012: number;
    y2013: number;
    y2014: number;
    y2015: number;
    y2016: number;
    y2017: number;
    y2018: number;
    y2019: number;
    y2020: number;
    y2021: number;
    y2022: number;
    y2023: number;
    y2024: number;
}

const initialState:{move:moveTypes,moveData:moveTypes[],max:number,min:number,year:number[],police:string[]} = {
    move:{
        경찰서:"",
        y2011: 0,
        y2012: 0,
        y2013: 0,
        y2014: 0,
        y2015: 0,
        y2016: 0,
        y2017: 0,
        y2018: 0,
        y2019: 0,
        y2020: 0,
        y2021: 0,
        y2022: 0,
        y2023: 0,
        y2024: 0
    },
    moveData:[],
    max:0,
    min:0,
    year:[],
    police:[]
}
export const policeSlice = createSlice({
    name:"police",
    initialState,
    reducers:{
        setPoliceMoveData: (state, action: PayloadAction<{vo:moveTypes; max:number;min:number}>) => {
            state.move = action.payload.vo;
            state.max = action.payload.max;
            state.min = action.payload.min;
        },
        setPoliceMoveYearData: (
            state,
            action: PayloadAction<{ police: string[]; year: number[] }>
        ) => {
            state.police = action.payload.police;
            state.year = action.payload.year;
        },
        setMoveData:(
            state,
                action: PayloadAction<moveTypes[]>
        )=>{
            state.moveData=action.payload;
        }


    }
})
export const { setPoliceMoveData, setPoliceMoveYearData,setMoveData } =
    policeSlice.actions;
export default policeSlice.reducer;