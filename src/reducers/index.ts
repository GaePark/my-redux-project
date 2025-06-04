import {combineReducers} from "redux";
import {mainSlice} from "./mainSlice";
import {policeSlice} from "./policeSlice";
import {driverSlice} from "./driverSlice";
import {youthSlice} from "./youthSlice";
import {fireSlice} from "./fireSlice";
import {hospitalSlice} from "./hispitalSlice";
import {seoulSlice} from "./seoulSlice";
import {boardSlice} from "./boardSlice";

export default combineReducers({
    mains:mainSlice.reducer,
    polices:policeSlice.reducer,
    drivers:driverSlice.reducer,
    youths:youthSlice.reducer,
    fires:fireSlice.reducer,
    hospitals:hospitalSlice.reducer,
    seoul:seoulSlice.reducer,
    board:boardSlice.reducer,
})