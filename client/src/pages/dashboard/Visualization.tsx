import React, { useEffect } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import ExpenseChart from "./ExpenseChart";

const Visualization = () => {
  const { records } = useFinancialRecords();

  return (
    <div className="visualization-container">
      <h1> Categories Visualization</h1>
      <ExpenseChart records={records} />
    </div>
  );
};

export default Visualization;
