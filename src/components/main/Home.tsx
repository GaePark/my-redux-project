import React, {Fragment, JSX, useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

interface State {
    no:number;
    title:string;
    poster:string;
    address:string
}
const Home = ():JSX.Element => {
    const [seoul, setSeoul] = useState<State[]>([]);
    useEffect(() => {
        fetchSeoulData();
    },[])
    const fetchSeoulData =async ():Promise<void> => {
        const res = await axios.get("http://localhost/seoul/main")
        setSeoul(res.data);
    }
    return (
        <Fragment>
            <header className="bg-dark py-5">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center justify-content-center">
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-2">범죄와 의료 통계를 쉽게, 빠르게, 정확하게</h1>
                                <p className="lead fw-normal text-white-50 mb-4">이 서비스는 지역별 범죄 발생 통계와 병원 위치 정보를 시각화하여 제공합니다.
                                    사용자는 지도와 그래프를 통해 자신의 거주지 또는 관심 지역의 범죄 발생 현황과 의료 인프라 분포를 한눈에 확인할 수 있습니다.
                                    공공 데이터를 기반으로 구축된 이 플랫폼은 더 안전하고 건강한 생활을 위한 정보를 제공합니다.
                                    범죄율이 낮고 병원 접근성이 높은 지역을 찾고 있다면, 이곳에서 그 해답을 확인해보세요.</p>

                            </div>
                        </div>
                        <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img
                            className="img-fluid rounded-3 my-5" src="/img/img3.png"
                            alt="..."/></div>
                    </div>
                </div>
            </header>
            <section className="py-5" id="features">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mb-0">지역 정보를 한눈에,<br />안전하고 건강한 생활을 위한 첫걸음</h2></div>
                        <div className="col-lg-8">
                            <div className="row gx-5 row-cols-1 row-cols-md-2">
                                <div className="col mb-5 h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                        className="bi bi-collection"></i></div>
                                    <h2 className="h5 fw-bold text-primary">지역별 범죄 통계 시각화</h2>
                                    <p className="mb-0 text-muted" >지도와 그래프를 통해 각 지역의 범죄 발생 현황을 한눈에 확인할 수 있습니다. 유형별, 연도별 데이터 분석도 제공합니다.</p>
                                </div>
                                <div className="col mb-5 h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                        className="bi bi-building"></i></div>
                                    <h2 className="h5 fw-bold text-primary">병원 위치 및 수 정보</h2>
                                    <p className="mb-0 text-muted">진료과목별 병원 분포와 지역별 병원 수를 확인할 수 있습니다. 응급실 운영 여부 등도 함께 제공합니다.</p>
                                </div>
                                <div className="col mb-5 mb-md-0 h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                        className="bi bi-toggles2"></i></div>
                                    <h2 className="h5 fw-bold text-primary">대시보드 기반 통합 조회</h2>
                                    <p className="mb-0 text-muted">범죄율과 병원 접근성을 함께 분석한 종합 대시보드를 통해 거주지 선택에 유용한 정보를 얻을 수 있습니다.</p>
                                </div>
                                <div className="col h-100">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                        className="bi bi-toggles2"></i></div>
                                    <h2 className="h5 fw-bold text-primary">공공데이터 기반 신뢰성</h2>
                                    <p className="mb-0 text-muted">공공데이터 포털의 범죄·의료 데이터를 활용하여 정확하고 객관적인 정보를 제공합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="py-5 bg-light">
                <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-10 col-xl-7">
                            <div className="text-center">
                                <div className="fs-4 mb-4 fst-italic fw-bold"> “우리 동네의 범죄율과 병원 정보를 한눈에 볼 수 있어서,
                                    이사 갈 지역을 선택하는 데 정말 큰 도움이 됐어요.
                                    데이터 기반이라 더 믿음이 가요!”
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <img className="rounded-circle me-3"
                                         src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..."/>
                                    <div className="fw-bold text-muted">
                                        이지은
                                        <span className="fw-bold text-primary mx-1">/</span>
                                        직장인, 서울 강서구
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <div className="text-center">
                                <h2 className="fw-bolder">관광지</h2>
                                <p className="lead fw-normal text-muted mb-5">서울은 전통과 현대가 조화를 이루는 도시로, 고궁과 마천루, 한강과 남산 등 다양한 명소들이 여행객을 맞이합니다.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row gx-5">
                        {
                            seoul.map((seoul,i) => (
                                <div className="col-lg-4 mb-5" key={i}>
                                    <div className="card h-100 shadow border-0">
                                        <img className="card-img-top" src={seoul.poster}
                                             alt="..." style={{height:"270px"}}/>
                                        <div className="card-body p-4">
                                            <Link className="text-decoration-none link-dark stretched-link" to={`/seoul/detail/${seoul.no}`}><h5
                                                className="card-title mb-3">{seoul.title}</h5></Link>
                                            <p className="card-text mb-0">{seoul.address}</p>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>
        </Fragment>
    );
};

export default Home;