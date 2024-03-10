import React, { useState, useEffect } from "react";
import axios from "axios";
import IncomeCSS from "./Income.module.css";
import { jsPDF } from "jspdf";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@material-ui/core";
import * as XLSX from "xlsx";

const Income = () => {
  const [incomeTitle, setIncomeTitle] = useState("");
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const userId = localStorage.getItem("userId");

  const [filterTitle, setFilterTitle] = useState("");
  const [filterBank, setFilterBank] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const downloadPdf = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Income Title",
      "Bank Name",
      "Branch",
      "Amount",
      "Date",
    ];
    const tableRows = [];

    incomeData[0]?.accountDetails.forEach((income) => {
      const incomeDataLine = [
        income.description,
        income.accountId,
        income.recordId,
        income.amount,
        income.dot.substring(0, 10),
      ];
      tableRows.push(incomeDataLine);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("IncomeData.pdf");
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Assuming the data is structured in the Excel file as follows:
        // Column A: Income Title
        // Column B: Bank Name
        // Column C: Branch
        // Column D: Amount
        // Column E: Date

        const parsedData = jsonData.map((row) => {
          return [
            row[0] || "", // Income Title
            row[1] || "", // Bank Name
            row[2] || "", // Branch
            row[3] || "", // Amount
            row[4] ? formatDate(row[4]) : "", // Date
          ];
        });

        resolve(parsedData);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? "" : date.toISOString();
  };

  const filteredData = incomeData[0]?.accountDetails.filter((income) => {
    return (
      income.description.toLowerCase().includes(filterTitle.toLowerCase()) &&
      income.accountId.toLowerCase().includes(filterBank.toLowerCase()) &&
      income.recordId.toLowerCase().includes(filterBranch.toLowerCase()) &&
      income.amount.toString().includes(filterAmount) &&
      income.dot &&
      income.dot.substring(0, 10).includes(filterDate)
    );
  });

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
       ` https://money-xg9v.onrender.com/api/v1/income/user/${userId}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIncomeData(response.data.income);
        console.log("data retrieved Successfully");
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleImportExcel = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    try {
      const data = await readExcelFile(file); // Assuming readExcelFile is a function to parse Excel file

      // Process the data and store it
      data.forEach(async (row) => {
        const [incomeTitle, bankName, branch, amount, date] = row;

        try {
          const token = btoa("c4eadmin:admin@1234");
          const response = await axios.post(
            "https://money-xg9v.onrender.com/api/v1/income",
            {
              userId: userId,
              accountDetails: [
                {
                  recordId: branch,
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
            fetchIncomeData();
          } else {
            console.log("Failed to save data:", response.data.message);
          }
        } catch (error) {
          console.error("API Error:", error);
        }
      });
    } catch (error) {
      console.error("Error importing Excel file:", error);
    }
  };

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
          <button type="submit" className={IncomeCSS.btn_IncomeSaveChanges}>
            Save
          </button>
        </div>
      </form>

      <div className={IncomeCSS.page_container1}>
        <div className={IncomeCSS.container1}>
          <div className={IncomeCSS.form_container1}>
            <h2 className={IncomeCSS.h2}>
              <span> Income Table</span>
            </h2>
            <div className={IncomeCSS.tools}>
              <label className={IncomeCSS.label2} htmlFor="file"></label>
              <button className={IncomeCSS.importbutton}>
                import PDF Here{" "}
                <span
                  role="img"
                  aria-label="sticker"
                  className={IncomeCSS.sticker}
                >
                  👉 {/* Use any desired icon or sticker */}
                </span>
              </button>
              <input
                type="file"
                tabIndex={"Upload File"}
                id="file"
                accept=".xlsm"
                className={IncomeCSS.import}
                onChange={handleImportExcel}
              />
              <button className={IncomeCSS.pdfbutton} onClick={downloadPdf}>
                Export to PDF
              </button>
            </div>

            <TableContainer component={Paper}>
              <Table className={IncomeCSS.table} aria-label="income table">
                <TableHead>
                  <TableRow>
                    <TableCell className={IncomeCSS.tr}>
                      <TextField
                        label="Income Title"
                        value={filterTitle}
                        onChange={(e) => setFilterTitle(e.target.value)}
                      />
                    </TableCell>
                    <TableCell className={IncomeCSS.tr}>
                      <TextField
                        label="Bank Name"
                        value={filterBank}
                        onChange={(e) => setFilterBank(e.target.value)}
                      />
                    </TableCell>
                    <TableCell className={IncomeCSS.tr}>
                      <TextField
                        label="Branch"
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value)}
                      />
                    </TableCell>
                    <TableCell className={IncomeCSS.tr}>
                      <TextField
                        label="Amount"
                        value={filterAmount}
                        onChange={(e) => setFilterAmount(e.target.value)}
                      />
                    </TableCell>
                    <TableCell className={IncomeCSS.tr}>
                      <TextField
                        label="Date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(filteredData && rowsPerPage > 0
                    ? filteredData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : []
                  ).map((income, index) => (
                    <TableRow key={index}>
                      <TableCell className={IncomeCSS.td}>
                        {income.description}
                      </TableCell>
                      <TableCell className={IncomeCSS.td}>
                        {income.accountId}
                      </TableCell>
                      <TableCell className={IncomeCSS.td}>
                        {income.recordId}
                      </TableCell>
                      <TableCell className={IncomeCSS.td}>
                        {income.amount}
                      </TableCell>
                      <TableCell className={IncomeCSS.td}>
                        {income.dot.substring(0, 10)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={(filteredData && filteredData.length) || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;