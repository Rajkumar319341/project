import React, { useState, useEffect } from "react";
import IncomeCSS from "./Income.module.css";
import axios from "axios";
import { TablePagination } from "@mui/material";
// import "jspdf-autotable";
// import jsPDF from "jspdf";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const userId=localStorage.getItem('userId');
console.log("UserId",userId)

const apiUrlCreate = "https://money-xg9v.onrender.com/api/v1/income";
const apiUrlRead = `https://money-xg9v.onrender.com/api/v1/income/user/${userId}`;
const apiUrlUpdate = `https://money-xg9v.onrender.com/api/v1/income/${userId}`;
const apiUrlDelete = `https://money-xg9v.onrender.com/api/v1/income/${userId}`;

function FormTable({ addTransaction }) {
  const [incomeTitle, setincomeTitle] = useState("");
  const [bankName, setBankName] = useState("sbi");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [bankid, setBankId] = useState("");
  const [address, setAddress] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [editMode, setEditMode] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [editRecordId, setEditRecordId] = useState(null);
  const [incTypeFilter, setIncTypeFilter] = useState("");
  const [incTitleFilter, setIncTitleFilter] = useState("");
  const [accountNoFilter, setAccountNoFilter] = useState("");
  const [bankNameFilter, setBankNameFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
//   const session = JSON.parse(sessionStorage.getItem("user"));

 

const parseData = (data) => {
    if (!data) return [];
    const modifiedData = data.replaceAll("ISODate(", "").replaceAll("ObjectId(", "").replaceAll(")", "");
  
    try {
      return JSON.parse(modifiedData);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };
  
  const fetchIncomeData = async () => {
    try {
      const token = btoa("c4eadmin:admin@1234");
      const { data } = await axios.get(apiUrlRead, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      console.log("fetched data:", data);
      const temp = parseData(data.data);
      console.log("The details from database:", temp);
      setData(temp);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        const token = btoa("c4eadmin:admin@1234");
        const updatedData = await axios.put(
          apiUrlUpdate,
          {
            recordid: editRecordId,
            data: {
              transactionType: transactionType,
              description: incomeTitle,
              accountId: bankid,
              amount: amount,
              bankName: bankName,
              dot: new Date(date).toISOString().split("T")[0],
            },
          },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );

        if (updatedData.status === 201) {
          console.log("Data updated successfully");
          fetchIncomeData();
          //   handleCancelEdit();
        } else {
          console.log("Failed to update data", updatedData.data.message);
        }
      } else {
        const recordId = uuid();

        const token = btoa("c4eadmin:admin@1234");
        const requestData = await axios.post(
          apiUrlCreate,
          {
            userId: userId,
            recordid: recordId,
            data: {
              description: incomeTitle,
              transactionType: transactionType,
              accountId: bankid,
              bankName: bankName,
              amount: amount,
              dot: new Date(date).toISOString().split("T")[0],
            },
          },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );

        if (requestData.status === 201) {
            console.log("Data saved Successfully");
            await fetchIncomeData(); // Wait for data to be fetched
          } else {
            console.log("Failed to save data", requestData.data.message);
          }
        }} catch (error) {
          console.error("API error:", error);
        }
      
        // Reset state after saving
        setincomeTitle("");
        setTransactionType("");
        setBankName("");
        setAddress("");
        setAmount("");
        setDate("");
      };

  const handleDelete = async (recordId) => {
    try {
      console.log("Deleting with ID:", recordId);

      const token = btoa("c4eadmin:admin@1234");
      const { data: requestData } = await axios.delete(
        `${apiUrlDelete}/${recordId}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log("Deleting:", requestData);

      if (
        requestData &&
        requestData.data &&
        requestData.status === 201
      ) {
        console.log("Data deleted successfully");
        fetchIncomeData();
      } else {
        console.log(
          "Failed to delete data",
          requestData &&
            requestData.data &&
            requestData.data.message
        );
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const generatePDF = () => {
    // Define your PDF generation logic here
  };

  const handleEdit = (recordId) => {
    // Define your edit logic here
  };

  const flattenedData = data.flatMap((item) => item.accountDetails);
  const filteredData = flattenedData.filter((detail) => {
    const incTypeMatch =
      incTypeFilter === "" || detail.transactionType === incTypeFilter;
    const incTitleMatch =
      incTitleFilter === "" || detail.description.includes(incTitleFilter);
    const accountNoMatch =
      accountNoFilter === "" || detail.accountId.includes(accountNoFilter);
    const bankNameMatch =
      bankNameFilter === "" || detail.bankName.includes(bankNameFilter);
    const amountMatch =
      amountFilter === "" || detail.amount.includes(amountFilter);
    const dateMatch =
      dateFilter === "" ||
      new Date(detail.dot).toISOString().split("T")[0] === dateFilter;

    return (
      incTypeMatch &&
      incTitleMatch &&
      accountNoMatch &&
      bankNameMatch &&
      amountMatch &&
      dateMatch
    );
  });


  return (
    <div className={IncomeCSS.page_container}>
      <div className={IncomeCSS.container}>
        <div className={IncomeCSS.form_container}>
          <h2>{editMode ? "Edit Income Details" : "Income Details"}</h2>
          <div className={IncomeCSS.form_group_remained1}>
            <label htmlFor="incomeTitle">Income Title</label>
            <input
              type="text"
              id="incomeTitle"
              placeholder="Enter Income Title"
              value={incomeTitle}
              onChange={(e) => setincomeTitle(e.target.value)}
            />
          </div>
          <div className={IncomeCSS.form_group}>
            <label htmlFor="transactionType">Income Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Rent">Rent</option>
              <option value="Salary">Salary</option>
              <option value="Interest">Interest</option>
              <option value="Profit">Profit</option>
              <option value="Others">Others</option>
            </select>
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
          <br></br>
          <div className={IncomeCSS.form_group}>
            <button
              type="submit"
              className={IncomeCSS.btn_IncomeSaveChanges}
              onClick={handleSave}
            >
              {editMode ? "Save Changes" : "Save"}{" "}
            </button>
            {editMode && (
              <button
                type="button"
                className={IncomeCSS.btn_IncomeCancel}
                // onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        <div></div>
        <div className={IncomeCSS.table_container}>
          <h2>
            Income Data{" "}
            <Link to="/Incomerecords" className={IncomeCSS.btn_2}>
              Income Records
            </Link>
            <button onClick={generatePDF} className={IncomeCSS.pdfbutton}>
              Export to PDF
            </button>
          </h2>
          <div className={IncomeCSS.custom_filters}>
            <div
              className={`${IncomeCSS.form_group}${IncomeCSS.inline_filter}`}>
              <select
                className={IncomeCSS.select_filter}
                value={incTypeFilter}
                onChange={(e) => setIncTypeFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Interest">Interest</option>
                <option value="Profit">Profit</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div
              className={`${IncomeCSS.form_group} ${IncomeCSS.inline_filter}`}
            >
              <input
                type="text"
                placeholder="IncTitle"
                value={incTitleFilter}
                onChange={(e) => setIncTitleFilter(e.target.value)}
              />
            </div>
            <div
              className={`${IncomeCSS.form_group} ${IncomeCSS.inline_filter}`}
            >
              <input
                type="text"
                placeholder="Acc No"
                value={accountNoFilter}
                onChange={(e) => setAccountNoFilter(e.target.value)}
              />
            </div>
            <div
              className={`${IncomeCSS.form_group} ${IncomeCSS.inline_filter}`}
            >
              <input
                type="text"
                placeholder="Bank Name"
                value={bankNameFilter}
                onChange={(e) => setBankNameFilter(e.target.value)}
              />
            </div>
            <div
              className={`${IncomeCSS.form_group} ${IncomeCSS.inline_filter}`}
            >
              <input
                type="text"
                placeholder="Amt"
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
              />
            </div>
            <div
              className={`${IncomeCSS.form_group} ${IncomeCSS.inline_filter}`}
            >
              <input
                type="date"
                placeholder="Date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Income Type</th>
                <th>Income Title</th>
                <th>Account No</th>
                <th>Bank Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((detail, idx) => (
                  <tr key={idx} className="pagination-data">
                    <td className={IncomeCSS.td_1}>{detail.transactionType}</td>
                    <td className={IncomeCSS.td_1}>{detail.description}</td>
                    <td className={IncomeCSS.td_1}>{detail.accountId}</td>
                    <td className={IncomeCSS.td_1}>{detail.bankName}</td>
                    <td className={IncomeCSS.td_1}>{detail.amount}</td>
                    <td className={IncomeCSS.td_1}>
                      {new Date(detail.dot).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    <td className={IncomeCSS.td_1}>
                      <EditIcon
                        onClick={() => handleEdit(detail.recordId)}
                        className={IncomeCSS.editIcon}
                      />
                      <DeleteIcon
                        onClick={() => handleDelete(detail.recordId)}
                        className={IncomeCSS.deleteIcon}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={flattenedData.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[4, 6, 7, 8, 9]}
          />
        </div>
      </div>
    </div>
  );
}

export default FormTable;
