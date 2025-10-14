import { useState } from 'react';
import './styles.css'
import {Doughnut } from "react-chartjs-2";
export default function FdComponent(){
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const currentDate = `${yyyy}-${mm}-${dd}`;
  
  const [amount, setAmount]=useState("");
  const [roi, setRoi]=useState("");
  const [intType, setIntType]=useState("Standard");
  const [time, setTime]=useState("");
  const [openDate, setOpenDate]=useState(currentDate);
  const [interest, setInterest]=useState("");
  const [matAmt,setMatAmt]=useState("");
  const [matDate, setMatDate]=useState();
  const [tenureType, setTenureType]=useState("Years");
  const [isEmpty, setIsEmpty]=useState(false);

  function calculate(){
    if(roi<0 || amount<0 || time<0 ||!roi|| !amount || !time || roi==0 || amount==0 || time==0 || isNaN(roi) || isNaN(amount) || isNaN(time)){
      setIsEmpty(true);
      setInterest("invalid entry");
      setMatAmt("invalid entry");
      setMatDate("");
      setAmount("");
      setRoi("");
      setTime("");
      return;
    }
    setIsEmpty(false);
    let r=roi/100; let totInt;
    let t;

    const start=new Date(openDate);
    const maturity=new Date(start);

    if(tenureType=="Days"){
      t=Number(time/365);
      maturity.setDate(maturity.getDate()+Number(time));
    } 
    if(tenureType=="Months"){
      t=Number(time/12);
      maturity.setMonth(maturity.getMonth()+Number(time));
    }  
    if(tenureType=="Years"){
      t=Number(time);
      maturity.setFullYear(maturity.getFullYear()+Number(time));
    }
  
    if(intType=="MIS")totInt=((amount*roi)/1200);
    if(intType=="QIS")totInt=((amount*roi)/400);
    if(intType=="Standard"){
      const part=Math.pow((1+r/4), (4*t));
      totInt=(amount*part)-amount;
    }
    
    const day = String(maturity.getDate()).padStart(2, '0');
    const month = String(maturity.getMonth() + 1).padStart(2, '0');
    const year = maturity.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setMatDate(formattedDate);
    setInterest(Math.round(totInt));
    if(intType=="Standard")setMatAmt(Math.round(Number(totInt)+Number(amount)));
    else setMatAmt(Math.round(amount));
  }

  function resetValues(){
    setInterest("");
    setMatAmt("");
    setIsEmpty(false);
  }

  function fullReset(){
    setAmount("");
    setRoi("");
    setIntType("Standard");
    setTime("");
    setInterest("");
    setMatAmt("");
    setIsEmpty(false);
  }

    const principal=Math.round(((matAmt-interest)/matAmt)*100);
    const intPortion=Math.round((interest/matAmt)*100);
  return <div className="container">

    <div className="entry-container">
      <div className="amt-div">
        <div className='amt-label'>
          <label>Amount (₹)</label>
        </div>
        {
          isEmpty? <input type='number' pattern="\d*" min='1' onChange={(e)=>setAmount(e.target.value)} placeholder='Please enter this field'></input>
          : <input type='number' pattern="\d*" min='1' value={amount} onChange={(e)=>setAmount(e.target.value)}></input>

        }
      </div>

      <div className="clm-2-div">
        <div className="roi-div">
          <label>Rate of Interest (%)</label>
          {
            isEmpty? <input type='number' pattern="\d*" min='1' onChange={(e)=>setRoi(e.target.value)} placeholder='Please enter this field'></input>
            :<input type='number' min='1' pattern="\d*" value={roi} onChange={(e)=>setRoi(e.target.value)}></input>

          }
        </div>
        <div className="int-type-div">
          <label>Interest Type</label>
          <select value={intType} onChange={(e)=>{setIntType(e.target.value); resetValues()}}>
            <option value='Standard'>Standard</option>
            <option value='MIS'>Monthly Income Scheme</option>
            <option value='QIS'>Quaterly Income Scheme</option>
          </select>
        </div>
      </div>

      <div className="clm-3-div">
        <div className="tenure-div">
          <label>Time-period </label>
          <div className='tenure-entry'>
            <select value={tenureType} onChange={(e)=>{setTenureType(e.target.value); resetValues()}}>
              <option value='Years'>Years</option>
              <option value='Months'>Months</option>
              <option value='Days'>Days</option>
            </select>
            {
              isEmpty? <input type='number' pattern="\d*" min='1'  onChange={(e)=>setTime(e.target.value)} placeholder='mandatory'></input>
              :<input type='number' pattern="\d*" min='1' value={time} onChange={(e)=>setTime(e.target.value)}></input>

            }
          </div>
          
        </div>
        <div className="open-date-div">
          <label>Opening-date</label>
          <input value={openDate} type='date' onChange={(e)=>setOpenDate(e.target.value)}></input>
        </div>
      </div>
      <div className="btns-container">
        <div className="clc-btn" onClick={calculate}>Calculate</div>
        <div className="reset-btn" onClick={fullReset}>Reset</div>
      </div>
    </div>

    <div className="result-container">
      <div className="result-txt-div">
        <div className="int-div">
          <div className="int-label"></div>
          <div className="int-txt"></div>
        </div>
        <div className="mat-amt-div">
          <div className="mat-amt-label"></div>
          <div className="mat-amt-txt"></div>
        </div>
        <div className="mat-date-div">
          <div className="mat-date-label"></div>
          <div className="mat-date-txt"></div>
        </div>
      </div>
      <div className="result-pic-div">
      </div>
    </div>
    
    <div className='result-div'>
      <div className='result-bar'>
        <div className='int-result'>
          {
            (intType=="MIS")? <label> Monthly Income:</label>
            :(intType=="QIS")? <label> Quarterly Income: </label>
            :<label>Total interest:</label>
          }
          <span>₹{interest}</span>
        </div>
        <div className='amt-result'>
          <label>Total maturity amount:</label>
          <span>₹{matAmt}</span>
        </div>
        <div className='mat-date-result'>
          <label>Maturity Date:</label>
          <span>{matDate}</span>
        </div>
      </div>
      <div className='result-pic'>
        <Doughnut
              data={{
                labels:["Interest", "Your Contribution"],
                datasets:[
                  {
                  data:[intPortion,principal],
                  backgroundColor: ["#0bcd45ff", "#e3eb4dff"],
                  }
                ]
              }}
              options={{
            plugins:{
              legend:{
                position:"top",
                labels:{
                  usePointStyle:true,
                  font:{
                    size:12,
                  }
                }
              },
              tooltip:{
                callbacks:{
                  label: function(context){
                    let label=context.label;
                    let value=context.parsed;
                    return `${label}: ${value}%`;
                  }
                }
              }
            }
          }}
            />
      </div>
    </div>

  </div>  
 
 
}