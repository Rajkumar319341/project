import React, { useState } from "react";
import InsuranceCSS from "./Insurance.module.css";
import axios from "axios";
// import { v4 as uuid } from "uuid";

const apiUrl = "https://money-xg9v.onrender.com/api/v1/insurances";

function Insurance() {
  const [insuranceType, setInsuranceType] = useState("");
  const [policyTerm, setPolicyTerm] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [premiumDueDate, setPremiumDueDate] = useState("");
  const [premiumPayingTerm, setPremiumPayingTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const recordId = uuid();
    try {
      const token = btoa("c4eadmin:admin@123");
      const response = await axios.post(
        apiUrl,
        {
          insuranceType,
          policyTerm,
          premiumAmount,
          premiumDueDate,
          premiumPayingTerm,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `BASIC ${token}`,
          },
        }
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
    // Clearing input fields after form submission
    setInsuranceType("");
    setPolicyTerm("");
    setPremiumAmount("");
    setPremiumDueDate("");
    setPremiumPayingTerm("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={InsuranceCSS.page_container}>
      <div className={InsuranceCSS.container}>
        <div className={InsuranceCSS.form_container}>
          <form onSubmit={handleSubmit}>
            <h2>Your Insurance Details</h2>
            <div className={InsuranceCSS.form_group}>
              <label>Insurance Type</label>
              <input
                type="text"
                placeholder="Enter Insurance Type"
                value={insuranceType}
                onChange={(e) => setInsuranceType(e.target.value)}
              />
            </div>
            <div className={InsuranceCSS.form_group}>
              <label>Policy Term</label>
              <input
                type="text"
                placeholder="Enter Policy Term"
                value={policyTerm}
                onChange={(e) => setPolicyTerm(e.target.value)}
              />
            </div>
            <div className={InsuranceCSS.form_group}>
              <label>Premium Amount</label>
              <input
                type="text"
                placeholder="Enter Premium Amount"
                value={premiumAmount}
                onChange={(e) => setPremiumAmount(e.target.value)}
              />
            </div>
            <div className={InsuranceCSS.form_group}>
              <label>Premium Due Date</label>
              <input
                type="date"
                value={premiumDueDate}
                onChange={(e) => setPremiumDueDate(e.target.value)}
              />
            </div>
            <div className={InsuranceCSS.form_group}>
              <label>Premium Paying Term</label>
              <input
                type="text"
                placeholder="Enter Premium Paying Term"
                value={premiumPayingTerm}
                onChange={(e) => setPremiumPayingTerm(e.target.value)}
              />
            </div>
            <div className={InsuranceCSS.form_group}>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className={InsuranceCSS.form_group}>
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Insurance;
