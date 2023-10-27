import React from 'react';
import './style.css';
import { Card, Row } from 'antd';
import Button from '../Button';

function Cards({
    income,expense,totalBalance,
    showExpenseModal, showIncomeModal,resetdata}) {
    return(
        <div className='cardsdata'>
       <Row className='myrow'>
           <Card className="mycard" bordered={true}>
            <h2>Current Balance</h2>
            <p>{totalBalance}</p>
            <Button text="Reset Balance"blue={true} onClick={resetdata}></Button>
            </Card>

            <Card bordered={true} className="mycard">
            <h2>Total Income</h2>
            <p>{income}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal}></Button>
            </Card>
            <Card className="mycard" bordered={true}>
            <h2>Total Expense</h2>
            <p>{expense}</p>
            <Button text="Add Expense" blue={true} onClick={showExpenseModal}></Button>
            </Card>
        </Row>
       </div>
    )
}
export default Cards;