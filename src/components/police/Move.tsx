import React, { JSX, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {setMoveData, setPoliceMoveData, setPoliceMoveYearData} from "../../reducers/policeSlice";
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Title,
    PieController,
    ArcElement,
    ChartConfiguration
} from "chart.js";
import {Root} from "react-dom/client";

Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Title,
    PieController,
    ArcElement
);

const Move = (): JSX.Element => {
    const [police, setPolice] = useState("강남");
    const [year, setYear] = useState("y2024");

    const dispatch = useDispatch<AppDispatch>();

    const move = useSelector((state: RootState) => state.polices?.move);
    const max = useSelector((state: RootState) => state.polices?.max);
    const min = useSelector((state: RootState) => state.polices?.min);
    const years = useSelector((state: RootState) => state.polices?.year);
    const polices = useSelector((state: RootState) => state.polices?.police);
    const moveAll = useSelector((state:RootState)=> state.polices?.moveData);

    const areaRef = useRef<HTMLCanvasElement>(null);
    const pieRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        fetchMoveData();
        fetchYearData();
        fetchMoveAll();
    }, [police]);

    const fetchMoveData = async () => {
        try {
            const res = await axios.get("http://localhost/police_move", {
                params: { police }
            });
            dispatch(setPoliceMoveData(res.data));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchYearData = async () => {
        try {
            const res = await axios.get("http://localhost/police_move_year", {
                params: { year }
            });
            dispatch(setPoliceMoveYearData(res.data));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMoveAll = async () => {

        try{
            await axios.get("http://localhost/police_move_all")
                .then(res => {
                    dispatch(setMoveData(res.data));
                })
        }catch (err){
            console.error(err);
        }
    }
    useEffect(() => {
        if (!move || !areaRef.current) return;

        const chartInstance = new Chart(areaRef.current, {
            type: "line",
            data: {
                labels: [
                    "2011년", "2012년", "2013년", "2014년", "2015년", "2016년", "2017년",
                    "2018년", "2019년", "2020년", "2021년", "2022년", "2023년", "2024년"
                ],
                datasets: [
                    {
                        label: "출동수",
                        tension: 0.3,
                        backgroundColor: "rgba(2,117,216,0.2)",
                        borderColor: "rgba(2,117,216,1)",
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(2,117,216,1)",
                        pointBorderColor: "rgba(255,255,255,0.8)",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(2,117,216,1)",
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: [
                            move.y2011, move.y2012, move.y2013, move.y2014, move.y2015,
                            move.y2016, move.y2017, move.y2018, move.y2019, move.y2020,
                            move.y2021, move.y2022, move.y2023, move.y2024
                        ]
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { maxTicksLimit: 7 }
                    },
                    y: {
                        min: min - 2000,
                        max: max + 5000,
                        ticks: { maxTicksLimit: 5 },
                        grid: { color: "rgba(78, 215, 245, .125)" }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        return () => {
            chartInstance.destroy();
        };
    }, [move]);

    useEffect(() => {
        if (!pieRef.current || !polices || !years || polices.length === 0 || years.length === 0) return;

        const colors = generateRandomColors(polices.length);

        const pieData = {
            labels: polices,
            datasets: [
                {
                    data: years,
                    backgroundColor: colors
                }
            ]
        };

        const config: ChartConfiguration = {
            type: "pie",
            data: pieData,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" },
                    title: {
                        display: true,
                        text: "경찰서별 2024년 출동 분포"
                    }
                }
            }
        };

        const pieChart = new Chart(pieRef.current, config);

        return () => {
            pieChart.destroy();
        };
    }, [polices, years]);

    const generateRandomColors = (count: number): string[] => {
        return Array.from({ length: count }, () =>
            `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
        );
    };
    const onChangePolice= (e:React.ChangeEvent<HTMLSelectElement>):void=> {
        setPolice(e.currentTarget.value)
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8 mb-4">
                <div className="card  h-100">
                    <div
                        className="card-header bg-dark text-white fw-bold d-flex align-items-center justify-content-between">
                        <p className={"mb-0"}>
                            <i className="fas fa-chart-area me-1"></i>
                            {move?.경찰서} 경찰서 출동률
                        </p>
                        <select className="form-select" style={{"width":"100px"}} value={police} onChange={onChangePolice} aria-label="Default select example">
                            <option value={"강남"}>강남</option>
                            <option value="강동">강동</option>
                            <option value="강북">강북</option>
                            <option value="강서">강서</option>
                            <option value="관악">관악</option>
                            <option value="광진">광진</option>
                            <option value="구로">구로</option>
                            <option value="금천">금천</option>
                            <option value="남대문">남대문</option>
                            <option value="노원">노원</option>
                            <option value="도봉">도봉</option>
                            <option value="동대문">동대문</option>
                            <option value="동작">동작</option>
                            <option value="방배">방배</option>
                            <option value="마포">마포</option>
                            <option value="서대문">서대문</option>
                            <option value="서부">서부</option>
                            <option value="서초">서초</option>
                            <option value="성동">성동</option>
                            <option value="성북">성북</option>
                            <option value="송파">송파</option>
                            <option value="수서">수서</option>
                            <option value="양천">양천</option>
                            <option value="영등포">영등포</option>
                            <option value="용산">용산</option>
                            <option value="은평">은평</option>
                            <option value="종로">종로</option>
                            <option value="종암">종암</option>
                            <option value="중랑">중랑</option>
                            <option value="중부">중부</option>
                            <option value="혜화">혜화</option>

                        </select>
                    </div>
                    <div className="card-body">
                        <canvas ref={areaRef} width="100%" height="40"/>
                    </div>
                </div>
                </div>

                <div className="col-lg-4 mb-4">
                    <div className="card  h-100">
                        <div className="card-header bg-dark text-white fw-bold">
                            <i className="fas fa-chart-pie me-1 "></i>
                            서울 경찰서 출동 현황
                        </div>
                        <div className="card-body">
                            <canvas ref={pieRef} width="100%" height="50" />
                        </div>
                    </div>
                </div>
                <p className={"mb-1 fw-bold"}>연도별 출동수</p>
                <div>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr className="table-dark text-center">
                            <th>경찰서</th>
                            <th>2019년</th>
                            <th>2020년</th>
                            <th>2021년</th>
                            <th>2022년</th>
                            <th>2023년</th>
                            <th>2024년</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            moveAll.map((el,i) => (
                                <tr key={i} className={"text-center"}>
                                    <td>{el.경찰서}</td>
                                    <td>{el.y2019}</td>
                                    <td>{el.y2020}</td>
                                    <td>{el.y2021}</td>
                                    <td>{el.y2022}</td>
                                    <td>{el.y2023}</td>
                                    <td>{el.y2024}</td>

                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Move;
