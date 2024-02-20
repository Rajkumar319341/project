import React, { useState, useEffect } from "react";
import InvestmentCSS from "./Investments.module.css";
import { v4 as uuid } from "uuid";
import axios from "axios";
const apiUrl = "https://money-xg9v.onrender.com/api/v1/investment";

function Investments() {
  const [invType, setInvType] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [matAmount, setMatAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [curValue, setCurValue] = useState("");
  const [investmentData, setInvestmentData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const token = btoa("c4eadmin:admin@1234");
        const response = await axios.get(`${apiUrl}/user/${userId}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setInvestmentData(response.data.investment);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    if (userId) {
      fetchInvestmentData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recordId = uuid();
    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.post(
        apiUrl,
        {
          userId: localStorage.getItem("userId"),
          recordid: recordId,
          collectionname: "investments",
          details: {
            investmentType: invType,
            investedAmount: invAmount,
            maturityAmount: matAmount,
            startDate: startDate,
            endDate: endDate,
            currentValue: curValue,
          },
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Data saved Successfully");
        // Refresh investment data after successful save
        setInvestmentData();
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
    setInvType("");
    setInvAmount("");
    setMatAmount("");
    setStartDate("");
    setEndDate("");
    setCurValue("");
  };

  return (
    <div className={InvestmentCSS.page_container3}>
      <div className={InvestmentCSS.container3}>
        <div className={InvestmentCSS.form_container3}>
          <form onSubmit={handleSubmit}>
            <h2>Your Investments</h2>
            <div className={InvestmentCSS.form_group3}>
              <div className={InvestmentCSS.form_column}>
                <label>Investment Type</label>
                <input
                  type="text"
                  id="invType"
                  placeholder="Enter Investment Type"
                  value={invType}
                  onChange={(e) => setInvType(e.target.value)}
                />

                <label>Investment Amount</label>
                <input
                  type="text"
                  id="invAmount"
                  placeholder="Enter Investment Amount"
                  value={invAmount}
                  onChange={(e) => setInvAmount(e.target.value)}
                />

                <label>Maturity Amount</label>
                <input
                  type="text"
                  id="matAmount"
                  placeholder="Enter Maturity Amount"
                  value={matAmount}
                  onChange={(e) => setMatAmount(e.target.value)}
                />
              </div>

              <div className={InvestmentCSS.form_column}>
                <label>Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  placeholder="Enter Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label>End Date</label>
                <input
                  type="date"
                  id="endDate"
                  placeholder="Enter End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />

                <label>Current Value</label>
                <input
                  type="text"
                  id="curValue"
                  placeholder="Enter Current Value"
                  value={curValue}
                  onChange={(e) => setCurValue(e.target.value)}
                />
              </div>
            </div>
            <div className={InvestmentCSS.right_column1}>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>

        <div className={InvestmentCSS.table_container}>
          <h2> Investments Table</h2>
          <table className={InvestmentCSS.table}>
            <thead>
              <tr>
                <th>Investment Type</th>
                <th>Invested Amount</th>
                <th>Maturity Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Current Value</th>
              </tr>
            </thead>
            <tbody>
              {investmentData &&
                investmentData.length > 0 &&
                investmentData.map((investment) =>
                  investment.details.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.investmentType}</td>
                      <td>{detail.investedAmount}</td>
                      <td>{detail.maturityAmount}</td>
                      <td>
                        {detail.startDate
                          ? detail.startDate.substring(0, 10)
                          : ""}
                      </td>
                      <td>
                        {detail.endDate ? detail.endDate.substring(0, 10) : ""}
                      </td>

                      <td>{detail.currentValue}</td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Investments;
