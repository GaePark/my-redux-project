import React, { JSX, useEffect, useRef } from 'react';
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    ChartConfiguration
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setDriverData } from '../../reducers/driverSlice';
import axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend);

const Driver = (): JSX.Element => {
    const dispatch = useDispatch();
    const all = useSelector((state: RootState) => state.drivers?.all);
    const man = useSelector((state: RootState) => state.drivers?.man);
    const woman = useSelector((state: RootState) => state.drivers?.woman);
    const drunkRef = useRef<HTMLCanvasElement | null>(null);
    const hooliganismRef = useRef<HTMLCanvasElement | null>(null);
    const otherRef = useRef<HTMLCanvasElement | null>(null);
    const drunkChartInstance = useRef<Chart | null>(null);
    const hooliganChartInstance = useRef<Chart | null>(null);
    const otherChartInstance = useRef<Chart | null>(null);


    //데이터 가져오기
    useEffect(() => {
        const fetchDriverData = async () => {
            try {
                const res = await axios.get('http://localhost/police_driver');
                dispatch(setDriverData(res.data));
            } catch (err) {
                console.log(err);
            }
        };
        fetchDriverData();
    }, [dispatch]);

    //음주운전
    useEffect(() => {
        if (!man || !woman || !drunkRef.current) return;

        if (drunkChartInstance.current) {
            drunkChartInstance.current.destroy();
        }

        const data = {
            labels: ['남자', '여자'],
            datasets: [
                {
                    label: '음주운전',
                    data: [man.음주운전, woman.음주운전],
                    backgroundColor: ['#00CAFF', '#F72C5B']
                }
            ]
        };

        const config: ChartConfiguration<'doughnut'> = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: '2024년 음주운전'
                    }
                }
            }
        };

        drunkChartInstance.current = new Chart(drunkRef.current, config);

        return () => {
            drunkChartInstance.current?.destroy();
        };
    }, [man, woman]);

    //난폭보복운전
    useEffect(() => {
        if(!man || !woman || !hooliganismRef.current) return;

        if(hooliganChartInstance.current)
            hooliganChartInstance.current.destroy();

        const data = {
            labels: ['남자', '여자'],
            datasets: [
                {
                    label: '난폭보복운전',
                    data: [man.난폭보복운전, woman.난폭보복운전],
                    backgroundColor: ['#00CAFF', '#F72C5B']
                }
            ]
        };
        const config: ChartConfiguration<'doughnut'> = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: '2024년 난폭보복운전'
                    }
                }
            }
        };

        hooliganChartInstance.current = new Chart(hooliganismRef.current, config);

        return () => {
            hooliganChartInstance.current?.destroy();
        };

    },[man,woman])

    //그외
    useEffect(() => {
        if(!man || !woman || !otherRef.current) return;

        if(otherChartInstance.current)
            otherChartInstance.current.destroy();

        const data = {
            labels: ['남자', '여자'],
            datasets: [
                {
                    label: '그외',
                    data: [man.그외, woman.그외],
                    backgroundColor: ['#00CAFF', '#F72C5B']
                }
            ]
        };
        const config: ChartConfiguration<'doughnut'> = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: '그외'
                    }
                }
            }
        };

        otherChartInstance.current = new Chart(otherRef.current, config);

        return () => {
            otherChartInstance.current?.destroy();
        };

    },[man,woman])

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white fw-bold">
                            <i className="fas fa-chart-pie me-1" />
                            음주운전
                        </div>
                        <div className="card-body">
                            <canvas ref={drunkRef} width="100%" height="50" />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white fw-bold">
                            <i className="fas fa-chart-pie me-1" />
                            난폭보복운전
                        </div>
                        <div className="card-body">
                            <canvas ref={hooliganismRef} width="100%" height="50" />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white fw-bold">
                            <i className="fas fa-chart-pie me-1" />
                            그외
                        </div>
                        <div className="card-body">
                            <canvas ref={otherRef} width="100%" height="50" />
                        </div>
                    </div>
                </div>




                <div>
                <table className="table table-bordered text-center">
                    <thead className="table-dark">
                    <tr>
                        <th>구분</th>
                        <th>음주운전</th>
                        <th>범칙금 미납</th>
                        <th>난폭/보복운전</th>
                        <th>그 외</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{all.구분}</td>
                        <td>{all.음주운전}</td>
                        <td>{all.범칙금미납}</td>
                        <td>{all.난폭보복운전}</td>
                        <td>{all.그외}</td>
                    </tr>
                    <tr>
                        <td>{man.구분}</td>
                        <td>{man.음주운전}</td>
                        <td>{man.범칙금미납}</td>
                        <td>{man.난폭보복운전}</td>
                        <td>{man.그외}</td>
                    </tr>
                    <tr>
                        <td>{woman.구분}</td>
                        <td>{woman.음주운전}</td>
                        <td>{woman.범칙금미납}</td>
                        <td>{woman.난폭보복운전}</td>
                        <td>{woman.그외}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default Driver;
