import './History.css';
import React from "react";

const History = ({history}) =>{
    return(
        <div className="overHistoryDiv">
            <h4>Transactions:</h4>
            {(history.length===0)?<p data-testid="nodata">No Transactions</p>:history.map((data,index)=>{
                return <p data-testid={`data${index}`} key={`trans-${index}`}>{`${data.time}-${data.amount}-${data.action}`}</p>;
            })}
        </div>
    )
};

export default History;