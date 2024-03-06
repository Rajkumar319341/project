import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCSS from "./Expense.module.css";
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

const Expense = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenseData, setExpenseData] = useState([]);
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
      "Expense Title",
      "Bank Name",
      "Branch",
      "Amount",
      "Date",
    ];
    const tableRows = [];

    const filteredData = expenseData[0]?.accountDetails.filter((expense) => {
      return (
        expense.description.toLowerCase().includes(filterTitle.toLowerCase()) &&
        expense.accountId.toLowerCase().includes(filterBank.toLowerCase()) &&
        expense.recordId.toLowerCase().includes(filterBranch.toLowerCase()) &&
        expense.amount.toString().includes(filterAmount) &&
        (expense.dot
          ? expense.dot.substring(0, 10).includes(filterDate)
          : false)
      );
    });

    filteredData.forEach((expense) => {
      const expenseData = [
        expense.description,
        expense.accountId,
        expense.recordId,
        expense.amount,
        expense.dot ? expense.dot.substring(0, 10) : "", // Check if expense.dot is not null before calling substring
      ];
      tableRows.push(expenseData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("ExpenseData.pdf");
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
        // Refresh expense data after successful save
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
            Authorization: `Basic ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setExpenseData(response.data.expense);
        console.log("data retreieved Successfully");
      } else {
        console.log("Failed to fetch expense data");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpenseData();
    }
  }, [userId]);

  const filteredData = expenseData[0]?.accountDetails.filter((expense) => {
    return (
      expense.description.toLowerCase().includes(filterTitle.toLowerCase()) &&
      expense.accountId.toLowerCase().includes(filterBank.toLowerCase()) &&
      expense.recordId.toLowerCase().includes(filterBranch.toLowerCase()) &&
      expense.amount.toString().includes(filterAmount) &&
      (expense.dot ? expense.dot.substring(0, 10).includes(filterDate) : false)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={ExpenseCSS.container}>
      <form onSubmit={handleSave} className={ExpenseCSS.form_container}>
        <h2 style={{borderBottom:"2px solid #007bff",color:"#007bff",paddingBottom:"10px",fontSize:"24px"}}> Your Expense</h2>
        <div className={ExpenseCSS.form_group_remained1}>
          <label htmlFor="expenseTitle">Expense Title</label>
          <input
            type="text"
            id="expenseTitle"
            placeholder="Enter Expense Title"
            value={expenseTitle}
            onChange={(e) => setExpenseTitle(e.target.value)}
          />
        </div>
        <div className={ExpenseCSS.form_group}>
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
        <div className={ExpenseCSS.form_group_remained1}>
          <label>Enter Your Branch</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={ExpenseCSS.form_group_remained}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={ExpenseCSS.form_group_remained}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <br />
        <div className={ExpenseCSS.form_group}>
          <button type="submit" className={ExpenseCSS.btn_ExpenseSaveChanges}>
            Save
          </button>
        </div>
      </form>

      <div className={ExpenseCSS.page_container1}>
        <div className={ExpenseCSS.container1}>
          <div className={ExpenseCSS.form_container1}>
            <h2 className={ExpenseCSS.h2}>
              <span style={{borderBottom:"2px solid #007bff",color:"#007bff",paddingBottom:"10px",fontSize:"24px"}}> Expense Table</span>
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
                className={ExpenseCSS.import}
              />
              <button className={ExpenseCSS.pdfbutton} onClick={downloadPdf}>
                Export to PDF
              </button>
            </div>
            <TableContainer component={Paper}>
              <Table className={ExpenseCSS.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TextField
                        value={filterTitle}
                        onChange={(e) => setFilterTitle(e.target.value)}
                        label="Expense Title"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={filterBank}
                        onChange={(e) => setFilterBank(e.target.value)}
                        label="Bank Name"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value)}
                        label="Branch"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={filterAmount}
                        onChange={(e) => setFilterAmount(e.target.value)}
                        label="Amount"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        label="Date"
                        // type="date"
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
                    : filteredData
                  )?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.accountId}</TableCell>
                      <TableCell>{row.recordId}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>
                        {row.dot ? row.dot.substring(0, 10) : ""}
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

export default Expense;
