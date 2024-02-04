import React, { useEffect, useState } from "react";
import { PieChart, BarChart } from "@mui/x-charts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  console.log(transactions);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Gelir");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    fetch("http://localhost:8080/api/v1/balances", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        const transformedData = data.map((balance) => ({
          date: balance.createDate.substring(0, 10),
          amount: balance.amount,
          description: balance.description,
          type: balance.type === "income" ? "Gelir" : "Gider",
        }));
        setTransactions(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  const deleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const dataForPieChart = [
    {
      id: 0,
      value: transactions
        .filter((transaction) => transaction.type === "Gelir")
        .reduce((acc, transaction) => acc + transaction.amount, 0),
      label: "Gelir",
    },
    {
      id: 1,
      value: transactions
        .filter((transaction) => transaction.type === "Gider")
        .reduce((acc, transaction) => acc + transaction.amount, 0),
      label: "Gider",
    },
  ];

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(transaction);
    return acc;
  }, {});

  const monthlyDataForBarChart = Object.entries(groupedTransactions).map(
    ([monthYear, transactions]) => {
      const totalIncome = transactions
        .filter((transaction) => transaction.type === "Gelir")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      const totalExpense = transactions
        .filter((transaction) => transaction.type === "Gider")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      return {
        monthYear,
        income: totalIncome,
        expense: totalExpense,
      };
    }
  );

  return (
    <div className="dashboard">
      <div>
        <div>
          <div>
            {/* <div>
              <PieChart
                colors={["#99bc85", "#36304a"]}
                series={[
                  {
                    data: dataForPieChart,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={400}
                width={400}
              />
            </div>
            <div>
              <BarChart
                colors={["#99bc85", "#36304a"]}
                dataset={monthlyDataForBarChart}
                xAxis={[{ scaleType: "band", dataKey: "monthYear" }]}
                series={[
                  { dataKey: "income", label: "Gelir" },
                  { dataKey: "expense", label: "Gider" },
                ]}
                height={400}
                width={400}
              />
            </div> */}
          </div>
        </div>
        <div>
          <h2>Islem Olustur</h2>

          <form action="">
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
                <option value="Gelir">Gelir</option>
                <option value="Gider">Gider</option>
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
          </form>
        </div>
      </div>

      <div>
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
                <td className="buttons">
                  <button onClick={() => deleteTransaction(index)}>Sil</button>
                  <button onClick={() => deleteTransaction(index)}>
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
