import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const editTransaction = (index, transaction) => {
    const newTransactions = [...transactions];
    newTransactions[index] = transaction;
    setTransactions(newTransactions);
  };

  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  };

  const handleEdit = (index) => {
    setEditedTransaction(transactions[index]);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditedTransaction(null);
    setEditMode(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const calculateNetAmount = () => {
    return transactions.reduce((acc, curr) => {
      return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
  };

  const dataForPieChart = () => {
    const filteredTransactions = transactions.filter(
      (transaction) =>
        selectedDate === null ||
        new Date(transaction.date).toDateString() ===
          selectedDate.toDateString()
    );

    const groupedData = filteredTransactions.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.keys(groupedData).map((type, index) => ({
      name: type,
      value: groupedData[type],
      fill: COLORS[index % COLORS.length],
    }));
  };

  return (
    <div>
      <div>{/* Form for adding or editing transactions */}</div>
      <div>{/* Table for displaying transactions */}</div>
      <div>
        {/* Net amount */}
        Net Amount: {calculateNetAmount()}
      </div>
      <div>
        {/* Pie chart */}
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={dataForPieChart()}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {dataForPieChart().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
