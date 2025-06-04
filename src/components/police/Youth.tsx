import React, {ChangeEvent, JSX, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setYouthData, setYouthItems, setYouthListData} from "../../reducers/youthSlice";
import {RootState} from "../../store/store";
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarController,
    ChartConfiguration
} from 'chart.js';

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarController
);


const Youth = ():JSX.Element => {
    const dispatch = useDispatch();
    const [youth, setYouth] = useState("")
    const [fd, setFd] = useState("강도")

    const [category, setCategory] = useState<string[]>([]);


    const youthData = useSelector((state:RootState) => state.youths?.youth);
    const youthItems = useSelector((state:RootState) => state.youths?.youthItems);
    const youthLocs = useSelector((state:RootState)=> state.youths?.youthLocs) ;
    const youthListData = useSelector((state:RootState) => state.youths?.youthListData);


    const youthRef = useRef<HTMLCanvasElement>(null);
    const youthChartInstance=useRef<Chart>(null);
    const allRef = useRef<HTMLCanvasElement>(null);
    const allChartInstance = useRef<Chart>(null)

    useEffect(() => {
        fetchCategories();
        fetchYouthListData();
    },[dispatch])

    useEffect(() => {
        if (youth) fetchData();
    }, [youth]);

    const fetchData = async () => {
        const res = await axios.get("http://localhost/police_youth",{
            params: {
                youth
            }
        })
        dispatch(setYouthData(res.data))
    }
    //항목 불러오기
    const fetchCategories = async () => {
        const res = await axios.get("http://localhost/police_youth_cate")
        setCategory(res.data);
        setYouth(res.data[0])
    }

    const fetchYouthListData = async () => {
        const res = await axios.get("http://localhost/police_youth_listData")
        dispatch(setYouthListData(res.data));
    }

    //항목별 데이터 가져오기
    useEffect(() => {
        if(fd) fetchFindData();
    }, [fd]);

    const fetchFindData = async () => {
        const res = await axios.get("http://localhost/police_youth_find",{
            params: {
                fd
            }
        })
        dispatch(setYouthItems(res.data));
    }


    useEffect(() => {
        if (!youthRef.current || !youthData) return;

        if(youthChartInstance.current)
            youthChartInstance.current.destroy();

        const data = {
            labels: ['강도','살인','성범죄','절도','폭력'],
            datasets: [
                {
                    label: '청소년 범죄',
                    data: [youthData.강도,youthData.살인,youthData.성범죄,youthData.절도,youthData.폭력],
                    backgroundColor: ['#FFF78A', '#FFE382','#FFC47E','#FFAD84','#FEF3E2']
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
                        text: '청소년 범죄'
                    },

                }
            }
        };

        youthChartInstance.current = new Chart(youthRef.current, config);

        return () => {
            youthChartInstance.current?.destroy();
        };
    }, [youthData]);

    //항목별 비교
    useEffect(() => {
        if (!allRef.current || !youthItems) return;

        if(allChartInstance.current)
            allChartInstance.current.destroy();

        const data = {
            labels: youthLocs,
            datasets: [
                {
                    label: fd,
                    data: youthItems,
                    backgroundColor: '#FA812F'
                }
            ]
        };
        const config: ChartConfiguration<'bar'> = {
            type: 'bar',
            data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                },
                plugins: {
                    legend: { position: 'top',onClick: () => {} },
                    title: {
                        display: true,
                        text: '청소년 범죄'
                    },

                }
            }
        };

        allChartInstance.current = new Chart(allRef.current, config);

        return () => {
            allChartInstance.current?.destroy();
        };
    }, [youthItems]);

    const onChangeYouth = (e:ChangeEvent<HTMLSelectElement>):void => {
        setYouth(e.currentTarget.value);
    }
    const onChangeFd = (e:ChangeEvent<HTMLSelectElement>):void => {
        setFd(e.currentTarget.value);
    }

    console.log(youthItems)
    console.log(youthLocs)
    return (
        <div className={"container mt-4"}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4" style={{ height: "400px" }}>
                        <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
                            <p className={"mb-0"}>
                                <i className="fas fa-chart-pie me-1" />
                                {youth} 청소년 범죄
                            </p>
                            <select className="form-select" style={{ width: "100px" }} value={youth} onChange={onChangeYouth}>
                                {category.map((el: string, i: number) => (
                                    <option value={el} key={i}>{el}</option>
                                ))}
                            </select>
                        </div>
                        <div className="card-body" style={{ position: "relative", padding: 0, height: "100%", overflow: "hidden" }}>
                            <canvas ref={youthRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card mb-4" style={{ height: "400px" }}>
                        <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
                            <p className={"mb-0"}>
                                <i className="fas fa-chart-pie me-1" />
                                {fd} 청소년 범죄
                            </p>
                            <select className="form-select" style={{ width: "100px" }} value={fd} onChange={onChangeFd}>
                                <option value="강도">강도</option>
                                <option value="살인">살인</option>
                                <option value="성범죄">성범죄</option>
                                <option value="절도">절도</option>
                                <option value="폭력">폭력</option>
                            </select>
                        </div>
                        <div className="card-body" style={{ position: "relative", padding: 0, height: "100%", overflow: "hidden" }}>
                            <canvas ref={allRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
                <div className={"col-12"}>
                    <p className={"fw-bold"}>서울 청소년 범죄</p>
                    <table className="table table-striped text-center">
                        <thead>
                            <tr className={"table-dark"}>
                                <td>구분</td>
                                <td>강도</td>
                                <td>절도</td>
                                <td>폭력</td>
                                <td>성범죄</td>
                                <td>살인</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            youthListData.map((el,i) => (
                                <tr key={i}>
                                    <td>{el.구분}</td>
                                    <td>{el.강도}</td>
                                    <td>{el.절도}</td>
                                    <td>{el.폭력}</td>
                                    <td>{el.성범죄}</td>
                                    <td>{el.살인}</td>
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

export default Youth;