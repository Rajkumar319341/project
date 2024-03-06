import React, { useState, useEffect } from "react";
import axios from "axios";
import dashboardCSS from "./Dashboard.module.css"; // Import CSS module
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [investmentTotal, setInvestmentTotal] = useState(0);
  const [insuranceTotal, setInsuranceTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = btoa("c4eadmin:admin@1234");

        const incomeResponse = await axios.get(
          "https://money-xg9v.onrender.com/api/v1/income",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );

        const accountDetailsIncome = incomeResponse.data[1].accountDetails;
        const totalIncome = accountDetailsIncome.reduce((total, detail) => {
          const parsedAmount = parseFloat(detail.amount);
          return total + (isNaN(parsedAmount) ? 0 : parsedAmount);
        }, 0);
        setIncomeTotal(totalIncome);

        // Fetch expense data
        const expenseResponse = await axios.get(
          "https://money-xg9v.onrender.com/api/v1/expense",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );

        const accountDetailsExpense = expenseResponse.data[1].accountDetails;
        const totalExpense = accountDetailsExpense.reduce((total, detail) => {
          const parsedAmount = parseFloat(detail.amount);
          return total + (isNaN(parsedAmount) ? 0 : parsedAmount);
        }, 0);
        setExpenseTotal(totalExpense);

        // Fetch investment data
        const investmentResponse = await axios.get(
          "https://money-xg9v.onrender.com/api/v1/investment",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        const accountDetailsInvestment = investmentResponse.data[1].details;
        const totalInvestment = accountDetailsInvestment.reduce(
          (total, detail) => {
            const parsedAmount = parseFloat(detail.investedAmount);
            return total + (isNaN(parsedAmount) ? 0 : parsedAmount);
          },
          0
        );
        setInvestmentTotal(totalInvestment);

        // Fetch insurance data
        const insuranceResponse = await axios.get(
          "https://money-xg9v.onrender.com/api/v1/insurances",

          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log("insurance:", insuranceResponse);

        const accountDetailsInsurance = insuranceResponse.data;
        console.log("insuranceDetails:", accountDetailsInsurance);

        const totalInsurance = accountDetailsInsurance.reduce(
          (total, detail) => {
            console.log("Detail premium amount:", detail.premiumAmount);
            // Ensure detail has premiumAmount property and it's not null or undefined
            if (
              detail.hasOwnProperty("premiumAmount") &&
              detail.premiumAmount !== null &&
              detail.premiumAmount !== undefined
            ) {
              const parsedAmount = parseFloat(detail.premiumAmount);
              // Add parsed amount to total if it's a valid number
              if (!isNaN(parsedAmount)) {
                total += parsedAmount;
              }
            }
            return total;
          },
          0
        );

        console.log("Total insurance:", totalInsurance);

        setInsuranceTotal(totalInsurance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const donutChartData = {
    options: {
      labels: ["Income", "Expense", "Investment", "Insurance"],
      colors: [
        "#FF6384", // Bright red
        "#36A2EB", // Bright blue
        "#FFCE56", // Bright yellow
        "#4BC0C0", // Bright green
      ],
    },
    series: [incomeTotal, expenseTotal, investmentTotal, insuranceTotal],
  };
  const barChartData = {
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      xaxis: {
        categories: ["Income", "Expense", "Investment", "Insurance"],
      },
    },
    series: [
      {
        name: "Amount",
        data: [
          incomeTotal, // Income
          expenseTotal, // Expense
          investmentTotal, // Investment
          insuranceTotal, // Insurance
        ],
      },
    ],
    colors: [
      "#FF6384", // Bright red (Income)
      "#36A2EB", // Bright blue (Expense)
      "#FFCE56", // Bright yellow (Investment)
      "#4BC0C0", // Bright green (Insurance)
    ],
  };

  return (
    <div className={dashboardCSS.dashboard}>
      <div className={dashboardCSS.card}>
        <h3 className={dashboardCSS.h3}> Income </h3>
        <p className={dashboardCSS.p}>
          <b> ₹ {incomeTotal}</b>
        </p>
      </div>
      <div className={dashboardCSS.card}>
        <h3 className={dashboardCSS.h3}>Expense</h3>
        <p className={dashboardCSS.p}>
          <b> ₹ {expenseTotal}</b>
        </p>
      </div>
      <div className={dashboardCSS.card}>
        <h3 className={dashboardCSS.h3}>
          <b>Investment </b>
        </h3>
        <p className={dashboardCSS.p}>
          <b> ₹ {investmentTotal}</b>
        </p>
      </div>
      <div className={dashboardCSS.card}>
        <h3 className={dashboardCSS.h3}>
          <b>Insurance</b>
        </h3>
        <p className={dashboardCSS.p}>
          <b> ₹ {insuranceTotal}</b>
        </p>
      </div>

      <div className={dashboardCSS.dashboard}>
        <div className={dashboardCSS.col}>
          <div className={dashboardCSS.dashboards}>
            <div className={dashboardCSS.cards}>
              <ReactApexChart
                options={donutChartData.options}
                series={donutChartData.series}
                type="donut"
                height={400} // Adjust the height as needed
                width={450} // Adjust the width as needed
              />
            </div>
          </div>
        </div>

        <div>
          <div className={dashboardCSS.dashboards}>
            <div className={dashboardCSS.cards}>
              <ReactApexChart
                options={barChartData.options}
                series={barChartData.series}
                type="bar"
                height={300} // Adjust the height as needed
                width={400} // Adjust the width as needed
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;