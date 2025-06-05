import React, {JSX,useEffect} from 'react';
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../store/store";
import {setBoardDetail} from "../../reducers/boardSlice";
import {useParams} from "react-router";

interface State {
    no:number;
    name:string;
    subject:string;
    content:string;
    pwd:string;
    regdate:string;
    hit:number;
}
interface DeleteResponse {
    result: "yes" | "no";
}
const Detail = ():JSX.Element => {
    const nav=useNavigate();
    const {no} = useParams<{ no: string }>()
    const dispatch=useDispatch();
    const {boardDetail} = useSelector((state:RootState) => state.board);

    useEffect(():void => {
        if (!no) {
            alert("잘못된 접근입니다.");
            nav("/board/list");
            return;
        }
        fetchBoardDetail();
    }, []);
    const fetchBoardDetail = async ():Promise<void> => {
        try{
        const res= await axios.get<State>(`http://localhost/board/detail/${no}`);
        dispatch(setBoardDetail(res.data));
        }catch (err){
            console.log(err);
        }
    }

    const onClickDelete = async ():Promise<void> =>{
        const pwd:string|null =prompt("비밀번호를 입력해주세요")
        if(pwd!==boardDetail.pwd)
        {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }
        const res = await axios.delete<DeleteResponse>(`http://localhost/board/delete/${no}`);
        if(res.data.result==="yes")
        {
            alert("게시글을 삭제하였습니다.")
            nav("/board/list")
            return
        }
        else{
            alert("게시글 삭제를 실패했습니다.")
        }
    }

    return (
        <div className={"container mt-4"} style={{maxWidth:"960px"}}>
            <div className={"row"}>
                <div className={"col"}>
                    <table className={"table"}>
                        <tbody>
                            <tr className={""}>
                                <th className={"col-2 text-center align-middle table-dark"}>작성자</th>
                                <td className={"col-6 align-middle"}> {boardDetail.name}</td>
                                <th className={"col-2 text-center align-middle table-dark"}>작성일</th>
                                <td className={"col-2 align-middle"}>{boardDetail.regdate}</td>
                            </tr>
                            <tr>
                                <th className={"text-center align-middle table-dark"}>제목</th>
                                <td className={"align-middle"}>{boardDetail.subject}</td>
                                <th className={"text-center align-middle table-dark"}>조회수</th>
                                <td className={"align-middle"}>{boardDetail.hit}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    {boardDetail.content}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className={"text-end"}>
                    <button className={"btn btn-success me-1"} onClick={():void | Promise<void> => nav(`/board/update/${no}`)}>수정</button>
                    <button className={"btn btn-danger me-1"} onClick={onClickDelete}>삭제</button>
                    <button className={"btn btn-primary"} onClick={():void|Promise<void> => nav(-1)}>목록</button>
                </div>
            </div>
        </div>
    );
};

export default Detail;