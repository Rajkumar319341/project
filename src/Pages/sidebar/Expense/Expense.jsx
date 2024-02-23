import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCSS from "./Expense.module.css";
import "jspdf-autotable";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";

const Expense = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const userId = localStorage.getItem("userId");
  console.log("userID:", userId);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      await workbook.xlsx.load(data);

      const sheet = workbook.getWorksheet(1); // Assuming the data is in the first sheet

      const rows = [];
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          // Skip header row
          rows.push({
            recordId: row.getCell(1).value.toString(),
            accountId: row.getCell(2).value.toString(),
            description: row.getCell(3).value.toString(),
            amount: row.getCell(4).value.toString(),
            dot: row.getCell(5).value.substring(0, 10), // Assuming dot is a date string in the format 'yyyy-mm-dd'
          });
        }
      });

      console.log("Parsed data:", rows);

      // Send the parsed data to your API endpoint for storage
      try {
        const token = btoa("c4eadmin:admin@1234");
        const response = await axios.post(
          "https://money-xg9v.onrender.com/api/v1/expense",
          {
            userId: userId,
            accountDetails: rows,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${token}`,
            },
          }
        );

        console.log("Response:", response);
        if (response.status === 200) {
          console.log("Data imported successfully");
          // Refresh expense data after successful import
          fetchExpenseData();
        } else {
          console.log("Failed to import data:", response.data.message);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.post(
        "https://money-xg9v.onrender.com/api/v1/expense",
        {
          userId: userId,
          accountDetails: [
            {
              recordId: address,
              accountId: bankName,
              description: expenseTitle,
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
        fetchExpenseData();
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }

    setExpenseTitle("");
    setBankName("");
    setAddress("");
    setAmount("");
    setDate("");
  };

  const fetchExpenseData = async () => {
    try {
      const token = btoa("c4eadmin:admin@1234");
      const response = await axios.get(
        `https://money-xg9v.onrender.com/api/v1/expense/user/${userId}`,
        {
          headers: {
            Authorization:`Basic ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setExpenseData(response.data.expense);
        console.log("data retreieved Successfully");
      } else {
        console.log("Failed to fetch income data");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const exportToPDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Add table using autotable plugin
    doc.autoTable({
      head: [["Income Title", "Bank Name", "Branch", "Amount", "Date"]],
      body: expenseData.map((expense) => [
        expense.description,
        expense.accountId,
        expense.recordId,
        expense.amount,
        expense.dot.substring(0, 10),
      ]),
    });

    // Save the PDF
    doc.save("expenses.pdf");
  };

  useEffect(() => {
    if (userId) {
      fetchExpenseData();
    }
  }, [userId]);

  return (
    <div className={ExpenseCSS.container}>
      <form onSubmit={handleSave} className={ExpenseCSS.form_container}>
        {/* Your form content */}
      </form>

      <div className={ExpenseCSS.page_container1}>
        <div className={ExpenseCSS.container1}>
          <div className={ExpenseCSS.form_container1}>
            <h2 className={ExpenseCSS.h2}>
              <span> Expense Table</span>
            </h2>
            <div className={ExpenseCSS.tools}>
              <label className={ExpenseCSS.label2} htmlFor="file"></label>
              <button className={ExpenseCSS.importbutton}>
                import PDF Here{" "}
                <span
                  role="img"
                  aria-label="sticker"
                  className={ExpenseCSS.sticker}
                >
                  👉 {/* Use any desired icon or sticker */}
                </span>
              </button>
              <input
                type="file"
                tabIndex={"Upload File"}
                id="file"
                accept=".xlsm"
                onChange={handleFileChange}
                className={ExpenseCSS.import}
              />
              <button className={ExpenseCSS.pdfbutton} onClick={exportToPDF}>
                Export to PDF
              </button>
            </div>

            <table className={ExpenseCSS.table}>
              <thead>
                <tr>
                  <th className={ExpenseCSS.tr}>Expense Title</th>
                  <th className={ExpenseCSS.tr}>Bank Name</th>
                  <th className={ExpenseCSS.tr}>Branch</th>
                  <th className={ExpenseCSS.tr}>Amount</th>
                  <th className={ExpenseCSS.tr}>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenseData &&
                expenseData.length > 0 &&
                expenseData[0].accountDetails ? (
                  expenseData[0].accountDetails.map((expense, index) => (
                    <tr key={index}>
                      <td className={ExpenseCSS.td}>{expense.description}</td>
                      <td className={ExpenseCSS.td}>{expense.accountId}</td>
                      <td className={ExpenseCSS.td}>{expense.recordId}</td>
                      <td className={ExpenseCSS.td}>{expense.amount}</td>
                      <td className={ExpenseCSS.td}>
                        {expense.dot.substring(0, 10)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No expense data available.</td>
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

export default Expense;