import React, {ChangeEvent, JSX, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {RootState} from "../../store/store";
import {setFireListData} from "../../reducers/fireSlice";

const Fire = ():JSX.Element => {
    const dispatch = useDispatch();
    const fireListData = useSelector((state:RootState) => state.fires?.fireListData);
    const [year, setYear] = useState("2023")
    const [sidoName, setSidoName] = useState<string[]>([]);
    const [sido, setSido] = useState<string>("서울특별시");
    useEffect(() => {
        fetchFireListData();
        fetchFireSidoData();
    }, [year,sido]);

    const fetchFireListData = async () => {
        const res = await axios.get("http://localhost/fire_list",{
            params:{
                year,
                sido
            }
        })
        dispatch(setFireListData(res.data))
    }
    const fetchFireSidoData = async ():Promise<void> => {
        const res = await axios.get("http://localhost/fire_sidoName")
        setSidoName(res.data);
    }

    const onChangeSido = (e:ChangeEvent<HTMLSelectElement>):void => {
        setSido(e.target.value);
    }
    const oncChangeYear = (e:ChangeEvent<HTMLSelectElement>):void => {
        setYear(e.target.value);
    }
    return (
        <div className="container mt-4">
            <div className="row justify-content-end align-items-center mb-3">
                <div className="col-auto">
                    <div className="d-flex align-items-center">
                        <label htmlFor="city" className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>년도 선택:</label>
                        <select id="year" name="year" onChange={oncChangeYear} className="form-select form-select-sm">
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="d-flex align-items-center">
                        <label htmlFor="city" className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>도시 선택:</label>
                        <select id="city" name="city"  onChange={onChangeSido} className="form-select form-select-sm">
                            {
                                sidoName.map((el,i) => (
                                    <option key={i} value={el}>{el}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>


            <div className="col-12">
                <table className="table table-striped text-center">
                    <thead className="table-dark">
                    <tr>
                        <th>발생일</th>
                        <th>시도</th>
                        <th>구군</th>
                        <th>발화요인대분류</th>
                        <th>최초착화물대분류</th>
                        <th>최초착화물소분류</th>
                        <th>사망</th>
                        <th>부상</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fireListData.map((el, i) => (
                        <tr key={i}>
                            <td>{el.regdate}</td>
                            <td>{el.sido}</td>
                            <td>{el.gugun}</td>
                            <td>{el.ignition_cause_major}</td>
                            <td>{el.initial_ignition_major}</td>
                            <td>{el.initial_ignition_minor}</td>
                            <td>{el.deaths}</td>
                            <td>{el.injuries}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Fire;