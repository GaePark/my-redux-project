import React from 'react';
import {Link} from "react-router-dom";

const Card = ({poster,title,address,no}:{poster:string,title:string,address:string,no:number}) => {
    return (
        <div className="col-lg-4 mb-5">
            <div className="card h-100 shadow border-0">
                <img className="card-img-top" src={poster}
                     alt="..." style={{height:"270px"}}/>
                <div className="card-body p-4">
                    <Link className="text-decoration-none link-dark stretched-link" to={`/seoul/detail/${no}`}><h5
                        className="card-title mb-3">{title}</h5></Link>
                    <p className="card-text mb-0">{address}</p>
                </div>

            </div>
        </div>
    );
};

export default Card;