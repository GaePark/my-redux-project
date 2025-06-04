import React, {JSX, useState, useRef, ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../store/store";

const Update = ():JSX.Element => {
    const subRef = useRef(null);
    const contentRef = useRef(null);
    const nav = useNavigate();
    const {boardDetail} = useSelector((state: RootState) => state.board);
    const [form, setForm] = useState({
        name:boardDetail.name,
        subject: boardDetail.subject,
        content: boardDetail.content,
        pwd:boardDetail.pwd,
        no: boardDetail.no
    })
    const onChangeForm = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
    const onClickUpdate = async():Promise<void> => {
        try {
            const res = await axios.put('http://localhost/board/update',form)
            if(res.data.result==="yes")
            {
                nav(`/board/detail/${boardDetail.no}`)
            }
            else{
                alert("게시글 수정을 실패하였습니다.")
            }
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div className={"container mt-4"} style={{width:"720px"}}>
            <h3>글쓰기</h3>
            <div className={"row"}>
                <div className={"col"}>
                    <table className={"table border text-center align-middle"}>
                        <tbody>
                        <tr>
                            <th style={{width:"10%"}}>이름</th>
                            <td >
                                {boardDetail.name}
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td >
                                <input type={"text"} className={"form-control"} ref={subRef} name={"subject"} value={form.subject} onChange={onChangeForm}/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td >
                                <textarea className={"form-control"} ref={contentRef} style={{resize:"none",height:"200px"}} name={"content"} onChange={onChangeForm} value={form.content}/>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div className={"text-end"}>
                    <button className={"btn btn-primary me-1"} onClick={onClickUpdate} >수정</button>
                    <button className={"btn btn-danger"} onClick={() => nav(-1)} >취소</button>
                </div>
            </div>
        </div>
    );
};

export default Update;