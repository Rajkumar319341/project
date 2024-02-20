import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import './Loan.css'

const LoanPage = () => {
  const [loanType, setLoanType] = useState("");
  const [vendor, setVendor] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [emi, setEmi] = useState("");
  const [tenure, setTenure] = useState("");
  const [roi, setRoi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pendingAmount, setPendingAmount] = useState("");
  const [loanData, setLoanData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const token = btoa("c4eadmin:admin@1234");
        const response = await axios.get(`https://money-xg9v.onrender.com/api/v1/loan/user/${userId}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setLoanData(response.data.loan);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    if (userId) {
      fetchLoanData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recordId = uuid();
    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.post(
        "https://money-xg9v.onrender.com/api/v1/loan",
        {
          userId,
          loanDetails: [
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
          ],
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log("Response:", response);
      if (response.status === 201) {
        console.log("Data saved Successfully");
        setLoanData([...loanData, response.data]); // Add newly added loan data to the state
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }

    // Reset form fields after submission
    setLoanType("");
    setVendor("");
    setLoanAmount("");
    setEmi("");
    setTenure("");
    setRoi("");
    setStartDate("");
    setEndDate("");
    setPendingAmount("");
  };

  return (
    <div className="page-container4">
      <div className="container4">
        <div className="form-container4">
          <h2>Your Loan Details</h2>
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
            <button  type="submit"   style={{
                      marginLeft: "30px",
                      width: "30%",
                    }}>Save</button>
          </form>
        </div>

        <div className="table-container4">
          <h2>Loan Table</h2>
          <table className="table4">
            <thead>
              <tr>
                <th>Loan Type</th>
                <th>Loan Amount</th>
                <th>EMI</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Pending Amount</th>
              </tr>
            </thead>
            <tbody>
              {loanData && loanData.map((loan) => (
                loan.loanDetails && loan.loanDetails.map((detail) => (
                  <tr key={detail.recordId}>
                    <td>{detail.loanType}</td>
                    <td>{detail.loanAmount}</td>
                    <td>{detail.emi}</td>
                    <td>{detail.startDate ? detail.startDate.substring(0, 10) : ""}</td>
                    <td>{detail.endDate ? detail.endDate.substring(0, 10) : ""}</td>
                    <td>{detail.pendingAmount}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanPage;
