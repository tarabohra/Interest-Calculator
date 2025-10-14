import { useState } from 'react';
import './styles.css'
import {Doughnut } from "react-chartjs-2";
export default function RdComponent(){
   const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const currentDate = `${yyyy}-${mm}-${dd}`;

  const [amount, setAmount]=useState("");
  const [roi, setRoi]=useState("");
  const [time, setTime]=useState("");
  const [openDate, setOpenDate]=useState(currentDate);
  const [interest, setInterest]=useState("");
  const [matAmt,setMatAmt]=useState("");
  const [matDate, setMatDate]=useState();
  const [tenureType, setTenureType]=useState("Years");
  const [isEmpty, setIsEmpty]=useState(false);
  const [contri, setContri]=useState("");

  function calculate(){
    if(roi<0 || amount<0 || time<0||!roi|| !amount || !time || roi==0 || amount==0 || time==0 || isNaN(roi) || isNaN(amount) || isNaN(time)){
      setIsEmpty(true);
      setInterest("invalid entry");
      setMatAmt("invalid entry");
      setContri("invalid entry");
      return;
    }

    let r=roi/100; let totAmt=0;
    let t=0; let months=0;

    const start=new Date(openDate);
    const maturity=new Date(start);

    if(tenureType=="Months"){
      t=Number(time/12);
      months=Number(time);
      maturity.setMonth(maturity.getMonth()+Number(time));
    }  
    if(tenureType=="Years"){
      t=Number(time);
      months=Number(time*12);
      maturity.setFullYear(maturity.getFullYear()+Number(time));
    }

    for(let i=1; i<=months; i++){
      const yearElapsed=i/12;
      const base=1+(r/4);
      const power=4*yearElapsed;
      const total=amount*(Math.pow(base,power));
      
      console.log(i+" "+ total);
      totAmt+=total;
    }

    setInterest(Math.round(totAmt-(amount*months)));
    setMatAmt(Math.round(totAmt));
    setContri(Math.round(amount*months));

    
    const day = String(maturity.getDate()).padStart(2, '0');
    const month = String(maturity.getMonth() + 1).padStart(2, '0');
    const year = maturity.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setMatDate(formattedDate);
  }

    function resetValues(){
    setInterest("");
    setMatAmt("");
    setContri("");
    setIsEmpty(false);
  }

  function fullReset(){
    setAmount("");
    setRoi("");
    setTime("");
    setInterest("");
    setMatAmt("");
    setContri("");
    setIsEmpty(false);
  }
    const intRatio=Math.round((interest/matAmt)*100);
    const contriRatio=Math.round((contri/matAmt)*100);
  return <div className="container">

    <div className="entry-container">
      <div className="clm-2-div">
        <div className="amt-block">
          <label>Amount</label>
          {
            isEmpty? <input type='number' pattern="\d*" min='1' onChange={(e)=>setAmount(e.target.value)} placeholder='Mandatory'></input>
            :<input type='number' min='1' pattern="\d*" value={amount} onChange={(e)=>setAmount(e.target.value)}></input>

          }
      </div>
        <div className="roi-div">
          <label>Rate of Interest</label>
          {
            isEmpty? <input type='number' pattern="\d*" min='1' onChange={(e)=>setRoi(e.target.value)} placeholder='Mandatory'></input>
            :<input type='number' min='1' pattern="\d*" value={roi} onChange={(e)=>setRoi(e.target.value)}></input>

          }
        </div>
      </div>

      <div className="clm-3-div">
        <div className="tenure-div">
          <label>Time-period</label>
          <div className='tenure-entry'>
            <select value={tenureType} onChange={(e)=>{setTenureType(e.target.value); resetValues()}}>
            <option>Years</option>
            <option>Months</option>
          </select>
          {
            isEmpty? <input type='number' pattern="\d*" min='1' onChange={(e)=>setTime(e.target.value)} placeholder='Mandatory'></input>
            :<input type='number' min='1' pattern="\d*" value={time} onChange={(e)=>setTime(e.target.value)}></input>          }
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
          <label>Total interest:</label>
          <span>₹{interest}</span>
        </div>
         <div className='invest-div'>
          <label>Total investment:</label>
          <span>₹{contri}</span>
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
                  data:[intRatio,contriRatio],
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