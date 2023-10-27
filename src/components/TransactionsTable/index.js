import './style.css';
import { Radio, Select, Table } from "antd";
import React from "react";
import { useState } from "react";
import searchImg from "../../assets/searchImg.svg";
import { unparse } from "papaparse";
import { toast } from "react-toastify";
import { parse } from "papaparse";
function TransactionTable({transactions,addTransaction,fetchTransactions}){
    const[search,setSearch]=useState("");
    const[sortKey,setSortKey]=useState("");
    const[typeFilter,setTypeFilter]=useState("");
const{Option}=Select;
   const columns=[
    {title:"Name",
     dataIndex:"name",
     key:"name"
},
{
    title:"Type",
    dataIndex:"type",
    key:"type",
},
{title:"Amount",
dataIndex:"amount",
key:"amount"
},
{title:"Tag",
dataIndex:"tag",
key:'tag'
},
{title:"Date",
dataIndex:"date",
key:'date'
} 
]
let filteredTransactions=transactions.filter((item)=>
item.name.toLowerCase().includes(search.toLowerCase())
&& (item.type && item.type.includes(typeFilter))
)
let sortedTransactions=[...filteredTransactions].sort((a,b)=>{
    if(sortKey==="date"){
        return new Date(a.date)-new Date(b.date);
    }
    else if(sortKey==="amount"){
        return a.amount-b.amount;
    }
    else{
        return 0;
    }
})
function importFromCsv(e){
    e.preventDefault();
    try{
        parse(e.target.files[0],{
            header:true,
            complete:async function (results){
              for(const transaction of results.data){
                const newTransaction={
                    ...transaction,
                    amount:parseFloat(transaction.amount),
                };
                await addTransaction(newTransaction,true);
              }
            } })
            toast.success("All Transactions Added");
            fetchTransactions();
            e.target.files=null; 
            }
            catch(e){
                toast.error(e.message);
            }

        }
    
function exportCSV(){
    var csv=unparse({
        fields:["name","type","tag","date","amount"],
        data:transactions,
    });
    var blob=new Blob([csv],{type:"text/csv;charset=ut-8;"});
    var url=URL.createObjectURL(blob);
    const tempLink=document.createElement("a");
    tempLink.href=url;
    tempLink.download="transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
}

console.log(filteredTransactions);
    return(
    <div style={{
        width:"100",
        padding:"0rem 2rem",
    }}>
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            gap:"1rem",
            alignItems:"center",
            marginBottom:"1rem"
        }}>
    <div className="input-flex">
        <img src={searchImg} width="16"/>  
        <input value={search} 
        onChange={(e)=>setSearch(e.target.value)}
         placeholder="search by name"/>
         </div>
         <Select
         className="select-input"
         onChange={(value)=>setTypeFilter(value)}
         value={typeFilter}
         placeholder="Filter"
         allowClear
         >
            <Option value="">
                All
            </Option>
            
            <Option value="income">
            Income
            </Option>
            
            <Option value="expense">
                Expense
            </Option>
         </Select>
         </div>
        <div className="my-table">
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                width:"100",
                marginBottom:"1rem",
                flexWrap:"wrap",
                background:"var(--white)"
            }}>
                <h2 className="headingmytransaction">My Transactions</h2>
         <Radio.Group
         className="input-radio"
         onChange={(e)=>setSortKey(e.target.value)}
         value={sortKey}>
        <Radio.Button value="">No Sort</Radio.Button>
        <Radio.Button value="date">Sort by Date</Radio.Button>
        <Radio.Button value="amount">Sort by Amount</Radio.Button>
         </Radio.Group>
         <div style={{
            display:"flex",
            justifyContent:"center",
            gap:"1rem",
            width:"400px",
         }}>
            <button className="btn" onClick={exportCSV}>
                Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">import from CSV</label>
            <input
            id="file-csv"
            type="file"
            accept=".csv"
            required
            onChange={importFromCsv}
            style={{display:"none"}}></input>
            </div>
            </div>
<Table dataSource={sortedTransactions} columns={columns}></Table>
</div>
</div>
)
}

export default TransactionTable;