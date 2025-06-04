import React, {JSX,useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {RootState} from "../../store/store";
import {setBoardListData} from "../../reducers/boardSlice";
import {Link} from "react-router-dom";

const List = ():JSX.Element => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const {boardList,totalpage} = useSelector((state:RootState) => state.board)


    useEffect(() => {
        fetchBoardList()
    }, [page]);

    const fetchBoardList = async ():Promise<void> => {
        try {
            const res = await axios.get(`http://localhost/board/list/${page}`)
            dispatch(setBoardListData(res.data))
        }catch (err){
            console.log(err);
        }
    }
    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"text-end mb-2"}>
                    <Link to={"/board/insert"} className={"btn btn-primary"}>글쓰기</Link>
                </div>
                <div className={"col-12"}>
                    <table className="table table-striped text-center">
                        <thead className="table-dark fw-bold">
                            <tr>
                                <td className={"col-lg-1"}>번호</td>
                                <td className={"col-lg-1 "}>작성자</td>
                                <td className={"col-lg-7 "} >제목</td>
                                <td className={"col-lg-2 "}>작성일</td>
                                <td className={"col-lg-1 "}>조회수</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            boardList?.map((el,i) => (
                                <tr key={i}>
                                    <td>{el.no}</td>
                                    <td>{el.name}</td>
                                    <td className={"text-start  text-truncate"} style={{maxWidth:"500px"}} >
                                        <Link to={`/board/detail/${el.no}`} style={{textDecoration:"none", color:"black"}} >
                                            {el.subject}
                                        </Link>
                                    </td>
                                    <td>{el.regdate}</td>
                                    <td>{el.hit}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <div className={"text-center"}>
                    {
                        page !==1 &&
                        <button className={"btn btn-primary"} onClick={() => setPage(page-1)}>이전</button>
                    }
                    {page} page / {totalpage} pages
                    {
                        page < totalpage &&
                        <button className={"btn btn-primary"} onClick={() => setPage(page+1)}>다음</button>
                    }

                </div>
            </div>
        </div>
    );
};

export default List;