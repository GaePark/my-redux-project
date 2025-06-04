import { PayloadAction, createSlice } from "@reduxjs/toolkit";
/*
year int
region text
gen_hospital int
nursing_hospital int
normal_hospital bigint
clinic int
tb_hospital int
hansen_hospital int
mental_hospital int
dental_hospital int
dental_clinic int
oriental_hospital int
oriental_clinic int
attached_clinic int
birth_center int
 */
interface State {
    year: number,
    region: string,
    gen_hospital: number,
    nursing_hospital: number,
    normal_hospital: number,
    clinic: number,
    tb_hospital: number,
    hansen_hospital: number,
    mental_hospital: number,
    dental_hospital: number,
    dental_clinic: number,
    oriental_hospital: number,
    oriental_clinic: number,
    attached_clinic: number,
    birth_center: number
}

const initialState: {hospital:State[],hospitalDetail:State} = {
    hospital:[],
    hospitalDetail:{
        year: 0,
        region: "",
        gen_hospital: 0,
        nursing_hospital: 0,
        normal_hospital: 0,
        clinic: 0,
        tb_hospital: 0,
        hansen_hospital: 0,
        mental_hospital: 0,
        dental_hospital: 0,
        dental_clinic: 0,
        oriental_hospital: 0,
        oriental_clinic: 0,
        attached_clinic: 0,
        birth_center: 0
    },
}

export const hospitalSlice = createSlice({
    name:"hospital",
    initialState,
    reducers:{
        setHospitalData:(state,action:PayloadAction<State[]>) => {
            state.hospital = action.payload;
        },
        setHospitalDetailData:(state,action:PayloadAction<State>) => {
            state.hospitalDetail = action.payload;
        }
    }
})
export const {setHospitalData,setHospitalDetailData} = hospitalSlice.actions;
export default hospitalSlice.reducer;