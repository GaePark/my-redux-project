import React, {Fragment, JSX} from 'react';
import {Link} from "react-router-dom";

const Header = ():JSX.Element => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-5">
                    <Link to={"/"} className="navbar-brand" >서울 알리미</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"><span
                        className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to={"/seoul/list"} className="nav-link" >관광</Link></li>
                            <li className="nav-item"><Link to={"/board/list"} className="nav-link" >게시글</Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownBlog"  role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">공공안전</a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                    <li><Link to={"/police/move"} className="dropdown-item" >경찰출동</Link></li>
                                    <li><Link to={"/police/fire"} className="dropdown-item" >화재</Link></li>
                                    <li><Link to={"/police/driver"} className="dropdown-item" >운전사고</Link></li>
                                    <li><Link to={"/police/youth"} className="dropdown-item" >청소년범죄</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item"><Link to={"/hospital/count"} className="nav-link" >병원</Link></li>
                            <li className="nav-item"><Link to={"/news/list"} className="nav-link" >뉴스</Link></li>
                            
                        </ul>
                    </div>
                </div>
            </nav>

        </Fragment>
    );
};

export default Header;