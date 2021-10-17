import './Balance.css';
import React, { useRef, useState } from "react";

const Balance = ({balance,setBalance,history,setHistory}) =>{
    const eleAmount = useRef();
    const [error, setError] = useState(null);
    const Transaction = (amount,type) =>{
        let histortObj = {};
        let oldHistory = [...history]
        let oldBalance = balance;
        let currentBalance = (type==="Add")? oldBalance+amount:oldBalance-amount;
        setBalance(currentBalance);
        setError(null);
        histortObj ={
            "time": new Date().toISOString(),
            "amount": amount,
            "action": type
        };
        oldHistory.push(histortObj);
        setHistory(oldHistory);
        eleAmount.current.value='';
        console.log('oldHistory',oldHistory);
    }
    const AddAmount = () =>{
        let amount = parseInt(eleAmount.current.value) || null;
        console.log('amount',amount);
        if(amount>0 && amount !== null){
            Transaction(amount,"Add");
        }else if(amount === null){
            setError('Please Enter Amount');
        }else{
            setError('Please Add Amount Above 0');
        }
    };
    const RemoveAmount = () => {
        let amount = parseInt(eleAmount.current.value) || null;
        let oldBalance = balance;
        if(amount<=oldBalance && amount>0 && amount !== null){
            Transaction(amount,"Remove");
        }else if(amount === null){
            setError('Please Enter Amount');
        }else if(amount<=0){
            setError('Please Entter Remove Amount Above 0');
        }else{
            setError('Please Remove Less Than Balance Amount');
        }
    };
    const AmountValidate = () =>{
        let reg = new RegExp(/[\D]/gm);
        let eleValue = eleAmount.current.value;
        if(reg.test(eleValue)){
            setError('Please Enter Number Only');
        }
        eleAmount.current.value = eleValue.replace(reg,'');
    };
    return(
        <div className="overBalanceDiv">
            <h1 data-testid="balanceText" className="balanceText">Balance: {balance}</h1>
            <div className="inputDiv">
                <input data-testid="inputAmount" type="text" ref={eleAmount} placeholder="Enter Your Amount" onChange={AmountValidate}/>
                <p data-testid="errorText" className="error">{error}</p>
            </div>
            <div className="balanceBtnDiv">
                <button data-testid="addBtn" title="Add Amount" onClick={AddAmount}>Add</button> <button  data-testid="removeBtn" title={(balance)?"Remove Amount":"Remove Amount Disabled"} disabled={!balance} onClick={RemoveAmount}>Remove</button>
            </div>
        </div>
    )
};

export default Balance;