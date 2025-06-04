import React, {ChangeEvent, useRef} from 'react';
import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Insert = () => {
    const nav = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const subRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        name: '',
        subject: '',
        content: '',
        pwd:''
    })

    const onChangeForm = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const onClickInsert = async():Promise<void> => {
        if(form.name === ''){
            nameRef.current?.focus();
            return
        }
        if(form.subject === ''){
            subRef.current?.focus();
            return
        }
        if(form.content === ''){
            contentRef.current?.focus();
            return
        }
        if(form.pwd === ''){
            pwdRef.current?.focus();
            return
        }
        try {
            const res = await axios.post(`http://localhost/board/insert`, form)
            if(res.data.result==="yes"){
                nav("/board/list")
            }
            else{
                alert("작성을 실패하셨습니다.")
            }
        }catch(err){
            console.log(err)
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
                                    <input type={"text"} className={"form-control"} ref={nameRef} name={"name"} value={form.name} onChange={onChangeForm}/>
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
                            <tr>
                                <th>비밀번호</th>
                                <td >
                                    <input type={"password"} ref={pwdRef} className={"form-control"} name={"pwd"} value={form.pwd} onChange={onChangeForm}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={"text-end"}>
                    <button className={"btn btn-primary me-1"} onClick={onClickInsert} >글쓰기</button>
                    <button className={"btn btn-danger"} onClick={() => nav(-1)} >취소</button>
                </div>
            </div>
        </div>
    );
};

export default Insert;