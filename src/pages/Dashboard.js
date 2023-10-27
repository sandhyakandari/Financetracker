import { React,useEffect,useState } from "react";
import Header from "../components/Header";
import Cards from "../components/cards";
import AddExpense from "../components/Modal/AddExpense";
import AddIncome from "../components/Modal/AddIncome";
import {query, addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import NoTransactions from "../components/NoTransactions";
import TransactionTable from "../components/TransactionsTable";
import Charts from "../components/charts";
 const Dashboard=()=>{
    const[transactions,setTransaction]=useState([]);
    const[loading,setLoading]=useState(false);
    const[user]=useAuthState(auth);
    const [isExpenseModalVisible,setExpenseModalVisible]=useState(false);
    const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
    const[income,setIncome]=useState(0);
    const[expense,setExpense]=useState(0);
    const[totalBalance,setTotalBalance]=useState(0)
    const showExpenseModal=()=>{
        setExpenseModalVisible(true);
    }
    const showIncomeModal=()=>{
       setIsIncomeModalVisible(true);
    }
    const handleExpenseCancel=()=>{
        setExpenseModalVisible(false);
    }
    const handleIncomeCancel=()=>{
        setIsIncomeModalVisible(false);
    }
    const onFinish=(values,type)=>{
       const newTransaction={
        type:type,
        date:values.date.format("YYYY-MM-DD"),
        amount:parseFloat(values.amount),
        tag:values.tag,
        name:values.name,
       }
       addTransaction(newTransaction);
    };
async function addTransaction(transaction,many){ 
    try{
        const docRef=await addDoc(
            collection(db,`users/${user.uid}/transactions`),
            transaction
        );
        if(!many) toast.success("Transaction Added");
        let newArr=transactions;
        newArr.push(transaction);
        setTransaction(newArr);
        calculateBalance();
    }
    catch(e){
       if(!many) toast.error("Couldn't add transaction")
    }
}
useEffect(()=>{
//get all doc from collection
    fetchTransactions();
},[user])
useEffect(()=>{
    calculateBalance();
},[transactions])
const calculateBalance=()=>{
let incomeTotal=0;
let expensesTotal=0;
transactions.forEach((transaction)=>{
    if(transaction.type==="income"){
        incomeTotal+=transaction.amount;
    }
    else{
        expensesTotal+=transaction.amount;
    }
})
setIncome(incomeTotal);
setExpense(expensesTotal);
setTotalBalance(incomeTotal-expensesTotal);
}
async function resetdata(){
    if(user){
        const q=query(collection(db,`users/${user.uid}/transactions`));
    console.log(q);
        const querySnapshot=await getDocs(q);
      // let delid=[];
        querySnapshot.forEach(async (doc)=>{
       await deleteDoc(doc.ref); 
      
            // delid.push(doc.id);
        })
        //for(let i=0;i<delid.length;i++){
        //    deleteDoc(doc(db,`users/${user.uid}/transactions`,delid[i])); 
       // }
//console.log(delid,"this is delted")
setTransaction([]);
toast.success("Data reset successfully");
  
} }
async function fetchTransactions(){
    setLoading(true);
    if(user){
        const q=query(collection(db,`users/${user.uid}/transactions`));
        const querySnapshot=await getDocs(q);
        let transactionArray=[];
        querySnapshot.forEach((doc)=>{
            transactionArray.push(doc.data());
        })
        setTransaction(transactionArray);
        toast.success("transaction Fetched")
    }
    setLoading(false)
}
let sortedTransactions=transactions.sort((a,b)=>{
    return new Date(a.date)-new Date(b.date);
})
    return(
        <div> 
        <Header></Header>
        {loading ? (<p>Loading...</p>):(
       <> <Cards income={income}
        expense={expense}
        totalBalance={totalBalance}
       showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        resetdata={resetdata}
        ></Cards>
        <AddExpense 
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
        ></AddExpense>
      <AddIncome isIncomeModalVisible={isIncomeModalVisible}
      handleIncomeCancel={handleIncomeCancel}
      onFinish={onFinish}></AddIncome>
      {
       transactions && transactions.length===0?(
            <NoTransactions />
        ):(
            <Charts sortedTransactions={sortedTransactions}></Charts>
        )
      }
      <TransactionTable transactions={transactions} addTransaction={addTransaction} 
      fetchTransactions={fetchTransactions}></TransactionTable>
      </> )}
       </div> )
 }

 export default Dashboard;