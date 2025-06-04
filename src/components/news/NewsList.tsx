import {useState, useEffect, Fragment, useRef, use, ChangeEvent, JSX} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";

interface State {
    title:string,
    description:string,
    originallink:string,
    pubDate:string,
    link:string
}

function NewsList():JSX.Element {
    const [fd,setFd] = useState<string>("안전");
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<State[]>([]);
    useEffect(()=>{
        fetchNewsData();
    },[fd])

    const fetchNewsData = async():Promise<void> => {
        const res = await axios.get("http://localhost:3355/news/datafind",{
            params:{
                query:fd,
            }
        })
        setData(res.data.items)
        console.log(res.data.items)
    }

    const newsClick=()=>{
        if(search==="")
        {
            return
        }
        setFd(search);
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <div className="input-group" style={{width:"300px"}} >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="검색어를 입력하세요"
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
                            value={search}
                        />
                        <button className="btn btn-primary" onClick={newsClick}>
                            검색
                        </button>
                    </div>
                </div>
                <div>
                    <table className={"table"}>
                        <tbody>
                        {data.map((el, i) => (
                            <Fragment key={i}>
                                <tr>
                                    <td rowSpan={2} className={" text-center align-middle"} style={{maxWidth:"75px"}} ><img style={{width:"75px",height:"75px"}} src="/img/news.jpg" alt="..." /></td>
                                    <td className="text-truncate fw-bold align-middle ">
                                    <Link to={el.link} className={"text-decoration-none text-dark"}  dangerouslySetInnerHTML={{ __html: el.title }}></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-muted ps-4 align-middle" style={{ fontSize: "12px" }} dangerouslySetInnerHTML={{ __html: el.description }}></td>
                                </tr>
                            </Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default NewsList;