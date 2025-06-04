import React, {ChangeEvent, JSX, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setHospitalData, setHospitalDetailData} from "../../reducers/hispitalSlice";
import axios from "axios";
import {Chart, ChartConfiguration} from "chart.js";

const Count = ():JSX.Element => {
    const dispatch = useDispatch();
    const hospital  = useSelector((state:RootState)=> state.hospitals.hospital)
    const hospitalDetail = useSelector((state:RootState) => state.hospitals.hospitalDetail)

    const hospitalRef = useRef<HTMLCanvasElement>(null);
    const hospitalChartInstance=useRef<Chart>(null);

    const years = [2023,2022,2021,2020,2019,2018,2017,2016,2015];
    const [year, setYear] = useState(years[0]);
    const [regions,setRegions] = useState<string[]>([]) ;
    const [region, setRegion] = useState<string>(regions[0]);
    useEffect(() => {
        fetchHospitalData();
        fetchHospitalRegionName();
        fetchHospitalDetailData();
    }, [year,region]);
    const fetchHospitalData = async ():Promise<void> => {
        try{
        const res = await axios.get("http://localhost/hospital_list",{
            params:{
                year
            }
        });
        dispatch(setHospitalData(res.data));
        }catch(err){
            console.log(err);
        }
    }

    const fetchHospitalRegionName = async ():Promise<void> => {
        try{
            const res = await axios.get("http://localhost/hospital_regionName")
            setRegions(res.data);
        }catch(err){
            console.log(err);
        }
    }

    const fetchHospitalDetailData = async ():Promise<void> => {
        try{
            const res = await axios.get("http://localhost/hospital_detail",{
                params:{
                    year,
                    region
                }
            })
            dispatch(setHospitalDetailData(res.data));
        }catch(err){
            console.log(err);
        }
    }

    const onChangeYear = (e:ChangeEvent<HTMLSelectElement>):void => {
        setYear(Number(e.target.value));
    }
    const onChangeRegion = (e:ChangeEvent<HTMLSelectElement>):void => {
        setRegion(e.target.value);
    }

    useEffect(() => {
        if (!hospitalRef.current || !hospitalDetail) return;

        if(hospitalChartInstance.current)
            hospitalChartInstance.current.destroy();

        const data = {
            labels: [
                '종합병원',
                '요양병원',
                '일반병원',
                '의원',
                '결핵병원',
                '한센병원',
                '정신병원',
                '치과병원',
                '치과의원',
                '한방병원',
                '한의원',
                '부속의원',
                '조산원'
            ],
            datasets: [
                {
                    label: hospitalDetail.region,
                    data: [
                        hospitalDetail.gen_hospital,
                        hospitalDetail.nursing_hospital,
                        hospitalDetail.normal_hospital,
                        hospitalDetail.clinic,
                        hospitalDetail.tb_hospital,
                        hospitalDetail.hansen_hospital,
                        hospitalDetail.mental_hospital,
                        hospitalDetail.dental_hospital,
                        hospitalDetail.dental_clinic,
                        hospitalDetail.oriental_hospital,
                        hospitalDetail.oriental_clinic,
                        hospitalDetail.attached_clinic,
                        hospitalDetail.birth_center
                    ],
                    backgroundColor: "#A8D0E6"
                }
            ]
        };
        const config: ChartConfiguration<'bar'> = {
            type: 'bar',
            data,
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: { position: 'top',onClick: () => {} },
                    title: {
                        display: true,
                        text: year+"년 " + hospitalDetail.region+" 병원수"
                    },

                }
            }
        };

        hospitalChartInstance.current = new Chart(hospitalRef.current, config);

        return () => {
            hospitalChartInstance.current?.destroy();
        };
    }, [hospitalDetail]);


    return (
        <div className="container mt-4">
            <div className="row justify-content-end align-items-center mb-3">
                <div className="col-12">
                    <div className="card mb-4" style={{ height: "400px" }}>
                        <div className="row justify-content-end align-items-center mb-3 px-3">
                            <div className="col-auto d-flex align-items-center">
                                <label htmlFor="year" className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>년도 선택:</label>
                                <select id="year" name="year" onChange={onChangeYear} className="form-select form-select-sm w-auto">
                                    {years.map(i => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-auto d-flex align-items-center">
                                <label htmlFor="region" className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>지역 선택:</label>
                                <select name="hospitalType" onChange={onChangeRegion} className="form-select w-auto">
                                    {regions.map((el, i) => (
                                        <option key={i} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="card-body" style={{ position: "relative", padding: 0, height: "100%", overflow: "hidden" }}>
                            <canvas ref={hospitalRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>


            </div>


            <div className="col-12">
                <table className="table table-striped text-center">
                    <thead className="table-dark">
                    <tr>
                        <th>연도</th>
                        <th>시도</th>
                        <th>종합병원</th>
                        <th>요양병원</th>
                        <th>일반병원</th>
                        <th>의원</th>
                        <th>결핵병원</th>
                        <th>한센병원</th>
                        <th>정신병원</th>
                        <th>치과병원</th>
                        <th>치과의원</th>
                        <th>한방병원</th>
                        <th>한의원</th>
                        <th>부속의원</th>
                        <th>조산원</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hospital.map((el, i) => (
                        <tr key={i}>
                            <td>{el.year}</td>
                            <td>{el.region}</td>
                            <td>{el.gen_hospital}</td>
                            <td>{el.nursing_hospital}</td>
                            <td>{el.normal_hospital}</td>
                            <td>{el.clinic}</td>
                            <td>{el.tb_hospital}</td>
                            <td>{el.hansen_hospital}</td>
                            <td>{el.mental_hospital}</td>
                            <td>{el.dental_hospital}</td>
                            <td>{el.dental_clinic}</td>
                            <td>{el.oriental_hospital}</td>
                            <td>{el.oriental_clinic}</td>
                            <td>{el.attached_clinic}</td>
                            <td>{el.birth_center}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Count;