import React, { useState } from "react";
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

 

  const handlesubmit = async (e) => {
    e.preventDefault();
    const recordId = uuid();
    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.post(apiUrl, {
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
      }, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      if (response.status === 201) {
        console.log("Data saved Successfully");
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
          <form onSubmit={handlesubmit}>
            <h2> Your Investments </h2>
            <div className={InvestmentCSS.form_group3}>
              <div className={InvestmentCSS.form_column}>
                <label> Investment Type</label>
                <input
                  type="text"
                  id="invType"
                  placeholder="Enter Investment Type"
                  value={invType}
                  onChange={(e) => setInvType(e.target.value)}
                ></input>

                <label> Investment Amount</label>
                <input
                  type="text"
                  id="invAmount"
                  placeholder="Enter Investment Amount"
                  value={invAmount}
                  onChange={(e) => setInvAmount(e.target.value)}
                ></input>

                <label>Maturity Amount</label>
                <input
                  type="text"
                  id="matAmount"
                  placeholder="Enter Maturity Amount"
                  value={matAmount}
                  onChange={(e) => setMatAmount(e.target.value)}
                ></input>
              </div>

              <div className={InvestmentCSS.form_column}>
                <label> Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  placeholder="Enter Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
                <label> End Date</label>
                <input
                  type="date"
                  id="endDate"
                  placeholder="Enter End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>

                <label> Current Value</label>
                <input
                  type="text"
                  id="curValue"
                  placeholder="Enter Current Value"
                  value={curValue}
                  onChange={(e) => setCurValue(e.target.value)}
                ></input>
              </div>
            </div>
            <div
              className={InvestmentCSS.right_column1}
              style={{ marginRight: "80%" }}
            >
              <button type="submit">Save </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Investments;
