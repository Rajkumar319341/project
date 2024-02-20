import React, { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import './Loan.css'

const LoanForm = () => {
  const [loanType, setLoanType] = useState("");
  const [vendor, setVendor] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [emi, setEmi] = useState("");
  const [tenure, setTenure] = useState("");
  const [roi, setRoi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pendingAmount, setPendingAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recordId = uuid();
    const userId = localStorage.getItem("userId");
    const loanDetails = [
      {
        recordId,
        loanType,
        vendor,
        loanAmount,
        emi,
        tenure,
        roi,
        startDate,
        endDate,
        pendingAmount,
      },
    ];
    try {
      const response = await axios.post(
        "https://money-xg9v.onrender.com/api/v1/loan",
        { userId, loanDetails }
      );
      console.log("Response:", response);
      if (response.status === 201) {
        console.log("Data saved Successfully");
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    
    <div className="page-container4">
      <div className="container4">
        <div className="form-container4">
          <h2> Your Loan Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group4">
              <div className="form-column">
                <label>Type Of Loan</label>
                <input
                  type="text"
                  id="loanType"
                  placeholder="Type Of Loan"
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                />
                <label>Enter Loan Amount</label>
                <input
                  type="text"
                  id="loanAmount"
                  placeholder="Enter Loan Amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
                <label>Enter Tenure</label>
                <input
                  type="text"
                  id="tenure"
                  placeholder="Enter Tenure"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
                <label>Enter Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  placeholder="Enter Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <div className="form-column">
                  <button
                    type="submit"
                    style={{
                      marginTop: "30px",
                      marginLeft: "30px",
                      width: "50%",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="form-column">
                <label>Vendor</label>
                <input
                  type="text"
                  id="vendor"
                  placeholder="Enter Vendor Here"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                />
                <label>EMI To Pay</label>
                <input
                  type="text"
                  id="emi"
                  placeholder="EMI To Pay"
                  value={emi}
                  onChange={(e) => setEmi(e.target.value)}
                />
                <label>Return On Investment(ROI)</label>
                <input
                  type="text"
                  id="roi"
                  placeholder="Enter ROI"
                  value={roi}
                  onChange={(e) => setRoi(e.target.value)}
                />
                <label>Enter End Date</label>
                <input
                  type="date"
                  id="endDate"
                  placeholder="Enter End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <label>Enter Pending Amount</label>
                <input
                  type="text"
                  id="pendingAmount"
                  placeholder="Enter Pending Amount"
                  value={pendingAmount}
                  onChange={(e) => setPendingAmount(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
