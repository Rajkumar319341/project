import { useState, useEffect } from "react";
import axios from "axios";
import IncomeCSS from "./Income.module.css";

const Income = () => {
  const [incomeTitle, setIncomeTitle] = useState("");
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const userId = localStorage.getItem("userId");

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.post(
        "https://money-xg9v.onrender.com/api/v1/income",
        {
          userId: userId,
          accountDetails: [
            {
              recordId: address,
              accountId: bankName,
              description: incomeTitle,
              amount: amount.toString(),
              dot: date,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
        }
      );

      console.log("Response:", response);
      if (response.status === 201) {
        console.log("Data saved successfully");
        // Refresh income data after successful save
        fetchIncomeData();
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }

    setIncomeTitle("");
    setBankName("");
    setAddress("");
    setAmount("");
    setDate("");
  };

  const fetchIncomeData = async () => {
    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.get(
        `https://money-xg9v.onrender.com/api/v1/income/user/${userId}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      if (response.status===200) {
        setIncomeData(response.data.income);
        console.log("data retreieved Successfully")
      } else {
        console.log("Failed to fetch income data");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchIncomeData();
    }
  }, [userId]);

  return (
    <div className={IncomeCSS.container}>
      <form onSubmit={handleSave} className={IncomeCSS.form_container}>
        <h2> Your Income</h2>
        <div className={IncomeCSS.form_group_remained1}>
          <label htmlFor="incomeTitle">Income Title</label>
          <input
            type="text"
            id="incomeTitle"
            placeholder="Enter Income Title"
            value={incomeTitle}
            onChange={(e) => setIncomeTitle(e.target.value)}
          />
        </div>
        <div className={IncomeCSS.form_group}>
          <label>Select Bank Name</label>
          <select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          >
            <option value="">Select</option>
            <option value="SBI">SBI</option>
            <option value="HDFC">HDFC</option>
            <option value="Karnataka">Karnataka</option>
            <option value="ICICI">ICICI</option>
            <option value="AXIS">AXIS</option>
            <option value="CANARA">CANARA</option>
            <option value="HDFC">HDFC</option>
          </select>
        </div>
        <div className={IncomeCSS.form_group_remained1}>
          <label>Enter Your Branch</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={IncomeCSS.form_group_remained}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={IncomeCSS.form_group_remained}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <br />
        <div className={IncomeCSS.form_group}>
          <button
            type="submit"
            className={IncomeCSS.btn_IncomeSaveChanges}
          >
            Save
          </button>
        </div>
      </form>

      <div className={IncomeCSS.page_container1}>
  <div className={IncomeCSS.container1}>
    <div className={IncomeCSS.form_container1}>
    <h2> Income Table</h2>

      <table className={IncomeCSS.table}>
        <thead>
          <tr>
            <th>Income Title</th>
            <th>Bank Name</th>
            <th>Branch</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomeData && incomeData.length > 0 && incomeData[0].accountDetails ? (
            incomeData[0].accountDetails.map((income, index) => (
              <tr key={index}>
               
               <td>{income.description}</td>
                <td>{income.accountId}</td>
                <td>{income.recordId}</td>
                <td>{income.amount}</td>
                <td>{income.dot.substring(0,10)}</td>
               
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No income data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>

  );
};

export default Income;
