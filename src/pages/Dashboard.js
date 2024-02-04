import React, { useState } from "react";
import { Chart, ArcElement } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/dashboard.css";
import { Pie } from "react-chartjs-2";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");
  Chart.register(ArcElement);

  const addTransaction = () => {
    const newTransaction = {
      date: selectedDate.toLocaleDateString(),
      amount: parseFloat(amount),
      description,
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
  };

  const editTransaction = (index) => {};

  const deleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const calculateNetAmount = () => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return totalIncome - totalExpense;
  };

  const dataForPieChart = {
    labels: ["IncomeIncome", "Expense"],
    datasets: [
      {
        data: [
          transactions
            .filter((transaction) => transaction.type === "income")
            .reduce((acc, transaction) => acc + transaction.amount, 0),
          transactions
            .filter((transaction) => transaction.type === "expense")
            .reduce((acc, transaction) => acc + transaction.amount, 0),
        ],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  return (
    <div>
      <div className="add-transaction">
        <h2>Add Transaction</h2>
        <div>
          <label>Tarih:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
        <div>
          <label>Miktar:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Tür:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Gelir</option>
            <option value="expense">Gider</option>
          </select>
        </div>
        <div>
          <label>Açıklama:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button onClick={addTransaction}>Ekle</button>
      </div>

      <div className="transaction-list">
        <h2>Hareketlerim</h2>
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Tür</th>
              <th>Miktar</th>
              <th>Açıklama</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>
                  <button onClick={() => editTransaction(index)}>
                    Düzenle
                  </button>
                  <button onClick={() => deleteTransaction(index)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="net-amount">
        <h2>Net Miktar: {calculateNetAmount()}</h2>
      </div>

      <div className="pie-chart">
        <Pie data={dataForPieChart} />
      </div>
    </div>
  );
}

export default Dashboard;
