import React from 'react'
import { Line, Pie } from '@ant-design/charts';
function Charts({sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
        return {date:item.date,amount:item.amount};
    });
    const spendingData=sortedTransactions.filter((transaction)=>{
      if(transaction.type==="expense"){
        return {tag:transaction.tag,amount:transaction.amount}
      }
    });
    let newSpendings=[{tag:"food",amount:0},{tag:"office",amount:0},{tag:"education",amount:0}];
    spendingData.forEach((item)=>{
         if(item.tag=="food"){
          newSpendings[0].amount+=item.amount;
         }
         else if(item.tag==="office"){
          newSpendings[1].amount+=item.amount;
         }
         else {
          newSpendings[2].amount+=item.amount;
         }
    })
      const config = {
        data:data,
        width: 750,
        height: 400,
        autoFit: false,
        xField: "date",
        yField: "amount",
        point: {
          size: 4,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };
      const SpendingConfig={
        data:newSpendings,
        width:400,
        angleField:"amount",
        colorField:"tag",
      }
  let chart;
  let pieChart;
    return (
    <div className='chart-wrapper'>
      <div style={{minWidth:"60%"}}>
        <h2 style={{color:'var(--black)'}}>Your Analytics</h2>
  <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
  </div>
  <div>
        <h2 style={{color:'var(--black)'}}>Your Spending</h2>
  <Pie {...SpendingConfig} onReady={(chartInstance)=>(pieChart=chartInstance)}></Pie>
  </div>
    </div>
  )
}

export default Charts
