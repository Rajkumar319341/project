import React, { useState, useEffect } from "react";
import axios from "axios";
import InsuranceCSS from "./Insurance.module.css";
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

const apiUrl = "https://money-xg9v.onrender.com/api/v1/insurances";

function Insurance() {
  const [insuranceType, setInsuranceType] = useState("");
  const [policyTerm, setPolicyTerm] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [premiumDueDate, setPremiumDueDate] = useState("");
  const [premiumPayingTerm, setPremiumPayingTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [insuranceData, setInsuranceData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          apiUrl + `/user/${localStorage.getItem("userId")}`
        );
        setInsuranceData(response.data.insurances);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = btoa("c4eadmin:admin@123");
      const response = await axios.post(
        apiUrl,
        {
          userId: localStorage.getItem("userId"),
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
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log("Response:", response);
      if (response.status === 201) {
        console.log("Data saved Successfully");
        setInsuranceData([...insuranceData, response.data]);
      } else {
        console.log("Failed to save data:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
    setInsuranceType("");
    setPolicyTerm("");
    setPremiumAmount("");
    setPremiumDueDate("");
    setPremiumPayingTerm("");
    setStartDate("");
    setEndDate("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={InsuranceCSS.container}>
      <div className={InsuranceCSS.form_container}>
        <form onSubmit={handleSubmit}>
          <h2>Your Insurance Details</h2>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="insuranceType">Insurance Type</label>
            <input
              type="text"
              id="insuranceType"
              placeholder="Enter Insurance Type"
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="policyTerm">Policy Term</label>
            <input
              type="text"
              id="policyTerm"
              placeholder="Enter Policy Term"
              value={policyTerm}
              onChange={(e) => setPolicyTerm(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="premiumAmount">Premium Amount</label>
            <input
              type="text"
              id="premiumAmount"
              placeholder="Enter Premium Amount"
              value={premiumAmount}
              onChange={(e) => setPremiumAmount(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="premiumDueDate">Premium Due Date</label>
            <input
              type="date"
              id="premiumDueDate"
              value={premiumDueDate}
              onChange={(e) => setPremiumDueDate(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="premiumPayingTerm">Premium Paying Term</label>
            <input
              type="text"
              id="premiumPayingTerm"
              placeholder="Enter Premium Paying Term"
              value={premiumPayingTerm}
              onChange={(e) => setPremiumPayingTerm(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={InsuranceCSS.form_group}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>

      <div className={InsuranceCSS.table_container}>
        <h2>Insurance Details</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Insurance Type</TableCell>
                <TableCell>Policy Term</TableCell>
                <TableCell>Premium Amount</TableCell>
                <TableCell>Premium Due Date</TableCell>
                <TableCell>Premium Paying Term</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? insuranceData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : insuranceData
              ).map((insurance) => (
                <TableRow key={insurance._id}>
                  <TableCell>{insurance.insuranceType}</TableCell>
                  <TableCell>{insurance.policyTerm}</TableCell>
                  <TableCell>{insurance.premiumAmount}</TableCell>
                  <TableCell>{insurance.premiumDueDate}</TableCell>
                  <TableCell>{insurance.premiumPayingTerm}</TableCell>
                  <TableCell>
                    {insurance.startDate &&
                      insurance.startDate.substring(0, 10)}
                  </TableCell>
                  <TableCell>
                    {insurance.endDate && insurance.endDate.substring(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={insuranceData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default Insurance;
