import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import currencyFormat from 'currency-formatter';

function Expenses() {
  const { addIncome, expenses, getExpenses, updateExpense, deleteExpense, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Pengeluaran</h1>
        <h2 className="total-income">
          Total : <span>{currencyFormat.format(totalExpenses(), { code: 'IDR' })}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } = income;
              console.log(income);
              return (
                <IncomeItem key={_id} id={_id} title={title} description={description} amount={amount} date={date} type={type} category={category} indicatorColor="var(--color-red)" updateItem={updateExpense} deleteItem={deleteExpense} />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(252, 246, 249, 0.6);
    border: transparent;
    box-shadow: 0px 1px 15px rgba(0, 0, 255, 0.2);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-red);
    }
  }
  .income-content {
    display: flex;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Expenses;
