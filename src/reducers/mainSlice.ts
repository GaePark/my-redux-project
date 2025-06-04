import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface resultsType {
    name: string;
    url: string;
}
const initialState:{mainData?:resultsType} ={
    mainData: {
        name:"",
        url:""
    }
};

export const mainSlice = createSlice({
    name:"main",
    initialState,
    reducers:{
        setAllPokemon: (state, action: PayloadAction<resultsType>) => {
            state.mainData = action.payload;
        },
    }

})

export const { setAllPokemon } =
    mainSlice.actions;
export default mainSlice.reducer;