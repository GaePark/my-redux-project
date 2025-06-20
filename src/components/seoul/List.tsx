import React, {JSX, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {RootState} from "../../store/store";
import {setSeoulListData} from "../../reducers/seoulSlice";
import {Link} from "react-router-dom";
import Card from "../utill/Card";

const List = ():JSX.Element => {
    const [page, setPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    const [totalpage, setTotalpage] = useState(1);
    const dispatch = useDispatch();
    const seoulList = useSelector((state:RootState) => state.seoul.seoulList);

    useEffect(() => {
        fetchSeoulList();
    }, [page]);

    const fetchSeoulList =async ():Promise<void> => {
        const res = await axios.get(`http://localhost/seoul/list/${page}`)
        dispatch(setSeoulListData(res.data.list));
        setStartPage(res.data.startPage);
        setEndPage(res.data.endPage);
        setTotalpage(res.data.totalpage);
    }
    let pageArr=[]
    const prev=() => {
        setPage(startPage-1);
    }
    const next=() => {
        setPage(endPage+1)
    }
    const pageChange=(i:number) => {
        setPage(i)
    }

    if(startPage>1)
    {
        pageArr.push(<li className={"page-item"} key={"startPage"}><a onClick={prev} className={"page-link"} style={{cursor:"pointer"}}>&lt;</a></li>)
    }

    for(let i=startPage;i<=endPage;i++){
        if(i===page){
            pageArr.push(<li className={"page-item active"}  key={i}><a className={"page-link "} style={{cursor:"pointer"}} >{i}</a> </li>)
        }
        else{
            pageArr.push(<li className={"page-item"} key={i}><a  onClick={() =>pageChange(i)} className={"page-link"} style={{cursor:"pointer"}}>{i}</a> </li>)
        }
    }

    if(endPage<totalpage)
    {
        pageArr.push(<li className={"page-item"} key={"endPage"}><a  onClick={next} className={"page-link"} style={{cursor:"pointer"}}>&gt;</a></li>)
    }
    return (
        <div className="container mt-4">
            <div className={"row"}>
                {
                    seoulList?.map((seoul,i) => (
                        <Card poster={seoul.poster} title={seoul.title} address={seoul.address} no={seoul.no} key={i}/>
                    ))
                }
                <ul className={"pagination justify-content-center"}>
                    {pageArr}
                </ul>
            </div>
        </div>
    );
};

export default List;