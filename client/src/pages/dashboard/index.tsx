import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-form-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";


export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  // Calculate income, expenses, and total balance
  const { totalIncome, totalExpenses, totalBalance } = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    records.forEach((record) => {
      if (record.amount > 0) {
        totalIncome += record.amount;
      } else {
        totalExpenses += record.amount;
      }
    });

    const totalBalance = totalIncome + totalExpenses;

    return { totalIncome, totalExpenses, totalBalance };
  }, [records]);

  // Determine sign and formatted balance
  const sign = totalBalance < 0 ? "-" : "";
  const formattedBalance = `${sign}$${Math.abs(totalBalance).toFixed(2)}`;

  return (
    <div className="dashboard-container">
      
      <h1>Welcome {user?.firstName}! Here Are Your Finances:</h1>

      <div className="balance-container">
        <h4>YOUR BALANCE</h4>
        <h1 className={totalBalance < 0 ? "expense" : "income"}>{formattedBalance}</h1>
      </div>

      <div className="inc-exp-container">
        <div>
          <h4>INCOME</h4>
          <p className="money plus">${totalIncome.toFixed(2)}</p>
        </div>
        <div>
          <h4>EXPENSES</h4>
          <p className="money minus">${Math.abs(totalExpenses).toFixed(2)}</p>
        </div>
      </div>
         
      <FinancialRecordForm />
      <FinancialRecordList />
      
      
    </div>
  );
};
