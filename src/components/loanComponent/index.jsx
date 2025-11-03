import { use, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie,Doughnut } from "react-chartjs-2";
import "./styles.css"
export default function LoanComponent(){
  
  const[p,setP]=useState();
  const[r,setR]=useState();
  const[n,setN]=useState();
  
  const [emi, setEmi]=useState(0);
  const [tenureType,setTenureType]=useState("Years");
  const [freqType,setFreqType]=useState("Monthly-Compounding");
  const [interest,setInterest]=useState(0);
  const [amount,setAmount]=useState(0);
  const [empty,setEmpty]=useState(false);
  const [calcType, setCalcType]=useState("emi");

  function resetValues(){
    setAmount("");
    setEmi("");
    setInterest("");
  }

  function resetCalc(){
    
      setAmount(0);
      setEmi(0);
      setInterest(0);
      setP("");
      setR("");
      setN("");
      setEmpty(false);
    
  }

  function calcEmi(){
    let rate=0;
    let time=0;

    if(p<0|| r<0 || n<0||p==0|| r==0 || n==0 || !r || !p || !n || isNaN(r)|| isNaN(p) || isNaN(n)){
     setEmpty(true);
     setEmi("invalid entry");
     setInterest("invalid entry");
     setAmount("invalid entry");
     return;
    }

    if(tenureType==="Years"){
    rate=r/1200;
    time=n*12;
    }

    else if(tenureType==="Months"){
    rate=r/1200;
    time=n;
    }

    else if(tenureType==="Days"){
    rate=r/1200;
    time=n/30;
    }
    const part=Math.pow((1+rate),time);
    const calculatedEmi=Math.round((p*rate*part)/(part-1));
    setEmi(calculatedEmi);
    const totalAmount=Math.round(calculatedEmi*time);
    const totalInterest=Math.round(totalAmount-p);
    setInterest(totalInterest);
    setAmount(totalAmount);
  }

  function calcInt(){
    let t=0;
    let N=0;

    if(p<0|| r<0 || n<0|| p==0|| r==0 || n==0 || !r || !p || !n || isNaN(r)|| isNaN(p) || isNaN(n)){
     setEmpty(true);
     setInterest("invalid entry");
     setAmount("invalid entry");
     return;
    }

    if(tenureType=="Years") t=n;
    if(tenureType=="Months")t=n/12;
    if(tenureType=="Days") t=n/365;
    if(freqType=="Yearly-Compounding") N=1;
    if(freqType=="Monthly-Compounding") N=12;  
    if(freqType=="Daily-Compounding")  N=365;
    
    const rate = r/100;
    const total = Math.round(p * Math.pow((1 + rate/N), N*t));
    const totalInt = Math.round(total - p);

    setAmount(total);
    setInterest(totalInt);

  }

    const intPortion=Math.round((interest*100)/amount);
    const prinPortion=Math.round(((amount-interest)*100)/amount);

  return <div className="container-div">
     <div className="radio-btn-container">
      <div className="emi-radio-div"><input type="radio" checked={calcType=="emi"} value="emi" name="calcType" onChange={(e)=> {setCalcType(e.target.value); resetCalc();}}></input><label>EMI Calculator</label></div>
      <div className="int-radio-div"><input type="radio" checked={calcType=="int"} value="int" name="calcType" onChange={(e)=> {setCalcType(e.target.value); resetCalc();}}></input><label>Interest Calculator</label></div> 
    </div>

    <div className="loan-container">
      <div className="loan-label-div"><label className="loan-label">Loan Amount</label></div>
      <div className="loan-amt">
        <div className="rupee-sign">₹</div>
        {
          empty?<div className="loan-amt-input"><input type='number' pattern="\d*" min='1' placeholder="This field is mandatory" onChange={(e)=>setP(e.target.value)}></input></div>
          :<div className="loan-amt-input"><input type='number' pattern="\d*" min='1' value={p} onChange={(e)=>setP(e.target.value)}></input></div>
        }
      </div>
    </div>
  
    <div className="rate-container">
      <div className="rate-label-div"><label className="rate-label">Interest Rate</label></div>
      <div className="int-rate">
        <div className="percent-sign">％</div>
        {
          empty? <div className="int-rate-input"><input type='number' inputMode="decimal" step="any"  placeholder="This field is mandatory" onChange={(e)=>setR(e.target.value) }></input></div>
          :<div className="int-rate-input"><input value={r} type='number' inputMode="decimal" step="any"  onChange={(e)=>setR(e.target.value)}></input></div>

        }
      </div>
    </div>

    {
      calcType=="int"? 
      <div className="freq-container"> 
        <div className="freq-label-div"><label className="freq-label">Compound Frequency</label></div>
        <div className="freq-time">
        <select className="freq-option-bar" value={freqType} onChange={(e)=>{setFreqType(e.target.value); resetValues()}} >
          <option >Yearly-Compounding</option>
          <option>Monthly-Compounding</option>
          <option>Daily-Compounding</option>
        </select>
        </div>
      </div>
      :null
    }
    
    <div className="time-container">
      <div className="time-label-div"><label className="time-label">Loan Tenure</label></div>
      <div className="loan-time">
        <select className="option-bar" value={tenureType} onChange={(e)=>{setTenureType(e.target.value); resetValues()}} >
          <option >Years</option>
          <option>Months</option>
          {
           calcType=="int"? <option>Days</option>
           :null
          }
          
        </select>
        {
          empty? <div className="loan-time-input"><input type='number' pattern="\d*" min='1' placeholder="This field is mandatory" onChange={(e)=> setN(e.target.value)}></input></div>
          : <div className="loan-time-input"><input type='number' pattern="\d*" min='1' onChange={(e)=> setN(Number(e.target.value))}></input></div>
        }
      </div>
    </div>
  
    <div className="btns-container">
      <div className="calc-btn-container">
      <button className="clc-btn" onClick={()=>calcType=="emi"? calcEmi() : calcInt()}>Calculate</button>
      </div>
    
      <div className="reset-btn-container">
        <button className="reset-btn" onClick={resetCalc}>Reset</button>
      </div>
    </div>

    <div className="result-clm">
      <div className="amount-bar" >
        {
         calcType=="emi" ? <div className="emi-div">EMI : ₹{emi}</div>
         :null
        }
        
        <div className="int-div">Total Interest : ₹{interest}</div>
        <div className="totalPay-div">Total Payment : ₹{amount}</div>
      </div>
      <div className="result-pie">
        <Doughnut
          data={{
            labels:["Principal", "Interest"],
            datasets:[
              {
              data:[prinPortion,intPortion],
              backgroundColor: ["#e3eb4dff","#0bcd45ff"],
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
                    size:13,
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